import arcanoid from '../../../../../../../../assets/main/common/games/arcanoid.jpg'
import ticTacToe from '../../../../../../../../assets/main/common/games/ticTacToe.jpg'
import checkers from '../../../../../../../../assets/main/common/games/checkers.jpg'
const GameSliderConfig = [
    {
        title: "Arcanoid",
        img: arcanoid,
        highlights: [
            {
                key: 'Themes',
                value: 'Different themes. Choose your favorite'
            },
            {
                key: 'Multiple levels',
                value: 'complete them all'
            },
        ]
    },
    {
        title: "Tic Tac Toe",
        img: ticTacToe,
        highlights: [
            {
                key: 'Timer',
                value: 'Set timer to play like pro'
            },
            {
                key: 'Rivals',
                value: 'Play vs computer or vs your friend'
            },
        ]
    },
    {
        title: "Checkers",
        img: checkers,
        highlights: [
            {
                key: 'Timer',
                value: 'Set timer to play like pro'
            },
        ]
    },
]

export {
    GameSliderConfig
}