import Figure from "./Figure";
import Red from "../assets/red_queen.png";
import Black from "../assets/black_queen.png";
import { TField } from "../../utils/types";
import { TLights } from "./types";

class Queen extends Figure implements TField {
  private figures = {
    Red,
    Black,
  };

  private lights: TLights[] = [];

  constructor(color, coords, fieldState) {
    super();
    this.coords = coords;
    this.color = color;
    this.fieldState = fieldState;
  }

  makeLights(col, row) {
    let coords = [
      this.fromLeftBottom(col, row),
      this.fromLeftTop(col, row),
      this.fromRightTop(col, row),
      this.fromRightBottom(col, row),
    ];
    function handleToBorder(nextCoord, eatMark, end) {
      if (nextCoord.value && !nextCoord.value.key)
        this.fieldState[nextCoord.coords.col][nextCoord.coords.row].light =
          "red";
      let light: TLights = {
        col: nextCoord.coords.col,
        row: nextCoord.coords.row,
      };
      if (
        nextCoord.value &&
        nextCoord.value.key &&
        nextCoord.value.key !== this.color &&
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value &&
        !this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value.key
      ) {
        light.eat = nextCoord;
        eatMark = true;
      } else if (nextCoord?.value?.key && 
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value &&
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value.key
        ) {
          end = true
      }
      this.lights.push(light);

      if (
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value
      ) {
        if (end) return;
        if (eatMark) {
          handleToBorder.call(
            this,
            this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row),
            eatMark,
            true
          );
          return;
        }
        handleToBorder.call(
          this,
          this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row),
          eatMark
        );
      }
    }
    coords.map((nextCoord) => {
      let eatMark = false;
      const isKey = this.fieldState[nextCoord.coords.col] && this.fieldState[nextCoord.coords.col][nextCoord.coords.row]?.key
      const isHasField = this.fieldState[nextCoord.coords.col] && this.fieldState[nextCoord.coords.col][nextCoord.coords.row]
      if (isHasField && !isKey) {
        this.fieldState[nextCoord.coords.col][nextCoord.coords.row].light =
          "red";
      }
      const light: TLights = {
        col: nextCoord.coords.col,
        row: nextCoord.coords.row,
      };
      if (
        nextCoord.value &&
        nextCoord.value.key &&
        nextCoord.value.key !== this.color &&
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value &&
        !this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row).value.key
      ) {
        light.eat = nextCoord;
        eatMark = true;
      }
      this.lights.push(light);
      if (eatMark) {
        handleToBorder.call(
            this,
            this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row),
            eatMark,
            true
          );
          return  
      }
      handleToBorder.call(
        this,
        this[nextCoord.key](nextCoord.coords.col, nextCoord.coords.row),
        eatMark
      );
    }, this);
  }

  lightAvalibleFields(eatContinue: any) {
    let { col, row } = this.coords;
    const clearLights = (column) => delete column.light;
    this.forEachField(clearLights);
    if (eatContinue) {
      this.hasEat(col, row);

      return this.fieldState;
    }
    this.makeLights(col, row);
    const canEat = this.lights.filter(light => !!light.eat)
    if (canEat.length) {
      const clearNotEatLights = (column, col, row) => {
        const isAfterEatCoords = canEat.find(eat => {
          return JSON.stringify(this[eat.eat.key](eat.eat.coords.col, eat.eat.coords.row).coords) === JSON.stringify({col, row: +row})
        }) 
        if(!isAfterEatCoords) {
          delete column.light;
        }
      }
      this.forEachField(clearNotEatLights)
    }
    return this.fieldState;
  }
  render() {
    return {
      key: this.color,
      value: this.figures[this.color],
    };
  }
}

export default Queen;
