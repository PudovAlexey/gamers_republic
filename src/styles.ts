import reactCSS from 'reactcss'
const mainStyles = function (theme) {
  return reactCSS({
    default: {
        backgroundIcon: {
            position: 'relative',
            background: 'url(/main/background.jpg)',
            overflow: 'hidden',
            mixBlendMode: "multiply"
          },
        backgroundOverlay: {
            position: 'relative',
            background: 'rgba(255, 70, 86, .7)',
            overflow: 'hidden',
          },
          mainPage: {
            position: 'relative',
            minHeight: 'calc(100vh - 200px)',
          }
    },
  })
}

export { mainStyles }
