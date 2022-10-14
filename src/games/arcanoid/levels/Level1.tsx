import { GameElements } from '../ArcanoidCore';
import { Assets } from './Levels';
class Level1 {
  private wall: string;
  private levelOptions = {
    cols: 5,
    rows: 14,
  };
  constructor(assets: Assets) {
    this.wall = assets.wall;
  }

  makeLevel() {
    const wall = this.wall;
    const colls = new Array(this.levelOptions.cols).fill('');
    const rows = new Array(this.levelOptions.rows).fill('');
    const level: GameElements = {};
    const spacing = 0;
    rows.forEach((_, colIdx) => {
      colls.forEach((_, rowIdx) => {
        if (rowIdx === 0) colIdx = colIdx + spacing;
        level[`${colIdx}_${rowIdx}`] = {
          img: wall,
          broken: false,
          coords: [colIdx * 110 + 50, rowIdx * 50 + 150, 100, 20],
        };
      });
    });
    return level;
  }

  parseLevel() {
    return this.makeLevel();
  }
}

export default Level1;
