export enum EField {
  TicTacToe = 'tictactoe',
  Chees = 'chees',
  SeaBattle = 'seabattle',
}

export type TField =
  | EField
  | {
      cols: number;
      rows: number;
    };
