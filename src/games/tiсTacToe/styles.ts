import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
       icon: {
        height: "30px",
        width: "30px",
        marginLeft: '10px'
       },
       field: {
        height: '100%',
        margin: 'auto auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
       row: {
        display: 'flex',
        justifyContent: 'center',
       },
       col: {
        border: '2px solid black',
        width: '150px',
        height: '150px',
        alignContent: 'center',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    },
  })
}

export { styleComponent }
