import { match } from "assert";
import { TMessage } from "../../../../types/types";
import batmanImg from './assets/Batman.jpg'
import ramstainAudio from './assets/rammstein.mp3'

// const messages: TMessage[] = [
//   {
//     message:
//       "Here audio",
//       createdAt: 	"2005.01.30 15:00",
//       userId: 1,
//       chatId: 10,
//       adds: {
//         img: [batmanImg, batmanImg, batmanImg, batmanImg, batmanImg, batmanImg, batmanImg],
//         audio: [ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio]
//       },
//       replyFrom: {
//         messageId: 35,
//         userId: 1
//       },
//       messageId: 1
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: "2019.01.30 15:00",
//       edited: "",
//       userId: 1,
//       chatId: 11,
//       messageId: 2
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: "2019.01.30 15:00",
//       chatId: 10,
//       userId: 5,
//       messageId: 3
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: 	"2018.02.30 15:00",
//       edited: "",
//       userId: 1,
//       chatId: 10,
//       messageId: 25
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: "2018.02.30 15:00",
//       chatId: 10,
//       userId: 5,
//       messageId: 26
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: "2018.01.30 15:00",
//       chatId: 10,
//       userId: 5,
//       messageId: 4
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: 	"2018.02.30 15:00",
//       chatId: 10,
//       userId: 6,
//       messageId: 5
//   },
//   {
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       createdAt: 	"2010.02.30 15:00",
//       chatId: 10,
//       userId: 1,
//       messageId: 35
//   },
// ];

const firstMessage = (date) => ({
  message:
    `These is Message ${date}`,
    createdAt: 	`20${date}.01.30 15:00`,
    userId: date % 2 === 0 ? 1 : 2,
    chatId: 10,
    // adds: {
    //   img: [batmanImg, batmanImg, batmanImg, batmanImg, batmanImg, batmanImg, batmanImg],
    //   audio: [ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio]
    // },
    replyFrom: {
      messageId: 35,
      userId: date % 2 === 0 ? 1 : 2
    },
    messageId: date
})

function makeMessages(match) {
  return new Array(match)
  .fill('')
  .map((_, idx) => firstMessage(idx))

}

const messages = makeMessages(1000)

export {
    messages
}

// messages
// reply
// img
// invite in game
