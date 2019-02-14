// Package dependencies
import React, { Component, Fragment } from 'react';
import GamePoolTable from './GamePoolTable.component'

class GamesPool extends Component {
  state = {gamesAvailable: []};

  render() {
    return (
      <Fragment>
        <GamePoolTable onClick={this.props.onClick} ></GamePoolTable>
      </Fragment>
    );
  }
}

export default GamesPool;
