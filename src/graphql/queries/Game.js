import gql from 'graphql-tag';


const FetchCurrentGames = gql``;

const FetchMyGames = gql``;

const FetchGameData = gql`
  query FetchGameData(id: String!) {}
`;

export {
  FetchCurrentGames,
  FetchMyGames,
  FetchGameData,
};
