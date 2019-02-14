// Package dependencies
import React from 'react';
import { Route } from 'react-router-dom';

// Local dependencies
import { Home } from './components';
import { Game } from './components';


const Routes = () => (
  <div>
    <Route exact key="home" path="/" component={Home} />
    <Route exact key="game" path="/game/:id" component={Game} />
  </div>
);

export default Routes;
