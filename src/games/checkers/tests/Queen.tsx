import Figure from "../elements/Figure"
import Queen from "../elements/Queen"

export function QueenTests(field) {
    const queen = new Queen("Red", {
        col: "A",
        row: "1",
    },
    field
    )
    field["A"]["1"] = queen.render()
    field["A"]["1"].figure = queen

    const figure = new Figure({
        col: "F",
        row: "4",
    },
    "Black",
    -1, 
    field
    )
    const figure2 = new Figure({
        col: "D",
        row: "4",
    },
    "Black",
    -1, 
    field
    )
    const figure3 = new Figure({
        col: "E",
        row: "5",
    },
    "Black",
    -1, 
    field
    )
    field["A"]["1"] = queen.render()
    field["A"]["1"].figure = queen
    field["F"]["4"] = figure.render()
    field["F"]["4"].figure = figure
    field["D"]["4"] = figure2.render()
    field["D"]["4"].figure = figure2
    field["E"]["5"] = figure3.render()
    field["E"]["5"].figure = figure3
    return field
    
}