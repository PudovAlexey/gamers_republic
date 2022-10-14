import React, { useState, useEffect } from 'react';
import { Typography, Toolbar, Box } from '@mui/material';
import GameCard from './fragments/GameCard';
import api from '../../../api/api';
import { Game } from '../../../games/GamesList/types/Games/types';

function Detail({ filters }) {
  let [gameList, setGameList] = useState([]);

  useEffect(() => {
    api.findGameList(filters).then((games: Game[]) => {
      setGameList(games);
    });
  }, [filters]);
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
        }}
      >
        {gameList.map((game) => (
          <GameCard {...game} />
        ))}
      </Box>
    </>
  );
}

export default Detail;
