// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import gql from 'graphql-tag';
import { Query, Subscription, withApollo} from 'react-apollo';

// Local dependencies
import { ships as gameShips, } from '../../constants';
import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';

import './Game.sass';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      matrix: [[]],
      lastPlayerIdTurn: "",
      playerGameStatus: "",
      boardId: "",
      isMyTurn: false
    };
    this.username = this.props.history.location.state.username;
}

SHOT_SUB = gql`
  subscription Shot($gameId : ID!){
    shot(gameId: $gameId ){
      id
      status
      lastTurn
      boardOwner{
        id
        status
        player{
          id
        }
      }
      boardGuest{
        id
        status
        player{
          id
        }
      }
    }
  }
`


GET_GAMES = gql`
query Game($id: ID!) {
  game( id : $id ){
    status
    id
    lastTurn
    boardOwner{
      id
      board
      status
      player{
        id
        name
      }
    }
    boardGuest{
      id
      board
      status
      player{
        id
        name
      }
    }
  }
}`;

SHOT = gql`
  mutation Shot($input: ShotInput){
    shot(input: $input){
      id
      boardGuest{
        id
        board
        player{
          id
        }
      }
      boardOwner{
        id
        board
        player{
          id
        }
      }
    }
  }
`;

 componentDidMount() {
    this.shotSubscription();
    this.props.client.query({
      query: this.GET_GAMES,
      variables: {id: this.props.history.location.state.gameId},
    }).then(( {data} ) => {      
      var board,boardId, playerGameStatus = null;
      if(data.game.boardOwner.player.id === this.username ){
        board = data.game.boardOwner.board;
        boardId = data.game.boardOwner.id;
        if(data.game.status === "FINISHED"){
          playerGameStatus = (data.game.boardOwner.status === "SUNKEN") ? "WINNER" : "LOSE";
        }
      } else {
        board = data.game.boardGuest.board;
        boardId = data.game.boardGuest.id;
        if(data.game.status === "FINISHED"){
          playerGameStatus = (data.game.boardGuest.status === "SUNKEN") ? "WINNER" : "LOSE";
        }
      }      
      this.setState({ 
        matrix: board,
        boardId: boardId,
        playerGameStatus: playerGameStatus,
        isMyTurn : data.game.lastTurn !== this.username,
        lastPlayerIdTurn: data.game.lastTurn
      });
    })
  }

  shotSubscription = () => {
    this.props.client.subscribe({
      query: this.SHOT_SUB,
      variables: {gameId: this.props.history.location.state.gameId},
    }).subscribe(
      response => {            
        if(response.data.shot.status === "FINISHED"){
          if((response.data.shot.boardGuest.status === "SUNKEN" && response.data.shot.boardGuest.player.id === this.username) || 
          (response.data.shot.boardOwner.status === "SUNKEN" && response.data.shot.boardOwner.player.id === this.username)){
            this.setState({ playerGameStatus : "WINNER" })
          } else {
            this.setState({ playerGameStatus : "LOSE" })
          }
        } else {          
          this.setState({ playerGameStatus : "PLAYING", isMyTurn : response.data.shot.lastTurn !== this.username})
        }
      }
    );
  };

  onClick = (x, y, newStatus) => {
    this.props.client.mutate({
      mutation: this.SHOT,
      variables: {
        input: {        
          "x": x,
          "y": y,
          "boardId": this.state.boardId,
          "gameId": this.props.history.location.state.gameId
        }
      }}).then(({ data }) => {
        data = data.shot;
        if(data.boardOwner.id === this.state.boardId ){
          this.setState({ matrix : data.boardOwner.board});
        } else {
          this.setState({ matrix : data.boardGuest.board});
        }
      })
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ Player surrenders !'); // eslint-disable-line
  };

  getPlayerLabel= () => {
    var name = "";
    if(this.username === "1"){
      name = "Nicolas";
    } else {
      name = "Matias";
    }
    return(
      <div>
        <h1>Player: {name}</h1>
      </div>
    );
  };

  renderBoard = () => {
    if(this.state.playerGameStatus === "WINNER"){
      return <div><h1>YOU WIN</h1></div>
    }
    if(this.state.playerGameStatus === "LOSE"){
      return <div><h1>YOU LOSE</h1></div>
    }
    if(this.state.isMyTurn){
      return(
        <div>
          <div><h1>Is your turn!!</h1></div>
          <Board 
            matrix={this.state.matrix}
            onClick={this.onClick}
          />
         </div>
      );
    } else {
      return(
        <div className="turn">
        <div><h1>Waiting the another player move!</h1></div>
        <Board 
          matrix={this.state.matrix}
          onClick={this.onClick}
        />
       </div>
      );
    }
  };

  render() {    
    return (
      <Row className="game">
        {this.getPlayerLabel()}
        <Col xs={{ size: 8, offset: 2 }}>
          {this.renderBoard()}
        </Col>
        <Col xs={{ size: 8, offset: 2 }} className="mt-3 text-center">
          <SurrenderModal onClick={this.surrenderGame} />
        </Col>
      </Row>
    );
  }
}

export default withApollo(Game);
