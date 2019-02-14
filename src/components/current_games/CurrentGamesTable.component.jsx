import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';
import { Table } from 'reactstrap';


// Local dependencies
import { formatDate } from '../../helpers/formatters/commons';

const GET_PLAYER_GAMES = gql`
  query PlayerGames($id: ID!) {
    playerGames( id : $id ){
      id
      status
      createdAt
      startTime
      lastTurn
    }
  }
`;

const TableRow = class extends Component {

    onClick = (id) => {
        this.props.onClick(id)
    }
    
    render(){
        const startDate = moment(this.props.game.startTime);

        var playedValue = this.props.game.startTime ? moment.duration(moment().diff(startDate)).minutes() : "";
        
        if(this.props.game.status === "FINISHED"){
          playedValue = "Finished";
        }
        console.log(this.props.game.startTime);
      
        return(
        <tr>
            <td>{this.props.game.id}</td>
            <td>{this.props.game.createdAt}</td>
            <td>{this.props.game.startTime}</td>
            <td>{playedValue}</td>
            <td>{this.props.game.lastTurn !== "1" ? "nicolas" : "matias"}</td>
            <td>
                {this.props.onClick(this.props.game.id)}
            </td>
        </tr>
        )
    }
};

const GamePoolTableView = class extends Component {

    render() {
      const { data } = this.props;
      return (
        <Fragment>
        <h3>My current games</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Started At</th>
              <th>Time Played</th>
              <th>Turn</th>
            </tr>
          </thead>
          <tbody>
            {data.playerGames.map( (game, index) => <TableRow onClick={this.props.onClick} index={index} game={game} />)}
          </tbody>
        </Table>
      </Fragment>
      );
    }
  };

  const CurrentGameTable= ({onClick, playerId}) => (
    <Query query={GET_PLAYER_GAMES} variables={ {id : playerId} }>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return <GamePoolTableView onClick={onClick} data={data}/>;
      }}
    </Query>
  );

  export default CurrentGameTable;

