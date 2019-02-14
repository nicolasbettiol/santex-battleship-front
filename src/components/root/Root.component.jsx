// Package dependencies
import React from 'react';
import { Container } from 'reactstrap';

// Local dependencies
import Routes from '../../Routes.component';
import { Header } from '../index';

// Styles
import './Root.scss';


const Root = () => (
  <Container fluid className="root-wrapper">
    <Header />
    <div className="content">
      <Routes />
    </div>
  </Container>
);

export default Root;
