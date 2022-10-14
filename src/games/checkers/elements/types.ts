export enum Color {
  Red = 'Red',
  Black = 'Black',
}

export enum Side {
  Top = 'Top',
  Bottom = 'Bottom',
}

export type TField = {
  figure?: any;
  light?: string;
  key?: Color;
  value?: string;
  updateToQueen?: boolean;
};

export type TLights = Coords & {
  eat?: TNextCoords;
};

export type FieldState = Record<string, Record<string, TField>>;

export interface IFigure {
  coords?: Coords;
  color: Color;
  side: Side;
  fieldState: FieldState;
}

export type Coords = {
  col: string;
  row: string | number;
};

export type TNextCoords = {
  key: string;
  value: TField | undefined;
  coords: Coords;
  oposite: string;
};
