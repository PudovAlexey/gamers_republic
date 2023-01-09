import { $ } from '../../../../../utils/DOM/DOM';

function scrollService() {
  let prevScrollTop;
  let scrollDirection;
  let messagesOnScreen = [];
  let messageContainer = null
  return {
    update: (scrollContainer) => {
      messageContainer = scrollContainer.children[0];
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const scrollOffsetHeight = Math.abs(scrollTop) - (scrollContainer.scrollHeight - scrollContainer.offsetHeight)
      const topPercentage = ((scrollTop / scrollHeight) * 100)
      const scrollBottomPercentage = Math.abs(scrollOffsetHeight) / scrollHeight * 100
      const isNearBottom = topPercentage > 0 && topPercentage < 35
      const isNearTop = scrollBottomPercentage > 0 && scrollBottomPercentage < 35
      let queryMessage
      if (!messagesOnScreen.length) {
        messagesOnScreen.push(messageContainer.firstChild);
      }
      if (scrollContainer.scrollTop > prevScrollTop) {
        scrollDirection = 'down';
        messagesOnScreen = onMoveBottom(scrollContainer, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[messageIds.length - 1];
      } else if (scrollContainer.scrollTop < prevScrollTop) {
        scrollDirection = 'up';
        messagesOnScreen = onMoveTop(scrollContainer, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[0];
      } else {
        scrollDirection = 'draw';
      }
      prevScrollTop = scrollContainer.scrollTop;
      let onFetch = false;
      if (!(isNearBottom || isNearTop)) {
        queryMessage = null
      }
      return {
        scrollDirection,
        queryMessage,
        onFetch,
        messagesOnScreen,
        containerChildren: messageContainer.children
      };
    },
    findById: function(messageId) {
      const allMessages = messageContainer.children
      return Array.from(allMessages).find(message => +message?.dataset?.messageid === messageId)
    },
    getLastMessage: function() {
      const allMessages = messageContainer.children
      return allMessages[allMessages.length - 1]
    },
    getFirstMessage: function() {
      const allMessages = messageContainer.children
      return allMessages[0]
    }
  };
}

function onMoveTop(target, currentStateMessages): Element[] {
  const targetTop = $.rect(target).top;
  const targetBottom = $.rect(target).bottom;
  const lastMessage = currentStateMessages[0];
  let newMessagesOnScreen = [];
  let targetMessage = lastMessage;
  let targetCoods = $.rect(targetMessage).top;
  do {
    targetMessage = targetMessage.nextElementSibling;
    if (targetMessage) newMessagesOnScreen.push(targetMessage);
    targetCoods = targetMessage ? $.rect(targetMessage).top : null;
  } while (targetCoods && targetCoods > targetTop);
  const mergeMessages = currentStateMessages.concat(newMessagesOnScreen);
  const messages = mergeMessages.filter(
    (message) =>
      $.rect(message).top > targetTop && $.rect(message).top < targetBottom
  );
  return [...new Set(messages)];
}

function onMoveBottom(target, currentStateMessages): Element[] {
  const targetBottom = $.rect(target).bottom;
  const targetTop = $.rect(target).top;
  let newMessagesOnScreen = [];
  let targetMessage = currentStateMessages[currentStateMessages.length - 1];
  let targetCoods = $.rect(targetMessage).bottom;
  do {
    targetMessage = targetMessage.previousElementSibling;
    if (targetMessage) newMessagesOnScreen.push(targetMessage);
    targetCoods = targetMessage ? $.rect(targetMessage).bottom : null;
  } while (targetCoods && targetCoods > targetBottom);
  const mergeMessages = currentStateMessages.concat(newMessagesOnScreen);
  const messages = mergeMessages.filter(
    (message) =>
      $.rect(message).top > targetTop && $.rect(message).top < targetBottom
  );
  return [...new Set(messages)];
}

export { onMoveTop, onMoveBottom, scrollService };
