import { buildTree } from '../../utils/treeWalker/treeWalker';
import { compareValue } from '../../utils/utils';
import { GameCategories } from './data/Games/GameCategories';
import { gamesList } from './data/Games/GamesList';
import { AuthUser } from './data/Users/AuthUser';
import { Users } from './data/Users/UserList';
import { messages } from './data/Chat/messages';
import { rooms } from './data/Chat/rooms';
import { EScrollDirection, TMessage } from '../types';
import {
  filterMessagesBottom,
  filterMessagesMiddle,
  filterMessagesTop,
} from './helpers/chat';

class FakeApi {
  async getAuthUser(token) {
    // let isAuth = AuthUser.token === token;
    const authUser = Users.find((user) => user.token === token)
    let req = await this.fakeDelay(authUser);
    if (!authUser) {
      req = await this.fakeDelay('not Auth');
    }
    return req;
  }

  async sendMessage({ message, adds, userId, replyIds, roomId, frontId }) {
    try {
      const createdAt = Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
        .format(new Date())
        .split(' ')
        .map((date, idx) => {
          if (idx === 0) {
            return date.split('.').reverse().join('.').replaceAll(',', '');
          } else {
            return date.replaceAll(',', '');
          }
        })
        .join(' ');

      const messageId = messages[messages.length - 1].messageId + 1;
      const newMessage: TMessage = {
        message,
        createdAt,
        adds,
        replyIds,
        userId,
        roomId,
        messageId,
      };
      messages.push(newMessage);
      newMessage.replyMessages =
        newMessage.replyIds &&
        newMessage.replyIds.map((replyId) => {
          const messageData = messages.find(
            ({ messageId }) => messageId === replyId
          );
          return {
            ...messageData,
            user: Users.find((user) => messageData.userId === user.id),
          };
        });
      let req = (await this.fakeDelay(newMessage)) as TMessage;
      return {
        ...req,
        user: Users.find((user) => req.userId === user.id),
        frontId,
      };
    } catch (err) {
      console.log(err);
      return { message: JSON.stringify(err) };
    }
  }

  async findMessageBySearch({ roomId, search }): Promise<TMessage[] | {message: string}> {
    const filterMessageIds = messages
      .filter((message) => {
        return (
          roomId === message.roomId &&
          JSON.stringify(Object.values(message)).includes(search)
        );
      })
    try {
      const res = await this.fakeDelay(filterMessageIds);
      return res as TMessage;
    } catch (err) {
      return { message: JSON.stringify(err) };
    }
  }

  async getMessagesByRoomId({ roomId, messageStart, offset, where }) {
    const messagesFromChat = messages
      .filter((message) => message.roomId === roomId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
      );
    let startForm;
    if (messageStart === 'start') {
      startForm = 0;
    } else if (messageStart === 'end') {
      startForm = messagesFromChat.length - 1;
    } else if (typeof messageStart === 'number') {
      startForm = messagesFromChat.findIndex(
        (message) => message.messageId === messageStart
      );
    }
    let messagesByOffset;
    switch (where) {
      case EScrollDirection.Up:
        messagesByOffset = filterMessagesTop({
          messagesFromChat,
          offset,
          startForm,
        });
        break;
      case EScrollDirection.Down:
        messagesByOffset = filterMessagesBottom({
          messagesFromChat,
          offset,
          startForm,
        });
        break;
      case EScrollDirection.Draw:
        messagesByOffset = filterMessagesMiddle({
          messagesFromChat,
          offset,
          startForm,
        });
    }

    let req = (await this.fakeDelay(messagesByOffset)) as TMessage[];
    if (req) {
      const messagesWitchUserData = req.map((message) => ({
        ...message,
        replyMessages:
          message.replyIds &&
          message.replyIds.map((replyId) => {
            const messageData = messages.find(
              ({ messageId }) => messageId === replyId
            );
            return {
              ...messageData,
              user: Users.find((user) => messageData.userId === user.id),
            };
          }),
        user: Users.find((user) => message.userId === user.id),
      }));
      return messagesWitchUserData;
    } else {
      return { message: `Can't find messages in room ${roomId}` };
    }
  }
  async getUserByUserId(userId) {
    const userData = Users.find((user) => userId === user.id);
    let req = await this.fakeDelay(userData);
    if (req) {
      return req;
    } else {
      return { message: 'cant find user' };
    }
  }

  async getRoomById(roomId) {
    const room = rooms.find((room) => room.roomId === roomId);
    let req = await this.fakeDelay(room);
    if (req) {
      return req;
    } else {
      return { message: `Can't room by roomId ${roomId}` };
    }
  }

  async login(data) {
    let AuthUser = Users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    let req = await this.fakeDelay(AuthUser);
    if (req) {
      return req;
    } else {
      return { message: 'incorrect email or password' };
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
    let delay = 200;
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
