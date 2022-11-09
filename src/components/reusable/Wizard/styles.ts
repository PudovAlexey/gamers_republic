import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        layout: {
            display: 'flex',
            justifyContent: 'spaceBetween'
        },
        steps: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            background: '#fff',
        },
        stepButton: {
            color: 'black'
        }
    },
  })
}

export { styleComponent }
