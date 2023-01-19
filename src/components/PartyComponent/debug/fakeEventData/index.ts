import { Users } from './../../../../api/fakeApi/data/Users/UserList';
import { messages } from "../../../../api/fakeApi/data/Chat/messages"
import { TFriendInvitation, TGameInvitation, TGetMessage, TRoomInvite } from "../../store/socketEvents/types"

const getFakeMessage: TGetMessage = (() => {
    const cloneMessage = {...messages[messages.length - 1]}
    delete cloneMessage['messageId']
    cloneMessage.replyIds.map((replyId) => {
        const messageData = messages.find(
          ({ messageId }) => messageId === replyId
        );
        return {
          ...messageData,
          user: Users.find((user) => messageData.userId === user.id),
        };
      });
   return {
        roomId: 10,
        message: {
            ...cloneMessage,
            messageId: messages[messages.length - 1].messageId + 1,
            user: Users.find((user) => cloneMessage.userId === user.id),

        }
    }
})()

const getFakeRoomInvite: TRoomInvite = {
    userId: 15,
    roomId: 10
}

const friendInvitation: TFriendInvitation = {
    userId: 15,
    friendId: 20
}

const gameInvitation: TGameInvitation = {
    userId: 10,
    gameId: 1
}

export {
    getFakeMessage,
    getFakeRoomInvite,
    friendInvitation,
    gameInvitation
}