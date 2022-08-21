import { GameElements } from "../ArcanoidCore"
import { Assets } from "./Levels"
class Level1 {
    private wall: string
    private levelOptions = {
        rows: 5,
        cols: 3
    }
    constructor(assets: Assets) {
        this.wall = assets.wall
    }

    makeLevel() {
        const wall = this.wall
        const colls = new Array(this.levelOptions.cols).fill('')
        const rows = new Array(this.levelOptions.rows).fill('')
        const level: GameElements = {}
        colls.forEach((_, colIdx) => {
            rows.forEach((_, rowIdx) => {
                level[`${colIdx}_${rowIdx}`] = {
                    img: wall,
                    coords: [
                        (colIdx + 1) * 200,
                        (rowIdx + 1) * 500
                    ]
                }
            });
        });
        return level
    }

    parseLevel() {
        return this.makeLevel()
        }
    }

export default Level1