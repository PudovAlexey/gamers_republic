import { $ } from '../../../../../utils/DOM/DOM';

function scrollService() {
  let prevScrollTop;
  let scrollDirection;
  let messagesOnScreen = [];
  return {
    update: (target) => {
        target = target.children[0]
      if (!messagesOnScreen.length) {
        messagesOnScreen.push(target.firstChild);
      }
      if (target.scrollTop > prevScrollTop) {
        scrollDirection = 'down';
        messagesOnScreen = onMoveBottom(target, messagesOnScreen);
      } else if (target.scrollTop < prevScrollTop) {
        scrollDirection = 'up';
        messagesOnScreen = onMoveTop(target, messagesOnScreen);
      } else {
        scrollDirection = 'draw';
      }
      prevScrollTop = target.scrollTop;
      const messageIds = messagesOnScreen.map((m) => +m?.children?.[0]?.dataset?.messageid)
      return {
        lastMessage:
          +target.lastChild.previousElementSibling.dataset.messageid + 10,
        scrollDirection,
        messagesOnScreen: messageIds,
        queryMessage: scrollDirection === 'up' ? messageIds[messageIds.length - 1] : messageIds[0],
        firstMessage: +target.firstChild.dataset.messageid,
      };
    },
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
