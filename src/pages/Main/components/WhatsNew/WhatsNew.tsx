import Slider from "react-slick";
import "./slickTheme.css"
import {Shield} from '../../../../assets/main/common/Shield'
import { styled } from "@mui/material"
import { Box } from "@mui/system"
import { LabelCard, TCard } from "../../../../components/reusable/LabelCard/LabelCard"

const slickOptions = {
    speed: 500,
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

function WhatsNew() {
    return (
        <WhatsNewBlock>
          <SlickWrapper>
          <Slider {...slickOptions} className={'verticalSlider'}>
            {LabelCards()}
          </Slider>
          </SlickWrapper>
        </WhatsNewBlock>
    )
}

const WhatsNewBlock = styled(Box)({
    background: '#f8f8f8',
    height: '100vh',
    width: '100vw'
})

const SlickWrapper = styled(Box)({
    width: '70%',
    height: '100vh',
    margin: 'auto auto'
})

function LabelCards() {
    
    return new Array(100).fill('').map((i, idx) => {
            const mockData: TCard= {
                    title: `TEST ${idx}`,
                link: {
                    text: "LINK",
                    navTo: ""
                },
                description: 'TEST DESCRIPTION',
                icon: <Shield size={'100%'}/>
                }
            return (
                    <LabelCard key={idx} {...mockData}/>
            )
        })

}

export {
    WhatsNew
}