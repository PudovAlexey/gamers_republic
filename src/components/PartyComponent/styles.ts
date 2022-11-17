import zIndex from '@mui/material/styles/zIndex'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        layout: {
            position: 'fixed',
            right: '0px',
            zIndex: 9999
        },
        partyContainer: {
            position: 'absolute',
            height: "calc(100vh - 150px)",
            width: "30em",
            left: "30px"

        },
        partyContainerItem: {
            top: '50px',
            position: 'relative'
        },
        labelBtn: {
            height: '50px',
            width: '50px',
            position: 'relative',
            borderRadius: '50% 0 0 50%',
            background: '#1F2326'
        }
    },
  })
}

const dinamicStyles = {
    activeLink: (isActive) => {
       
       const backgroundColor = isActive ? '#FF4656' : "#1F2326"
        return {
            backgroundColor
        }
    }
}

export { styleComponent, dinamicStyles }