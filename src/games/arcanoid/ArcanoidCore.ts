import Levels from './levels/Levels';
import background from './arcanoidAssets/background.png';
import platform from './arcanoidAssets/platform.png';
import ball from './arcanoidAssets/ball.png';
import {
  Borders,
  Events,
  PositionValue,
} from '../../animationFrame/AnimationFrame';
import { interval } from '../../utils/numbers';
import { GameSettings } from './types';
type Position = number | PositionValue | [PositionValue, number];
export type GameElement = {
  broken?: boolean;
  img: string;
  coords: number[];
  speed?: [number, number] | number;
  position?: { x: Position; y: Position };
  size?: {
    width: string;
    height: string;
  };
  type?: 'normal' | 'reverse';
};

export type GameElements = Record<string, GameElement>;

class ArcanoidCore extends Levels {
  private startGame: boolean = false;
  private borders: Borders | null;
  private canvas: HTMLCanvasElement | null;
  startGameReady: boolean = false;
  gameSettings: GameSettings | null = null;
  private levelBlocks:
    | (GameElements & {
        broken: boolean;
      })
    | null;

  private gameElements: GameElements = {
    background: {
      img: background,
      coords: [25, 25],
    },
    platform: {
      img: platform,
      type: 'reverse',
      position: {
        x: 'center',
        y: 'init',
      },
      speed: 10,
      size: {
        width: '5px',
        height: '5px',
      },
      coords: [0, 0],
    },
    ball: {
      img: ball,
      type: 'reverse',
      position: {
        x: ['center', 50],
        y: 'init',
      },
      speed: [2, 2],
      coords: [100, -30],
    },
  };

  constructor(gameSettings: GameSettings, startGameReady: boolean) {
    super();
    this.gameSettings = gameSettings;
    this.startGameReady = startGameReady;
  }

  events: Events = [
    { event: 'keypress', action: this.movePlatform.bind(this) },
  ];

  movePlatform(e) {
    const platformSpeed = this.gameElements.platform.speed as number;
    switch (e.key.toLowerCase()) {
      case 'a':
        this.gameElements.platform.coords[0] -= 1 * platformSpeed;
        if (!this.startGame)
          this.gameElements.ball.coords[0] -= 1 * platformSpeed;
        // this.movePlatform = "left";
        break;
      case 'd':
        this.gameElements.platform.coords[0] += 1 * platformSpeed;
        if (!this.startGame)
          this.gameElements.ball.coords[0] += 1 * platformSpeed;
        // this.movePlatform = "right";
        break;
      case ' ':
        if (this.startGameReady) this.startGame = true;
        break;
      default:
        return false;
    }
  }

  borderLimits(borders, x, y) {
    let validX = interval(x, { from: borders.left, to: borders.right });
    let validY = interval(y, { from: borders.bottom, to: borders.top });
    // TODO check code here
    // if (!validX.isValid) {
    //   const startFrom = validX.where === 'from' ? borders.left : borders.right;
    //   x = startFrom;
    // }
    // if (!validY.isValid) {
    //   let startFrom = validY.where === 'from' ? borders.bottom : borders.top;
    //   y = startFrom;
    // }
    return {
      xBord: x,
      yBord: y,
    };
  }

  isBallOnPlatform() {
    return (
      interval(this.gameElements.ball.coords[0], {
        from: this.gameElements.platform.coords[0] - 10,
        to: this.gameElements.platform.coords[0] + 80,
      }) && this.gameElements.ball.coords[1] === -30
    );
  }

  bounce(ball, elements, borders) {
    const isBouncedWallX = interval(ball.coords[0], {
      from: borders.left,
      to: +borders.right,
    });
    const isBouncedWallY = interval(ball.coords[1], {
      from: borders.bottom - 500,
      to: +borders.top - 120,
    });

    const isBouncedElements = elements.filter((object) => {
      const isBouncedWidth = interval(ball.coords[0], {
        from: object.coords[0] - 10,
        to: object.coords[0] + 110,
      });
      const inBouncedHeight = interval(borders.top - ball.coords[1], {
        from: object.coords[1],
        to: object.coords[1] + 110,
      });
      return (
        isBouncedWidth &&
        inBouncedHeight &&
        object.broken === false
      );
    });

    if (!isBouncedWallY) {
      this.gameElements.ball.speed![0] = -this.gameElements.ball.speed![0];
    } else if (!isBouncedWallX) {
      this.gameElements.ball.speed![1] = -this.gameElements.ball.speed![1];
    }

    if (this.isBallOnPlatform()) {
      this.gameElements.ball.speed![0] = -this.gameElements.ball.speed![0];
    }

    if (isBouncedElements.length) {
      this.gameElements.ball.speed![0] = -this.gameElements.ball.speed![0];
      isBouncedElements.forEach((el) => (el.broken = true));
    }
  }

  makeStartPosition(borders) {
    function parsePosition(position, defaultValue) {
      if (borders[position]) {
        return borders[position];
      } else if (position === 'center') {
        return borders['centerX'];
      } else if (typeof position === 'number') {
        return position;
      } else if (Array.isArray(position)) {
        return position.reduce(
          (calc, pos) => calc + parsePosition(pos, defaultValue),
          0
        );
      } else {
        return defaultValue;
      }
    }
    Object.keys(this.gameElements).forEach((elementKey) => {
      let element = this.gameElements[elementKey];
      if (element.position) {
        element.coords[0] = parsePosition(
          element.position.x,
          element.coords[0]
        );
        element.coords[1] = parsePosition(
          element.position.y,
          element.coords[1]
        );
      }
    }, this);
  }

  onGameOver() {
    if (this.gameElements.ball.coords[1] <= -100) {
      console.log('gameOver');
      this.gameElements.ball.coords = [0, -30];
      this.startGame = false;
    }
  }

  onBallMove(ball) {
    this.gameElements.ball.coords = [
      this.gameElements.ball.coords[0] + this.gameElements.ball.speed![1],
      this.gameElements.ball.coords[1] + this.gameElements.ball.speed![0],
    ];

    return {
      ...ball,
      coords: this.gameElements.coords,
    };
  }

  render(
    {
      canvas,
      context,
    }: {
      canvas: HTMLCanvasElement;
      context: CanvasRenderingContext2D;
    },
    reverseY: (Y: number) => number,
    borders
  ) {
    this.canvas = canvas;
    this.borders = borders;
    if (!this.startGame) {
      this.levelBlocks = this.buildLevel(1);
    }
    this.onGameOver();
    const buildGameData = {
      ...this.gameElements,
      ...this.levelBlocks,
    };
    if (this.startGame) {
      this.onBallMove.call(this);
    }
    Object.keys(buildGameData).forEach((element: string, _, elements) => {
      const isBroken = buildGameData[element]?.broken;
      if (isBroken === true) {
        return;
      }
      if (element == 'ball') {
        this.bounce(
          buildGameData[element],
          elements
            .filter((e) => !(e == 'ball' || e == 'background'))
            .map((i) => buildGameData[i]),
          this.borders
        );
      }
      let drawing = new Image();
      drawing.src = buildGameData[element].img;
      let [x, y, ...coords] = buildGameData[element].coords;
      if (buildGameData[element].type === 'reverse') {
        y = reverseY(y);
      }
      let { xBord, yBord } = this.borderLimits(borders, x, y);
      context.drawImage(drawing, xBord, yBord, ...(coords as []));
    }, this);
  }
}

export default ArcanoidCore;
