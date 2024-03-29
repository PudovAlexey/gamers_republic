enum EMessageAdd {
  Img = 'img',
  File = 'file',
  Audio = 'audio',
  Video = 'video',
}

enum EScrollDirection {
  Down = 'down',
  Up = 'up',
  Draw = 'draw',
}

type TScrollStart = 'start' | number | 'end';

type TMessageAdd<T> = {
  type: T;
  file: any;
  name: string;
  id: number;
};

type TMessageAdds = Record<EMessageAdd, TMessageAdd<EMessageAdd>[]>;

type TMessage = {
  messageId: number;
  message: string;
  createdAt: string;
  roomId: number;
  userId: number;
  frontId?: number;
  read?: boolean;
  user?: TUser
  adds?: {
    img?: TMessageAdd<EMessageAdd.Img>[];
    audio?: TMessageAdd<EMessageAdd.Audio>[];
    file?: TMessageAdd<EMessageAdd.File>[];
    video?: TMessageAdd<EMessageAdd.Video>[];
  };
  replyFrom?: {
    messageId: number;
    userId: number;
  };
  replyIds?: number[];
  edited?: string;
  replyMessages?: TMessage[];
};

type TUser = {
  id: number;
  username: string;
  email: string;
  isOnline: boolean;
  password?: string;
  confirmPassword?: string;
  name: string;
  roomId?: number;
  surname: string;
  token: string;
  favoriteCategories: number[];
  likeGamesIds?: number[];
  avatar: string;
  friendsIds?: number[]
  unreadMessages: {
    roomId: number,
    messageId: number
  }[]
};

type TQueryMessage = {
  roomId: number;
  messageStart?: TScrollStart;
  offset?: number;
  where?: EScrollDirection;
};

type TRoom = {
  roomId: number,
  userIds: number[],
  createdAt: string,
  roomName: string
}

export { EMessageAdd, EScrollDirection };

export type {
  TMessage,
  TMessageAdd,
  TScrollStart,
  TMessageAdds,
  TUser,
  TQueryMessage,
  TRoom
};
