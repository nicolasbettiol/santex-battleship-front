import gql from 'graphql-tag';

const StartGame = gql`
  mutation startGame($playerId: String!, $settings: JSON!) {
    startGame($player: String!, $settings: JSON!)
  }
`;

const SurrenderGame = gql`
  mutation surrenderGame($playerId: String!, $gameId: String!) {
    surrenderGame($playerId: String!, $gameId: String!)
  }
`;


export {
  StartGame,
  SurrenderGame
};
