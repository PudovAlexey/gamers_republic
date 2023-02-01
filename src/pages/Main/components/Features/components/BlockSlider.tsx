import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import slide1 from './sliderItems/slide1.jpg'
import slide2 from './sliderItems/slide2.jpg'
import slide3 from './sliderItems/slide3.jpg'
// import "./slickTheme.css";
import "./slickTheme.css"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

function BlockSlider() {
    return (
        <Slider className={'slickBlock'} style={{
            height: '100%',
            width: '40%'}} {...settings}>
        <img src={slide1} alt={"slide1"}/>
        <img src={slide2} alt={"slide2"}/>
        <img src={slide3} alt={"slide3"}/>
      </Slider>
    )
}

export {
    BlockSlider
}