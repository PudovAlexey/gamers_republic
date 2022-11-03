import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        messageToast: {
            position: 'fixed',
            left: '10%',
            bottom: '5%',
            width: '40%',
            zIndex: '9999'
        }
    },
  })
}

export { styleComponent }
