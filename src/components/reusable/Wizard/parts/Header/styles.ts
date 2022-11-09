import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        header: {
            width: '100%',
            background: '#1F2326',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            color: '#fff'
        }
    },
  })
}

export { styleComponent }
