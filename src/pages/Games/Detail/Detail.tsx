import React, {useState, useEffect} from 'react';
import {Typography, Toolbar, Box} from "@mui/material";
import GameCard from './fragments/GameCard';
import api from '../../../api/api';

function Detail({search}) {
    let [gameList, setGameList] = useState([])

    useEffect(() => {
        api.findGameList("Arcanoid")
        .then(games => {
            setGameList(games)
        })
    }, [])
    return (
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{
            display: "flex",
            gap: "10px"
        }}>
        {gameList.map(game => (
            <GameCard/>
        ))}
        </Box>
      </Box>
    )
}

export default Detail