import { width } from '@mui/system'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
       login: {
        background: "#1F2326",
        maxWidth: "500px",
        height: "450px",
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        margin: 'auto',
        top: '170px',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        padding: '15px 20px',
        title: {
          color: '#f8f8f8',
          mb: '16px'
        },
        email: {
          marginBottom: '16px'
        },
        inputBlock: {
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        },
        buttons: {
          position: 'absolute',
          bottom: "30px",
          left: 0,
          right: 0,
          gap: "15px",
          display: 'flex',
          justifyContent: 'right',  
          paddingRight: '16px'
        },
        layout: {
            position: 'relative',
            width: '100%',
            height: '100%',
        }
       }
    },
  })
}

export { styleComponent }
