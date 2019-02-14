// Package dependencies
import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { history } from 'react-router';
import { withApollo} from 'react-apollo';
import Select from 'react-select';


// Local dependencies
import CurrentGames from '../current_games/CurrentGames.component';
import GamesPool from '../games_pool/GamesPool.component';
import { Mutation } from 'react-apollo';


// Styles
import classes from './Home.module.scss';

const TITLE = 'Battleship';
class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = { username : ""}
  }
  

  options = [
    { 
      value: { 
        'name':'Nicolas',
        'id':'1'
        }, 
      label: 'Nicolas' 
    },
    { 
      value: { 
        'name':'Matias',
        'id':'2'
        }, 
      label: 'Matias'
    }
  ];

  JOIN_GAME = gql`
    mutation JoinGame($input: JoinGameInput){
      joinGame(input: $input){
        id
      }
    }
  `;

  NEW_GAME = gql`
    mutation CreateGame($input: CreateGameInput){
      createGame(input: $input){
        id
      }
    }
  `;

  handleChange = (selectedOption) => {        
    this.setState({username: selectedOption.value.id});
  }

  onChangeInput = (event) => {
    this.setState({username: event.target.value});
  };

  playGame = () => {

  }

  joinGame = (gameId) => {
      return(
      <Mutation mutation={this.JOIN_GAME}    
      onCompleted={() => this.props.history.push({ 
        pathname : `/game/${gameId}`,
        state: { 
          username: this.state.username,
          gameId: gameId
        }
        })}
      >
        {(joinGame, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                joinGame({ variables: { input: {        
                    "playerId" : this.state.username,
                    "gameId": gameId
                } } });
              }}>
              <Button color="primary" type="submit">Play</Button>
            </form>
          </div>
        )}
      </Mutation>
      )
  }

  createGame = () => {
    this.props.client.mutate({
      mutation: this.NEW_GAME,
      variables: {
        input: {        
          "playerId": this.state.username
        }
      }})
  };

  componentDidMount(){
    this.setState({username: this.options[0].value.id});
  }

  render(){
    const { selectedOption } = this.state.username;    
    return(
    <div className={classes.home}>
    <Row>
      <Col xs={{size: 12}}>
        <div className="title">
          <h1>{TITLE}</h1>
        </div>
      </Col>
      <Col xs={{size: 4, offset: 8}} className="text-right">
        <Button color="info" onClick={this.createGame}>New Game</Button>
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <h4>Select an username:</h4>
        <Select
          defaultValue={this.options[0]}
          value={selectedOption}
          onChange={this.handleChange}
          options={this.options}
        />
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <GamesPool onClick={this.joinGame} />
      </Col>
      <Col xs="6">
        <CurrentGames onClick={this.playGame} playerId={this.state.username}/>
      </Col>
    </Row>
  </div>
  );
    }
}

export default withApollo(Home);