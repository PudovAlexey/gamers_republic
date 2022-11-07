export type AnyProps = Record<string, any>;

export type User = {
  email: string;
  password: string;
  id: number;
  username: string;
  name: string;
  surname: string;
  token: string;
  favoriteCategories: number[];
  likeGamesIds?: number[];
  avatar: string;
};

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
