import { randomUnit } from '../../../utils/utils';
import { forEachField, runByAllFields } from '../../utils/fiels';
import { compareWin, oposite } from '../utils/utils';

class PC {
  side;
  fieldState;
  stepCount = 0;
  value;
  iconsDict;
  winCenter = false;
  think = false;
  warnings = [];
  opositeSide;
  constructor(side, fieldState, iconsDict) {
    this.side = side;
    this.fieldState = fieldState;
    this.iconsDict = iconsDict;
    this.opositeSide = oposite(side);
  }

  checkFill(variants) {
    const that = this
    return Object.keys(variants).reduce((filterSteps, key) => {
      if (variants[key].length === 2) {
        const {col, row} = variants[key][0]
        filterSteps[key] = {
            ...variants[key],
            empty: that[`check${key}`](col, row)
        }
      }
      return filterSteps;
    }, {});
  }

  checkvertical(_ ,checkRow) {
    let empty;
    const fieldState = this.fieldState;
    const compareRow = (col, row) => {
      const coords = { col, row };
      if (!fieldState[col][row].key && +checkRow === +row) empty = coords;
    };
    runByAllFields(this.fieldState, compareRow);
    return empty;
  }

  checkhorisontal(checkCol, _) {
    let empty;
    const fieldState = this.fieldState;
    const compareRow = (col, row) => {
      const coords = { col, row };
      if (!fieldState[col][row].key && checkCol === col) empty = coords;
    };
    runByAllFields(this.fieldState, compareRow);
    return empty;
  }

  checkdiagonalLeft() {
    let checkField = 0;
    let empty;
    const fieldState = this.fieldState;
    const compareRow = (col, row) => {
      const coords = { col, row };
      if (
        row === checkField &&
        col === String.fromCharCode(65 + checkField)
      ) {
        if (!fieldState[col][row].key)  empty = coords
        checkField++
      }
    };
    runByAllFields(this.fieldState, compareRow);
    return empty
  }

  checkdiagonalRight() {
    let checkCol = 0;
    let checkRow = 2
    let empty;
    const fieldState = this.fieldState;
    const compareRow = (col, row) => {
      const coords = { col, row };
      if (
        row === checkRow &&
        col === String.fromCharCode(65 + checkCol)
      ) {
        if (!fieldState[col][row].key)  empty = coords
        checkRow--
        checkCol++
      }
    };
    runByAllFields(this.fieldState, compareRow);
    return empty
  }

  avalibleSteps() {
    const canStep = [];
    const fieldState = this.fieldState;
    const checkRival = compareWin(this.fieldState, oposite(this.side));
    const checkPC = compareWin(this.fieldState, this.side);
    const rivalSteps = checkRival.showCoordinates();
    const pcSteps = checkPC.showCoordinates();
    const dangers = this.checkFill(rivalSteps);
    const opportunities = this.checkFill(pcSteps);

    function checkField(col, row) {
      const coords = { col, row };
      if (!fieldState[col][row].key) canStep.push(coords);
      return fieldState[col][row];
    }
    forEachField(this.fieldState, checkField);
    return {
      canStep,
      dangers,
      opportunities,
    };
  }

  onFirstStep() {
    if (this.fieldState['B']['1'].key) {
      this.onFirstVariant();
    } else {
      this.fieldState['B']['1'] = this.render;
      this.winCenter = true;
    }
  }

  onFirstVariant() {
    const isDefenced = this.onDefence();
    if (isDefenced) return;
    const diahonalVariants = [
      { col: 'A', row: 1 },
      { col: 'B', row: 0 },
      { col: 'B', row: 2 },
      { col: 'C', row: 1 },
    ];
    const randomIdx = randomUnit(0, diahonalVariants.length - 1);
    const coords = diahonalVariants[randomIdx];
    this.fieldState[coords.col][coords.row] = this.render;
  }

  onDefence() {
    const avalibleSteps = this.avalibleSteps();
    if (Object.keys(avalibleSteps.dangers).length) {
      const preventDanger = avalibleSteps.dangers['empty'];
      this.fieldState[preventDanger.col][preventDanger.row] = this.render;
      return true;
    } else if (Object.keys(avalibleSteps.dangers).length) {
        const preventDanger = avalibleSteps.dangers['empty'];
        this.fieldState[preventDanger.col][preventDanger.row] = this.render;
        return true;
    } else if (this.stepCount > 1) {
      const randomIdx = randomUnit(0, avalibleSteps.length - 1);
      const coords = avalibleSteps[randomIdx];
      this.fieldState[coords.col][coords.row] = this.render;
    }
  }

  get render() {
    return {
      key: this.side,
      value: this.iconsDict[this.side].value,
    };
  }

  isRival(elem) {
    return elem === this.opositeSide;
  }

  async pcThink() {
    this.think = true;
    const fieldState = this.fieldState;
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(fieldState);
        this.think = false;
      }, 1000);
    });
    return promise;
  }

  stepTo(fieldState) {
    this.fieldState = fieldState;
    switch (this.stepCount) {
      case 0:
        this.onFirstStep();
        break;
      case 1:
        this.onFirstVariant();
        break;
      default:
        this.onDefence();
    }
    ++this.stepCount;
    this.warnings = [];
    return this.pcThink();
  }
}

export default PC;
