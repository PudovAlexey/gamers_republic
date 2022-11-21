export type AnyProps = Record<string, any>;

export type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string
  name: string;
  roomId?: number;
  surname: string;
  token: string;
  favoriteCategories: number[];
  likeGamesIds?: number[];
  avatar: string;
};

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
