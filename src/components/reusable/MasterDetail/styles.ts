import reactCSS from 'reactcss'
const stylesComponent = function (theme) {
  return reactCSS({
    default: {
        master: {
            background: "#1F2326",
            position: "relative"
        },
        pointerResize: {
            background: "white",
            width: "10px",
            border: "2px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "ew-resize"
          }
    },
  })
}

export { stylesComponent }
