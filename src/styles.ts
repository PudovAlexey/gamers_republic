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
        background: 'rgba(242, 19, 39, .7)',
        overflow: 'hidden',
      },
      mainPage: {
        position: 'relative',
        minHeight: 'calc(100vh - 200px)',
        maxWidth: '96.5vw',
      },
      noSelect: {
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        UserSelect: 'none',
      },
      select: {
        WebkitTouchCallout: 'text',
        WebkitUserSelect: 'text',
        KhtmlUserSelect: 'text',
        MozUserSelect: 'text',
        MsUserSelect: 'text',
        UserSelect: 'text',
      },
    },
  });
};

export { mainStyles };
