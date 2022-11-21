import { buildTree } from '../../utils/treeWalker/treeWalker';
import { compareValue } from '../../utils/utils';
import { GameCategories } from './data/Games/GameCategories';
import { gamesList } from './data/Games/GamesList';
import { AuthUser } from './data/Users/AuthUser';
import { Users } from './data/Users/UserList';
import {messages} from './data/Chat/messages'
import { rooms } from './data/Chat/rooms';

class FakeApi {
  async getAuthUser(token) {
    let isAuth = AuthUser.token === token;
    let req = await this.fakeDelay(AuthUser);
    if (!isAuth) {
      req = await this.fakeDelay('not Auth');
    }
    return req;
  }

  async getMessagesByRoomId(roomId) {
    const messagesFromChat = messages.filter(message => message.chatId === roomId)
    let req = await this.fakeDelay(messagesFromChat);
    if (req) {
      return req
    } else {
      return {message: `Can't find messages in room ${roomId}`}
    }

  }

  async getRoomById(roomId) {
    const room = rooms.find(room => room.roomId === roomId)
    let req = await this.fakeDelay(room);
    if (req) {
      return req
    } else {
      return {message: `Can't room by roomId ${roomId}`}
    }
  }

  async login(data) {
    let AuthUser = Users.find(user => user.email === data.email && user.password === data.password)
    let req = await this.fakeDelay(AuthUser);
    if (req) {
      return req
    } else {
      return {message: 'incorrect email or password'}
    }
  }

  async toggleUserLike(user, gameId) {
    if (AuthUser.token !== user?.token) {
      return this.fakeDelay(false);
    }
    let newGameIds = user.likeGamesIds.filter((id) => !(id === gameId));
    if (newGameIds.length === user.likeGamesIds.length) {
      user.likeGamesIds.push(gameId);
    } else {
      user.likeGamesIds = newGameIds;
    }
    let res = await this.fakeDelay(user.likeGamesIds);
    return res;
  }

  async getGameCategories() {
    const gameCategoriesTree = buildTree({ nodes: GameCategories });
    let reqCategories = await this.fakeDelay(gameCategoriesTree);
    return reqCategories;
  }

  async getGameByCategoryId(categoryId) {}

  async findGameList({ search }) {
    try {
      const findGamesBySearch = !search
        ? gamesList
        : gamesList.filter((game) => {
            return (
              compareValue(game.game, search, 'substringLower') ||
              compareValue(game.hashTags, search, 'someOfLower')
            );
          });
      let reqGamesList = await this.fakeDelay(findGamesBySearch);
      return reqGamesList;
    } catch (err) {
      this.requestError(err);
    }
  }
  async getGameList() {
    try {
      let reqGamesList = await this.fakeDelay(gamesList);
      return reqGamesList;
    } catch (err) {
      this.requestError(err);
    }
  }

  requestError(err) {
    return err;
  }

  async fakeDelay(data) {
    let delay = 1000;
    var promise = await new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
    return promise;
  }
}

export default FakeApi;
