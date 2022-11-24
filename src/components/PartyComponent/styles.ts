import zIndex from '@mui/material/styles/zIndex'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        layout: {
            position: 'fixed',
            right: '0px',
            zIndex: 9999,
        },
        partyContainer: {
            position: 'absolute',
            height: "calc(100vh - 150px)",
            width: "30em",
            left: "50px",
            background: "#1F2326",
            maxHeight: "700px",

        },
        partyContainerTitle: {
            display: "flex",
            justifyContent: 'center',
            color: '#f8f8f8'
        },
        partyContainerItem: {
            top: '10px',
            transition: 'transform .5s ease-out',
            position: 'absolute',
            right: '0',

        },
        labelBtn: {
            height: '35px',
            width: '50px',
            position: 'relative',
            borderRadius: '50% 0 0 50%',
            background: '#1F2326',
            zIndex: '10000',
            transition: 'transform .5s ease-out, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }
    },
  })
}

const dinamicStyles = {
    activeLink: (isActive) => {
       
       const backgroundColor = isActive ? '#FF4656' : "#1F2326"
       const borderColor = !isActive ? '#FF4656' : "#1F2326"
        return {
            backgroundColor,
            border: `2px solid ${borderColor}`
        }
    }
}

export { styleComponent, dinamicStyles }
