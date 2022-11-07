import { width } from '@mui/system'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        header: {
            layout: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '150px',
                marginRight: '86px',
              },
            main: {
                display: 'flex',
                justifyContent: 'space-around',
              },
            userInfo: {
                gap: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }
        }
    },
  })
}

export { styleComponent }
