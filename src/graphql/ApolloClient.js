// Package dependencies
import { ApolloClient, InMemoryCache, HttpLink, split } from "apollo-boost";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";

// Local dependencies
import Environment from '../lib/environment';

const httpLink = new HttpLink({
    uri: `${Environment.get('API_GATEWAY')}/graphql`
  });
  
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:9000/graphql`,
    options: {
      reconnect: true
    }
  });
  
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );
  


// Pass your GraphQL endpoint to uri
export const client = new ApolloClient({ link,  cache: new InMemoryCache()});
