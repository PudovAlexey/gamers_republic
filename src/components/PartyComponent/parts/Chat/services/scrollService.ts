import { $ } from '../../../../../utils/DOM/DOM';

function scrollService() {
  let prevScrollTop;
  let scrollDirection;
  let messagesOnScreen = [];
  return {
    update: (scrollContainer) => {
      const target = scrollContainer.children[0];
      if (!messagesOnScreen.length) {
        messagesOnScreen.push(target.firstChild);
      }
      if (scrollContainer.scrollTop > prevScrollTop) {
        scrollDirection = 'down';
        messagesOnScreen = onMoveBottom(scrollContainer, messagesOnScreen);
      } else if (scrollContainer.scrollTop < prevScrollTop) {
        scrollDirection = 'up';
        messagesOnScreen = onMoveTop(scrollContainer, messagesOnScreen);
      } else {
        scrollDirection = 'draw';
      }
      prevScrollTop = scrollContainer.scrollTop;
      const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
      let onFetch = false;
      let queryMessage = messageIds[0];
      if (
        scrollContainer.scrollTop > -200 &&
        scrollContainer.scrollTop >= -300
      ) {
        onFetch = true;
        queryMessage = messageIds[messageIds.length - 1];
      } else if (
        scrollContainer.scrollHeight <
          Math.abs(scrollContainer.scrollTop) + 700 &&
        scrollContainer.scrollHeight < Math.abs(scrollContainer.scrollTop) + 700
      ) {
        onFetch = true;
        queryMessage = messageIds[0];
      }

      return {
        scrollDirection,
        queryMessage,
        onFetch,
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