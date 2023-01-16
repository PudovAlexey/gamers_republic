enum EMessageAdd {
  Img = 'img',
  File = 'file',
  Audio = 'audio',
}

enum EScrollDirection  {
    Down = "down",
    Up = 'up',
    Draw = 'draw'
}

type TScrollStart = 'start' | number | 'end'

type TMessageAdd<T> = {
  type: T;
  file: any;
  name: string;
  id: number;
};

type TMessageAdds = Record<EMessageAdd, TMessageAdd<EMessageAdd>>

type TMessage = {
  messageId: number;
  message: string;
  createdAt: string;
  roomId: number
  userId: number;
  adds?: {
    img?: TMessageAdd<EMessageAdd.Img>[];
    audio?: TMessageAdd<EMessageAdd.Audio>[];
    file?: TMessageAdd<EMessageAdd.File>[];
  };
  replyFrom?: {
    messageId: number;
    userId: number;
  };
  replyIds?: number[];
  edited?: string;
  replyMessages?: TMessage[]
};

type TUser = {
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

  type TQueryMessage = {
    roomId: number
    messageStart?: TScrollStart,
    offset?: number,
    where?: EScrollDirection
  }


export { EMessageAdd, EScrollDirection };

export type { TMessage, TMessageAdd, TScrollStart, TMessageAdds, TUser, TQueryMessage };
