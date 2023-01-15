import reactCSS from 'reactcss';
const mainStyles = function (theme) {
  return reactCSS({
    default: {
      backgroundIcon: {
        position: 'relative',
        background: 'url(/main/background.jpg)',
        overflow: 'hidden',
        mixBlendMode: 'multiply',
      },
      backgroundOverlay: {
        position: 'relative',
        background: 'rgba(255, 70, 86, .7)',
        overflow: 'hidden',
      },
      mainPage: {
        position: 'relative',
        minHeight: 'calc(100vh - 200px)',
        maxWidth: '96.5vw',
      },
      noSelect: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      },
      select: {
        '-webkit-touch-callout': 'text',
        '-webkit-user-select': 'text',
        '-khtml-user-select': 'text',
        '-moz-user-select': 'text',
        '-ms-user-select': 'text',
        'user-select': 'text',
      },
    },
  });
};

export { mainStyles };
