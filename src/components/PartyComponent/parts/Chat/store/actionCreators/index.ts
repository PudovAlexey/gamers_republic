import { createAction } from "@reduxjs/toolkit"

const SENDMESSAGE = "chat/sendMessage"

const ADD_MESSAGE = "chat/addMessage"

const UPLOAD_MESSAGES = "chat/uploadMessages"

const UPLOAD_MESSAGES_BY_OFFSET = "chat/uploadMessagesByOffset"

const ADD_MESSAGES = 'chat/addMesssages'

const UPLOAD_FILES = 'chat/upload_image'

const SET_IMAGES = 'chat/upload_files'

const CHANGE_FILES = 'chat/change_files'

const REPLY_NAVIGATE = 'chat/replyNavigate'

const START_NAVIGATION = 'chat/startNavigate'

const NAVIGATION_PROGRESS = 'chat/navigationProgress'

const RESTORE_MESSAGES = 'chat/restoreMessages';

const SHOW_LOADER = 'chat/showLoader';



const SELECT_MESSAGES = createAction('todos/add', function prepare(e) {
    e.preventDefault()
    const {currentTarget} = e
    const selectionIds = []
    const messageContainer = currentTarget.children[0]
    function onReplyBySelection({target}) {
        const allMessages = Array.from(messageContainer.children)
      const findTargetMessage = allMessages.find(message => target.closest(`[data-messageid="${message.dataset.messageid}"]`))
      const replyIndex = selectionIds.indexOf(+findTargetMessage?.dataset?.messageid)
      if (replyIndex < 0) {
          selectionIds.push(+findTargetMessage?.dataset?.messageid)
      }
    }

    function onMouseUp() {
      messageContainer.removeEventListener('mousemove', onReplyBySelection)
      messageContainer.removeEventListener('mouseup', onMouseUp)
    }

    messageContainer.addEventListener('mousemove', onReplyBySelection)
    messageContainer.addEventListener('mouseup', onMouseUp)
    return {
        payload: selectionIds
    }
  })

export {
    SENDMESSAGE,
    ADD_MESSAGE,
    UPLOAD_FILES,
    SET_IMAGES,
    CHANGE_FILES,
    REPLY_NAVIGATE,
    START_NAVIGATION,
    NAVIGATION_PROGRESS,
    RESTORE_MESSAGES,
    ADD_MESSAGES,
    UPLOAD_MESSAGES,
    UPLOAD_MESSAGES_BY_OFFSET,
    SHOW_LOADER,
    SELECT_MESSAGES
}