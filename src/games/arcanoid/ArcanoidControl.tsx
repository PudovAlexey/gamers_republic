import React, { useEffect, useRef } from "react";
import AnimationFrame from "../../animationFrame/AnimationFrame";
import ArcanoidCore from "./ArcanoidCore";

const game = new ArcanoidCore()

const animationFrame = new AnimationFrame()

function ArcanoidControl() {
    const arcanoidRef = useRef(null)
    useEffect(() => {
        if (arcanoidRef.current) {
            animationFrame.init(arcanoidRef.current, game.render.bind(game), game.events, game.makeStartPosition.bind(game))
        }
        return () => {
            // animationFrame.onExit()
        }
    }, [])

    return <canvas
    width ="1600"
    height="700"
    ref={arcanoidRef}
    ></canvas>
}

export {ArcanoidControl}