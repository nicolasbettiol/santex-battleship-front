import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';


// Local dependencies
import { formatDate } from '../../helpers/formatters/commons';

const GET_GAMES = gql`
{
  games{
          id
          status
          createdAt
          boardOwner{
            player{
              name
            }
          }
        }
}`;

const SUB_NEW_GAMGE = gql`
  subscription{
    newGameAdded{
        id
          status
          createdAt
          boardOwner{
            player{
              name
            }
          }
        }
    }
`;

const TableRow = class extends Component {

    onClick = (id) => {
        this.props.onClick(id)
    }
    
    render(){
        return(
        <tr>
            <td>{this.props.game.id}</td>
            <td>{this.props.game.createdAt}</td>
            <td>{this.props.game.boardOwner.player.name}</td>
            <td>
                {this.props.onClick(this.props.game.id)}
            </td>
        </tr>
        )
    }
};

const GamePoolTableView = class extends Component {
    componentDidMount() {
      this.props.subscribeToMore();
    }

    render() {
      const { data } = this.props;
      return (
        <Fragment>
        <h3>Games Pool</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Player</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.games.map( (game, index) => <TableRow onClick={this.props.onClick} index={index} game={game} />)}
          </tbody>
        </Table>
      </Fragment>
      );
    }
  };

  const GamePoolTable = ({onClick}) => (
    <Query query={GET_GAMES}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const more = () => subscribeToMore({
          document: SUB_NEW_GAMGE,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const game = subscriptionData.data.newGameAdded;
            return Object.assign({}, prev, {
                games: [game, ...prev.games],
            });
          },
        });
        return <GamePoolTableView onClick={onClick} data={data} subscribeToMore={more}/>;
      }}
    </Query>
  );

  export default GamePoolTable;

