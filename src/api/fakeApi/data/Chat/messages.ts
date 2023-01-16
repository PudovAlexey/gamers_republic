import { EMessageAdd, TMessage } from '../../../types'
import batmanImg from './assets/Batman.jpg'
import ramstainAudio from './assets/rammstein.mp3'


const firstMessage = (date: number): TMessage => ({
  messageId: date,
  message: `These is Message ${date}`,
    createdAt: 	`20${date}.01.30 15:00`,
    userId: date % 2 === 0 ? 1 : 2,
    roomId: 10,
    adds: {
      img: [{
        type: EMessageAdd.Img,
        file: batmanImg,
        name: '1',
        id: 1
      },
      {
        type: EMessageAdd.Img,
        file: batmanImg,
        name: '2',
        id: 2
      },
      {
        type: EMessageAdd.Img,
        name: '3',
        file: batmanImg,
        id: 3
      },
      {
        type: EMessageAdd.Img,
        file: batmanImg,
        name: '3',
        id: 4
      },
      {
        type: EMessageAdd.Img,
        file: batmanImg,
        name: '3',
        id: 5
      }
    ],
      // audio: [ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio, ramstainAudio]
    },
    replyIds: [date - 100],
})

function makeMessages(match) {
  return new Array(match)
  .fill('')
  .map((_, idx) => firstMessage(idx))

}

const messages: TMessage[] = makeMessages(1000)

export {
    messages
}