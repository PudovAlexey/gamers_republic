import { EScrollDirection } from '../../../../../../api/types';
import { $ } from '../../../../../../utils/DOM/DOM';
import { TScrollService } from './types';

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollService(): TScrollService {
  let prevScrollTop: number;
  let scrollDirection: null | EScrollDirection = null;
  let messagesOnScreen: HTMLElement[] = [];
  let messageContainer: null | HTMLElement = null;
  let scrollContainerState: null | HTMLElement = null;
  return {
    update: function (scrollContainer) {
      if (scrollContainer) {
        messageContainer = scrollContainer.children[0] as HTMLElement;
        scrollContainerState = scrollContainer;
      }
      let queryMessage: number | null;
      const scrollTop = scrollContainerState.scrollTop;
      const scrollHeight = scrollContainerState.scrollHeight;
      const scrollOffsetHeight =
        Math.abs(scrollTop) -
        (scrollContainerState.scrollHeight - scrollContainerState.offsetHeight);

      const topPercentage = (scrollTop / scrollHeight) * 100;
      const scrollBottomPercentage =
        (Math.abs(scrollOffsetHeight) / scrollHeight) * 100;
      const isNearBottom = topPercentage > 0 && topPercentage < 35;
      const isNearTop =
        scrollBottomPercentage > 0 && scrollBottomPercentage < 35;
      if (!messagesOnScreen.length && messageContainer.firstChild) {
        messagesOnScreen = [...messagesOnScreen];
        const firstChild: HTMLElement =
          messageContainer.firstChild as HTMLElement;
        messagesOnScreen.push(firstChild);
      }
      if (scrollContainerState.scrollTop > prevScrollTop || isNearBottom) {
        scrollDirection = EScrollDirection.Down;
        messagesOnScreen = onMoveBottom(scrollContainerState, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[messageIds.length - 1];
      } else if (scrollContainerState.scrollTop < prevScrollTop || isNearTop) {
        scrollDirection = EScrollDirection.Up;
        messagesOnScreen = onMoveTop(scrollContainerState, messagesOnScreen);
        const messageIds = messagesOnScreen.map((m) => +m?.dataset?.messageid);
        queryMessage = messageIds[0];
      } else {
        scrollDirection = EScrollDirection.Draw;
      }
      if (!(isNearBottom || isNearTop)) {
        queryMessage = null;
      }
      prevScrollTop = scrollContainerState.scrollTop;
      return {
        scrollDirection,
        queryMessage,
        messagesOnScreen,
        containerChildren: Array.from(
          messageContainer.children
        ) as HTMLElement[],
      };
    },
    findById: function (messageId) {
      this.update();
      const allMessages: HTMLElement[] = Array.from(
        messageContainer.children
      ) as HTMLElement[];
      return allMessages.find(
        (message) => +message?.dataset?.messageid === messageId
      );
    },
    getLastMessage: function () {
      this.update();
      const allMessages = messageContainer.children;
      return allMessages[allMessages.length - 1] as HTMLElement;
    },
    getFirstMessage: function () {
      this.update();
      const allMessages = messageContainer.children;
      return allMessages[0] as HTMLElement;
    },
    getFirstMessageOnScreen: function () {
      const { messagesOnScreen } = this.update();
      return messagesOnScreen[0];
    },
    getLastMessageOnScreen: function () {
      const { messagesOnScreen } = this.update();
      return messagesOnScreen[messagesOnScreen.length - 1];
    },
    getAllMessages: function (): HTMLElement[] {
      this.update();
      const allMessages = messageContainer.children;
      return Array.from(allMessages) as HTMLElement[];
    },
  };
}

function onMoveTop(target, currentStateMessages: HTMLElement[]): HTMLElement[] {
  return Array.from(target.children[0].children).filter(
    (e: HTMLElement) => isInViewport(e) && e?.dataset?.messageid
  ) as HTMLElement[]

  // const targetTop = $.rect(target).top;
  // const targetBottom = $.rect(target).bottom;
  // const lastMessage = currentStateMessages[0];
  // let newMessagesOnScreen: HTMLElement[] = [];
  // let targetMessage = lastMessage;
  // let targetCoods = $.rect(targetMessage).top;
  // do {
  //   targetMessage = targetMessage.nextElementSibling as HTMLElement;
  //   if (targetMessage) newMessagesOnScreen.push(targetMessage);
  //   targetCoods = targetMessage ? $.rect(targetMessage).top : null;
  // } while (targetCoods && targetCoods > targetTop);
  // const mergeMessages = currentStateMessages.concat(newMessagesOnScreen);
  // const messages = mergeMessages.filter(
  //   (message) =>
  //     $.rect(message).top > targetTop && $.rect(message).top < targetBottom && +message?.dataset?.messageid
  // );
  // return [...new Set(messages)];
}

function onMoveBottom(
  target: HTMLElement,
  currentStateMessages: HTMLElement[]
): HTMLElement[] {
  return Array.from(target.children[0].children).filter(
    (e: HTMLElement) => isInViewport(e) && e?.dataset?.messageid
  ) as HTMLElement[]
  // const targetBottom = $.rect(target).bottom;
  // const targetTop = $.rect(target).top;
  // let newMessagesOnScreen = [];
  // let targetMessage = currentStateMessages[currentStateMessages.length - 1];
  // let targetCoods = $.rect(targetMessage).bottom;
  // do {
  //   targetMessage = targetMessage.previousElementSibling as HTMLElement;
  //   if (targetMessage) newMessagesOnScreen.push(targetMessage);
  //   targetCoods = targetMessage ? $.rect(targetMessage).bottom : null;
  // } while (targetCoods && targetCoods > targetBottom);
  // const mergeMessages = currentStateMessages.concat(newMessagesOnScreen);
  // const messages = mergeMessages.filter(
  //   (message) =>
  //   $.rect(message).bottom > targetBottom && $.rect(message).bottom < targetTop && +message?.dataset?.messageid
  //   );
  // return [...new Set(messages)];
}

export { onMoveTop, onMoveBottom, scrollService };
