import React, { useEffect, useRef } from "react";
import AnimationFrame from "../../animationFrame/AnimationFrame";
import  background  from "./arcanoidAssets/background.png"
import  platform  from "./arcanoidAssets/platform.png"
import Levels from "./levels/Levels";
// import platform from './assets/platform'
// import ball from './assets/ball'

class Game extends Levels {
    private gameElements = {
        background: {
            img: background,
            coords: [
                25,
                25
            ]
        },
        platform: {
            img: platform,
            type: 'dinamicElement',
            size: {
                width: '15px',
                height: '15px'
            },
            coords: [
                0,
                0
            ]
        },
    }

    
    render(canvas, reverseY) {
        const levelBlocks = this.buildLevel()
        const buildGameData = {
            ...this.gameElements,
            ...levelBlocks
        }
        Object.keys(buildGameData).forEach(element => {
            let drawing = new Image() 
            drawing.src = buildGameData[element].img
            let [x, y, ...coords] = buildGameData[element].coords

            if (buildGameData[element].type === 'dinamicElement') {
                console.log(element)
                y = reverseY(y)
            }
            console.log(y)
            canvas.drawImage(drawing, x, y, ...coords)
        }, this)
    }

}

const game = new Game()

const animationFrame = new AnimationFrame()

function Arcanoid() {
    const arcanoidRef = useRef(null)
    useEffect(() => {
        if (arcanoidRef.current) {
            animationFrame.init(arcanoidRef.current, game.render.bind(game))
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

export {Arcanoid}