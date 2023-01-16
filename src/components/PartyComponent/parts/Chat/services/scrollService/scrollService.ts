import { EScrollDirection } from '../../../../../../api/types';
import { $ } from '../../../../../../utils/DOM/DOM';

function scrollService() {
  let prevScrollTop: number;
  let scrollDirection: null | EScrollDirection = null;
  let messagesOnScreen: HTMLElement[] = [];
  let messageContainer: null | HTMLElement = null;
  return {
    update: (scrollContainer) => {
      let queryMessage;
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      messageContainer = scrollContainer.children[0];
      const scrollOffsetHeight =
        Math.abs(scrollTop) -
        (scrollContainer.scrollHeight - scrollContainer.offsetHeight);

      const topPercentage = (scrollTop / scrollHeight) * 100;
      const scrollBottomPercentage =
        (Math.abs(scrollOffsetHeight) / scrollHeight) * 100;
      const isNearBottom = topPercentage > 0 && topPercentage < 35;
      const isNearTop =
        scrollBottomPercentage > 0 && scrollBottomPercentage < 35;
      if (!messagesOnScreen.length) {
        const firstChild: HTMLElement =
          messageContainer.firstChild as HTMLElement;
        messagesOnScreen.push(firstChild);
      }
      if (scrollContainer.scrollTop > prevScrollTop) {
        scrollDirection = EScrollDirection.Down;
        messagesOnScreen = onMoveBottom(scrollContainer, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[messageIds.length - 1];
      } else if (scrollContainer.scrollTop < prevScrollTop) {
        scrollDirection = EScrollDirection.Down;
        messagesOnScreen = onMoveTop(scrollContainer, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[0];
      } else {
        scrollDirection = EScrollDirection.Draw;
      }
      prevScrollTop = scrollContainer.scrollTop;
      let onFetch = false;
      if (!(isNearBottom || isNearTop)) {
        queryMessage = null;
      }
      return {
        scrollDirection,
        queryMessage,
        onFetch,
        messagesOnScreen,
        containerChildren: messageContainer.children,
      };
    },
    findById: function (messageId: number) {
      const allMessages: HTMLElement[] = Array.from(messageContainer.children) as HTMLElement[];
      return allMessages.find(
        (message) => +message?.dataset?.messageid === messageId
      );
    },
    getLastMessage: function (): HTMLElement {
      const allMessages = messageContainer.children;
      return allMessages[allMessages.length - 1] as HTMLElement;
    },
    getFirstMessage: function (): HTMLElement {
      const allMessages = messageContainer.children;
      return allMessages[0] as HTMLElement;
    },
    getAllMessages: function (): HTMLElement[] {
      const allMessages = messageContainer.children;
      return Array.from(allMessages) as HTMLElement[];
    },
  };
}

function onMoveTop(target, currentStateMessages: HTMLElement[]): HTMLElement[] {
  const targetTop = $.rect(target).top;
  const targetBottom = $.rect(target).bottom;
  const lastMessage = currentStateMessages[0];
  let newMessagesOnScreen: HTMLElement[] = [];
  let targetMessage = lastMessage;
  let targetCoods = $.rect(targetMessage).top;
  do {
    targetMessage = targetMessage.nextElementSibling as HTMLElement;
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

function onMoveBottom(
  target: HTMLElement,
  currentStateMessages: HTMLElement[]
): HTMLElement[] {
  const targetBottom = $.rect(target).bottom;
  const targetTop = $.rect(target).top;
  let newMessagesOnScreen = [];
  let targetMessage = currentStateMessages[currentStateMessages.length - 1];
  let targetCoods = $.rect(targetMessage).bottom;
  do {
    targetMessage = targetMessage.previousElementSibling as HTMLElement;
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
