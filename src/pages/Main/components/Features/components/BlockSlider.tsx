import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
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
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    )
}

export {
    BlockSlider
}