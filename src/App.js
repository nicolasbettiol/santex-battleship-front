// Package dependencies
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Local dependencies
import { client } from './graphql/ApolloClient';
import { store } from './redux/store';
import { Root } from './components';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
