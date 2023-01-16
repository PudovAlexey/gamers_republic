export type Events = {
  event: string;
  element?: Element;
  action: () => void;
}[];

export enum Borders {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  CenterX = 'centerX',
  CenterY = 'centerY',
}
export type Render = ({ 
  canvas, 
  context 
},
  reverseY: (Y: number) => number,
  borders: TBorders
) => void;

export type PositionValue = 'init' | 'left' | 'center' | 'right' | number;

export type TBorders = Record<Borders, number>;

class AnimationFrame {
  private exit: boolean = false;
  private canvasElement: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  borders: TBorders = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    centerX: 0,
    centerY: 0,
  };
  private events: Events | null = null;
  init(
    canvasElement: HTMLCanvasElement,
    game: Render,
    events: Events,
    makeStartPosition: (borders: TBorders) => void
  ) {
    this.events = events;
    if (events) this.makeListeners('add');
    this.context = canvasElement.getContext('2d');
    this.canvasElement = canvasElement;
    this.borders = this.calculateBorders();
    makeStartPosition(this.borders);
    this.run(game);
  }

  calculateBorders() {
    return {
      left: 0,
      right: this.canvasElement!.width - 100,
      bottom: 20,
      top: this.canvasElement!.height,
      centerY: this.canvasElement!.height / 2,
      centerX: this.canvasElement!.width / 2,
    };
  }

  private makeListeners(toDo: 'add' | 'remove') {
    this.events!.forEach(({ element, action, event }) => {
      element
        ? element[`${toDo}EventListener`](event, action)
        : document[`${toDo}EventListener`](event, action);
    });
  }

  reverseY(Y: number) {
    let reverseY = this.canvasElement!.height - 100 - Y;
    return reverseY <= 0 ? 0 : reverseY;
  }

  run(game: Render) {
    const context = this.context!;
    const canvas = this.canvasElement!;
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
    this.makeListeners('remove');
    this.exit = true;
  }
}

export default AnimationFrame;
