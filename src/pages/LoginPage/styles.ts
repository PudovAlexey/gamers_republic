import { width } from '@mui/system'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
       login: {
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        layout: {
            position: 'relative',
            width: '100%',
            height: '100%'
        }
       }
    },
  })
}

export { styleComponent }
