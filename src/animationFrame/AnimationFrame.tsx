export type Render = (
  context: CanvasRenderingContext2D,
  reverseY: (Y: number) => number
) => void;
export type Events = {
  event: string;
  element?: Element;
  action: () => void;
}[];

enum Borders {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
  CenterX = "centerX",
  CenterY = "centerY",
}

type PositionValue = 'init' | 'left' | 'center' | 'right' | number

type Position = {
    X: PositionValue
    Y: PositionValue
}

export type Bodrders = Record<Borders, number>;

class AnimationFrame {
  private exit: boolean = false;
  private canvasElement: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  borders: Bodrders = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    centerX: 0,
    centerY: 0,
  };
  private events: Events | null = null;
  init(canvasElement: HTMLCanvasElement, game: Render, events: Events, makeStartPosition) {
    this.events = events;
    if (events) this.makeListeners("add");
    this.context = canvasElement.getContext("2d");
    this.canvasElement = canvasElement;
    this.borders = this.calculateBorders();
    makeStartPosition(this.borders)
    this.run(game);
  }

  calculateBorders() {
    return {
      left: 0,
      right: this.canvasElement!.width - 100,
      bottom: 0,
      top: this.canvasElement!.height,
      centerY: this.canvasElement!.height / 2,
      centerX: this.canvasElement!.width / 2,
    };
  }

  private makeListeners(toDo: "add" | "remove") {
    this.events!.forEach(({ element, action, event }) => {
      element
        ? element[`${toDo}EventListener`](event, action)
        : document[`${toDo}EventListener`](event, action);
    });
  }

  reverseY(Y: number) {
    return this.canvasElement!.height - 100 - Y;
  }

  makeElementPosition

  run(game: Render) {
    const context = this.context;
    const canvas = this.canvasElement;
    const borders = this.borders;
    let start = () => {
      game({ context, canvas }, this.reverseY.bind(this), borders);
      this.run(game);
    };

    if (this.exit === false) {
      window.requestAnimationFrame(start.bind(this));
    }
  }

  onExit() {
    this.makeListeners("remove");
    this.exit = true;
  }
}

export default AnimationFrame;
