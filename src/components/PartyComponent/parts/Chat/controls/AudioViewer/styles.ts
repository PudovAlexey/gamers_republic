import reactCSS from 'reactcss'
const stylesComponent = function (theme) {
  return reactCSS({
    default: {
        voiseBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'spaceBetween',
            background: "#1F2326",
            color: "$FF4656"
        },
        canvas: {
            width: "100%",
            height: "25% !important",
            border:"1px solid",
            marginLeft: "auto",
            marginRight: "autos"
        }
    },
  })
}

export { stylesComponent }
