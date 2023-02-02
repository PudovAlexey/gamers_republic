const slickOptions = {
    infinite: false,
    centerMode: true,
    centerPadding: '50px',
    slidesToShow: 3,
    slidesToScroll: 3,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
        {
          breakpoint: 200,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 3
          }
        }
      ]  
}

export {
    slickOptions
}