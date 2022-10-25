import { User } from '../../../../types/types';
import avatar from './assets/user.jpg'

export const AuthUser: User = {
  id: 1,
  username: 'darkStalker',
  name: 'Aleksey',
  surname: 'Pudov',
  token: 'testToken',
  favoriteCategories: [],
  likeGamesIds: [1, 3],
  avatar: avatar,
};
