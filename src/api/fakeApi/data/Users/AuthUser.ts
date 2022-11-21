import { User } from '../../../../types/types';
import avatar from './assets/user.jpg'

export const AuthUser: User = {
  id: 1,
  username: 'darkStalker',
  email: "pudov@mail.com",
  name: 'Aleksey',
  surname: 'Pudov',
  token: 'testToken',
  roomId: 10,
  favoriteCategories: [],
  likeGamesIds: [1, 3],
  avatar: avatar,
};
