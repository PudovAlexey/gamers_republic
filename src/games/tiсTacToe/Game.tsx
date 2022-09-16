import React, { useEffect, useState } from "react";
import Tic from "./assets/Tic.png";
import Tac from "./assets/Tic.png";
import { Box, Toolbar, Typography } from "@mui/material";
import { buildFieldByCoords } from "../utils/fiels";
let fild = {
  A: { 1: {}, 2: {}, 3: {} },
  B: { 1: {}, 2: {}, 3: {} },
  C: { 1: {}, 2: {}, 3: {} },
};
function Game() {
  return (
    <Box>
      <Toolbar></Toolbar>
      <Box>
        {buildFieldByCoords(
          fild,
          (col) => (
            <Box>{col}</Box>
          ),
          (row, colIdx, rowIdx) => {
			const colorRow = 'black'
			return (
				<Box sx={{
					backbround: 'colorRow'
				}}>{row}</Box>
			  )
		  }
        )}
      </Box>
    </Box>
  );
}

export default Game;
