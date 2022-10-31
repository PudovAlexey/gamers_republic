import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
       avatar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
       },
    },
  })
}

export { styleComponent }
