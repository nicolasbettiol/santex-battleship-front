// Package dependencies
import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import moment from 'moment';
import { Table } from 'reactstrap';
import CurrentGameTable from './CurrentGamesTable.component'

class CurrentGames extends Component {

  state = {gamesAvailable: []};

  render() {
    return (
      <Fragment>
        <CurrentGameTable playerId={this.props.playerId} onClick={this.props.onClick} ></CurrentGameTable>
      </Fragment>
    );
  }
}

export default CurrentGames;
