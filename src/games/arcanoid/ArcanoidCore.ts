import Levels from "./levels/Levels";
import background from "./arcanoidAssets/background.png";
import platform from "./arcanoidAssets/platform.png";
import balls from "./arcanoidAssets/ball.png";
import { Bodrders, Events } from "../../animationFrame/AnimationFrame";
import { interval } from "../../utils/utils";
export type GameElement = {
  img: string;
  coords: number[];
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
        width: "15px",
        height: "15px",
      },
      coords: [0, 0],
    },
    balls: {
        img: balls,
        type: "reverse",
        position: {
            x: 'center',
            y: 'init'
          },
        speed: 10,
        // size: {
        //     width: "15px",
        //     height: "15px",
        //   },
          coords: [0, -30],
    }
  };

  events: Events = [
    {event: 'keypress', action: this.movePlatform.bind(this)},
]

  movePlatform(e) {
    const platformSpeed = this.gameElements.platform.speed
    switch(e.key.toLowerCase()) {
        case 'a': this.gameElements.platform.coords[0] -= (1 * platformSpeed)
        this.movePlatform = 'left'
        break;
        case 'd': this.gameElements.platform.coords[0] +=  (1 * platformSpeed)
        this.movePlatform = 'right'
        break;
    }
  }

  borderLimits(borders, x, y, elements, elementKey) {
    let validX = interval(x, {from: borders.left, to: borders.right})
    let validY = interval(y, {from: borders.left, to: borders.right})
    if (!validX.isValid) {
        const startFrom = validX.where === 'from' ? borders.left : borders.right  
        this.gameElements[elementKey].coords[0] = startFrom
        x = startFrom
    }
    if (!validY.isValid) {
        
    }
    return {
        xBord: x,
        yBord: y
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

  render({canvas, context} : {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  }, reverseY: (Y: number) => number, borders) {
    this.canvas = canvas
    this.borders = borders
    const levelBlocks = this.buildLevel();
    const buildGameData: GameElements = {
      ...this.gameElements,
      ...levelBlocks,
    };
    Object.keys(buildGameData).forEach((element: string) => {
      let drawing = new Image();
      drawing.src = buildGameData[element].img;
      let [x, y, ...coords] = buildGameData[element].coords;

      if (buildGameData[element].type === "reverse") {
        y = reverseY(y);
      }
      let {xBord, yBord} = this.borderLimits(borders, x, y, buildGameData, element)
      console.log(xBord, yBord)
      context.drawImage(drawing, xBord, yBord, ...(coords as []));
    }, this);
  }
}

export default ArcanoidCore;
