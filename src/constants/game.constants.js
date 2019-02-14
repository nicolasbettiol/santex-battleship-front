export const gameActionTypes = {
  CELL_SELECTED: 'CELL_SELECTED',
  NEW_GAME: 'NEW_GAME',
  REQUEST_SHIPS_MATRIX: 'REQUEST_SHIPS_MATRIX',
  RECEIVE_SHIPS_MATRIX: 'RECEIVE_SHIPS_MATRIX',
};

export const gameStatus = {
  WON: 'Won',
  LOST: 'Lost',
};

export const defaultGameMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


export const shipStatus = {
  AFLOAT: 'Afloat',
  SUNKEN: 'Sunken',
};

export const ships = [
  {
    id: 1,
    size: 4,
    status: shipStatus.AFLOAT,
  },
  {
    id: 2,
    size: 3,
    status: shipStatus.AFLOAT,
  },
  {
    id: 3,
    size: 3,
    status: shipStatus.AFLOAT,
  },
  {
    id: 4,
    size: 2,
    status: shipStatus.AFLOAT,
  },
  {
    id: 5,
    size: 2,
    status: shipStatus.AFLOAT,
  },
  {
    id: 6,
    size: 2,
    status: shipStatus.AFLOAT,
  },
  {
    id: 7,
    size: 1,
    status: shipStatus.AFLOAT,
  },
  {
    id: 8,
    size: 1,
    status: shipStatus.AFLOAT,
  },
  {
    id: 9,
    size: 1,
    status: shipStatus.AFLOAT,
  },
  {
    id: 10,
    size: 1,
    status: shipStatus.AFLOAT,
  },
];
