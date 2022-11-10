import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        footerButtons: {
          justifyContent: 'right'
        },
        footerButton: {
          maxWidth: '50px',
          minWidth: '0px'
        },
        sideBox: {
          margin: "0 15px",
          padding: "5px 7px 5px",
          width: "30%",
          maxHeight: "300px",
          background: "#1F2326",
          color: "#F8F8F8"
        },
        wizard: {
          height: '100%',
          position: 'absolute',
          width: '100%'
        },
        layout: {
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
            background: "c",
            height: "91%",
            gap: "30px"
        },
        bodyBox: {
          width: '45%',
          background: "#F8F8F8",
          display: 'grid',
          gridTemplateRows: '1fr 60px'
        },
        steps: {
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            gap: '15px',
            background: '#fff',
        },
        stepButton: {
            color: '#F8F8F8'
        }
    },
  })
}

export { styleComponent }
