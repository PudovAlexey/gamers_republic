import React, { useEffect, useRef } from "react";
import AnimationFrame from "../../animationFrame/AnimationFrame";
import ArcanoidCore from "./ArcanoidCore";
import { Box } from "@mui/system";
import GameMenu from "../reusable/GameMenu";
import SoundSettings from "../reusable/settings/SoundSettings";
import { useState } from "react";
import { ArcanoidThemes, GameSettings } from "./types";
const menuTree = {
    node: {virtual: true},
    children: [
        {node: {text: "StartGame", action: () => console.log('startGame')}},
        {node: {text: "Options"}, children: [
            {node: {text: "Sound Settings", control: <SoundSettings/>}},
            {node: {text: "Difficult Settings", control: <div>difficult</div>}} 
        ]},
        {node: {text: "Out", action: console.log('out')}, children: ""}
    ]
}


const animationFrame = new AnimationFrame()

function Game() {
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        speed: 1,
        soundVolume: 100,
        theme: ArcanoidThemes.Wood
    })
    const [startGameReady, setStartGameReady] = useState<boolean>(false)

    const game = new ArcanoidCore(gameSettings, startGameReady)
    const arcanoidRef = useRef(null)
    useEffect(() => {
        if (arcanoidRef.current) {
            animationFrame.init(arcanoidRef.current, game.render.bind(game), game.events, game.makeStartPosition.bind(game))
        }
        return () => {
            // animationFrame.onExit()
        }
    }, [])

    return (
        <Box sx={{
            position: 'relative'
        }}>
            <canvas
    width ="1600"
    height="700"
    ref={arcanoidRef}
    ></canvas>
            <GameMenu
            menuTree={menuTree}
            />
            <div ></div>
    </Box> 
    )
}

export default Game