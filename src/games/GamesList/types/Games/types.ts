export type Game = {
  gameId: number;
  categoryId: number;
  game: string;
  description: string;
  avatar: string;
  icon: {
    icon: string;
    alt: string;
  };
  hasTags: string[];
  rate: number;
};
