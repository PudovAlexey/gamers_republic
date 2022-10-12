import React, {useEffect, useState} from "react"
import {
    Button,
    ButtonGroup,
    Switch,
    Typography,
    Box,
    Input,
  } from "@mui/material";
import Timer from "../../../../../components/reusable/Timer/Timer"
 function TimerSettings({gameParams, setGameParams}) {
   const [time, setTime] = useState("00:00")
   const [showTimer, setShowTimer] = useState(gameParams.timer.isOn)

  useEffect(() => {
    let parseMiliseconds = time.match(/(?<minutes>^\d+):(?<seconds>\d+)/);
    if (!(parseMiliseconds?.groups?.minutes && parseMiliseconds?.groups?.seconds)) {
      return
    }
    const calc =
      +parseMiliseconds.groups.minutes * 60000 +
      +parseMiliseconds.groups.seconds * 1000;
    setGameParams((prev) => ({
      ...prev,
      timer: { ...prev.timer, tick: calc },
    }));
  }, [time, gameParams])

  useEffect(() => {
    setGameParams((prev) => ({
      ...prev,
      timer: { ...prev.timer, isOn: showTimer },
    }));
  }, [showTimer])

    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <Box>
          <Typography>Timer On:</Typography>
          <Switch
            onChange={() => setShowTimer(prev => !prev)}
            checked={showTimer}
          />
        </Box>
        <Box>
          {
          showTimer ?
            <Box>
              <Timer
                value={time}
                onChange={(e) => setTime(e)}
              />
            </Box>
           : null
           }
        </Box>
      </Box>
    )
  }

  export default TimerSettings