import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        footerButtons: {
          justifyContent: 'right',
          alignItems: 'center',
          background: "#1F2326",
          gap: "30px",
          position: 'absolute',
          bottom: 0,
          paddingRight: "15px",
          width: "calc(100% - 15px)"
        },
        footerButton: {
          borderRadius: '4px',
          maxWidth: '50px',
          height: "50%",
          color: "#F8F8F8",
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          minWidth: '0px'
        },
        sideBox: {
          padding: "16px",
          width: "30%",
          maxHeight: "300px",
          background: "#1F2326",
          color: "#F8F8F8"
        },
        wizard: {
          height: '100%',
          width: '100%',
          padding: "15px"
        },
        layout: {
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
            background: "c",
            height: "91%",
            gap: "30px",
        },
        bodyBox: {
          width: '100%',
          marginBottom: "20px",
          background: "#F8F8F8",
          position: 'relative'
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

const dynamicStyleComponent = (theme) => {
  return {
    footerButtons: (variant) => {
      const styles = {}
          switch(variant) {
            case 'contained': styles['background'] = '#d93644'
              break;
            case 'outlined': styles['border'] = '1px solid s#d93644'
              break;
          }
    return styles
    },
    stepButtonType: (variant) => {
      let color
      switch (variant) {
        case 'active': color = "#d93644"
          break;
        case 'disabled': color = "#868686"
          break 
        default:  color = "#F8F8F8"
      }
      return {
        color 
      }
    }
  }
}

export { styleComponent, dynamicStyleComponent }
