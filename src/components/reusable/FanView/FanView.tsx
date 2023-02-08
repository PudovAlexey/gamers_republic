import "./slick/theme.css"
import Slider from "react-slick";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/typedReduxHooks";
import { onInit, onExit, onScroll, setView, afterChange } from "./redux";
import { slickOptions } from "./redux/slickOptions";
import { fanControlSelector, fanDataByIdSelector, fanIdsSelector, scrollContainerHeightSelector, slickSpeedSelector } from "./redux/selectors";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { AFTER_CHANGE, SCROLL } from "./redux/actionCreators";

type TProps = {
    fanIds: number[],
    fanData: Record<string, unknown>
    fanControl: (value) => JSX.Element
}

function FanView({fanIds, fanData, fanControl}: TProps) {
    const scrollSpeed = useAppSelector(slickSpeedSelector)
    const scrollContainerHeight = useAppSelector(scrollContainerHeightSelector)
    const sliderRef = useRef()
    const scrollRef = useRef()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(onInit({fanIds, fanData, fanControl, slickRef: sliderRef.current, scrollRef: scrollRef.current}))
        return () => {
            dispatch(onExit())
        }
    })

    return (
        <ScrollView>
            <Slider beforeChange={(value) => dispatch(AFTER_CHANGE(value))} speed={scrollSpeed} ref={sliderRef} className={"fanView"} {...slickOptions}>
        {FanViewControl()}
            </Slider>
            <ScrollWrapper ref={scrollRef} onScroll={(e) => dispatch(SCROLL(e))}>
            <ScrollContainer sx={{height: scrollContainerHeight + 'px'}}></ScrollContainer>
            </ScrollWrapper>
        </ScrollView>
    )   
}

function FanViewControl() {
    const fanIds = useAppSelector(fanIdsSelector)

    return fanIds.map(id => (
        <FanData key={id} id={id}/>
    ))   
}

function FanData({id}) {
    const dispatch = useAppDispatch()
    const componentRef = useRef()
    const fanControl = useAppSelector(fanControlSelector)
    const fanData = useAppSelector((state) => fanDataByIdSelector(state, id))
    const Control = fanControl(fanData)
    dispatch(setView(componentRef.current))
    return (
        <Box ref={componentRef}>
            {Control}
        </Box>
    )
}

const ScrollView = styled(Box)({
    position: 'relative'
})

const ScrollWrapper = styled(Box)({
    overflow: 'auto',
    position: 'absolute',
    top: "0px",
    bottom: "0px",
    left: "-30px",
    right: "-30px",
    backbround: 'red'
})

const ScrollContainer = styled(Box)({})

export {
    FanView
}