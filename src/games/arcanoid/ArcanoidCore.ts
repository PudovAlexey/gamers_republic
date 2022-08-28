import Levels from "./levels/Levels";
import background from "./arcanoidAssets/background.png";
import platform from "./arcanoidAssets/platform.png";
import ball from "./arcanoidAssets/ball.png";
import { Bodrders, Events } from "../../animationFrame/AnimationFrame";
import { interval } from "../../utils/utils";
type NextCoords = number[]
export type GameElement = {
  img: string;
  coords: number[];
  nextCoords: NextCoords[]
  speed?: number,
  position?: {

  }
  size?: {
    width: string;
    height: string;
  };
  type?: "normal" | "reverse";
};

export type GameElements = Record<string, GameElement>;

class ArcanoidCore extends Levels {
  private startGame: boolean = false
    private canvas: HTMLCanvasElement | null

  private gameElements: GameElements = {
    background: {
      img: background,
      coords: [25, 25],
    },
    platform: {
      img: platform,
      type: "reverse",
      position: {
        x: 'center',
        y: 'init'
      },
      speed: 10,
      size: {
        width: "5px",
        height: "5px",
      },
      coords: [0, 0],
    },
    ball: {
        img: ball,
        type: "reverse",
        position: {
            x: 'center',
            y: 'init'
          },
        speed: [1, 1],
          coords: [0, -30],
          nextCoords: []
    }
  };

  events: Events = [
    {event: 'keypress', action: this.movePlatform.bind(this)},
]

  movePlatform(e) {
    const platformSpeed = this.gameElements.platform.speed
    switch(e.key.toLowerCase()) {
        case 'a': 
        this.gameElements.platform.coords[0] -= (1 * platformSpeed)
        if (!this.startGame) this.gameElements.ball.coords[0] -= (1 * platformSpeed)
        this.movePlatform = 'left'
        break;
        case 'd': 
        this.gameElements.platform.coords[0] +=  (1 * platformSpeed)
        if (!this.startGame) this.gameElements.ball.coords[0] -= (1 * platformSpeed)

        this.movePlatform = 'right'
        case ' ': this.startGame = true
        break;
    }
  }

  borderLimits(borders, x, y, elements, elementKey) {
    let validX = interval(x, {from: borders.left, to: borders.right})
    let validY = interval(y, {from: borders.bottom, to: borders.top})
    if (!validX.isValid) {
      const startFrom = validX.where === 'from' ? borders.left : borders.right  
      x = startFrom
    }
    if (!validY.isValid) {
      let startFrom = validY.where === 'from' ? borders.bottom : borders.top  
      y = startFrom
    }
    return {
        xBord: x,
        yBord: y
    }
  }

  isBallOnPlatform() {
    return interval(this.gameElements.ball.coords[0], {from: this.gameElements.platform.coords[0] - 100, to: this.gameElements.platform.coords[0] + 100}).isValid && this.gameElements.ball.coords[1] === -30
  }

  bounce(ball, elements, borders) {
    const borderCoords = [
      borders.left,
      borders.top
    ]

    const isBouncedWall =  borderCoords.filter((coord, idx) => coord === ball.coords[idx])

    const isBouncedElements =  elements.filter(object => {
      const isBouncedWidth = interval(ball.coords[0], {from: object.coords[0] - 110, to: object.coords[0] + 110})
      const inBouncedHeight = interval(borders.top - ball.coords[1], {from: object.coords[1] - 110, to: object.coords[1] + 110})
      return isBouncedWidth.isValid && inBouncedHeight.isValid && object.broken === false
    })

    if (isBouncedWall.length || this.isBallOnPlatform()) {
      this.gameElements.ball.speed[0] = -this.gameElements.ball.speed[0]
      this.gameElements.ball.speed[1] = -this.gameElements.ball.speed[1]
    }

    if (isBouncedElements.length) {
      this.gameElements.ball.speed[0] = -this.gameElements.ball.speed[0]
      isBouncedElements.forEach(el => el.broken = true)
      console.log('bounced')
    }

  }

  makeStartPosition(borders) {
    function parsePosition(position, defaultValue) {
        if (borders[position]) {
            return borders[position]
        } else if (position === 'center') {
            return borders['centerX']
        } else if ( typeof position === 'number') {
            return position
        } else {
            return defaultValue
        }
    }
    Object.keys(this.gameElements).forEach(elementKey => {
        let element =  this.gameElements[elementKey]
        if (element.position) {
            element.coords[0] = parsePosition(element.position.x, element.coords[0])
            element.coords[1] = parsePosition(element.position.y, element.coords[1])
        }
    }, this) 
  }

  onGameOver() {
    if (this.gameElements.ball.coords[1] <= -100) {
      console.log('gameOver')
      this.gameElements.ball.coords = [0, -30]
      this.startGame = false
    }
  }

  onBallMove(ball) {
    this.ball.coords = [
      this.ball.coords[0] + this.ball.speed[1],
      this.ball.coords[1] + this.ball.speed[0],
    ]
 
    return {
      ...ball,
      coords: this.ball.coords
    } 
  }

  render({canvas, context} : {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  }, reverseY: (Y: number) => number, borders) {
    this.canvas = canvas
    this.borders = borders
    if (!this.startGame) {
      this.levelBlocks = this.buildLevel();
    }
    this.onGameOver()
    const buildGameData: GameElements = {
      ...this.gameElements,
      ...this.levelBlocks,
    };
    if (this.startGame) this.onBallMove.call(this.gameElements)
    Object.keys(buildGameData).forEach((element: string, _, elements) => {
      if (buildGameData[element].broken === true) {
        return;
      }
      if (element == "ball") {
        this.bounce(buildGameData[element] ,elements.filter(e => !(e == 'ball' || e == 'background')).map(i => buildGameData[i]), this.borders)
      }
      let drawing = new Image();
      drawing.src = buildGameData[element].img;
      drawing.width = buildGameData[element]?.size?.width
      drawing.height = buildGameData[element]?.size?.height
      let [x, y, ...coords] = buildGameData[element].coords;
      if (buildGameData[element].type === "reverse") {
        y = reverseY(y);
      }
      let {xBord, yBord} = this.borderLimits(borders, x, y, buildGameData, element, reverseY)
      context.drawImage(drawing, xBord, yBord, ...(coords as []));
    }, this);
  }
}

export default ArcanoidCore;
