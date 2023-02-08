import { ERoutes } from "../../../routes";
import ModeSettings from "../../reusable/settings/ModeSettings";
import SoundSettings from "../../reusable/settings/SoundSettings";
import TimerSettings from "../../reusable/settings/TimerSettings";

export function GameItems({
    navigate,
    setStartGame,
    gameParams,
    setGameParams,
    pause,
    setPause
}) {
    return {
        node: {virtual: true},
        children: [
            {
                node: pause ? {
                    text: "Resume",
                    action: function () {
                        setPause((prev) => !prev);
                      },
                } : {
                    text: "Start Game",
                    action: function () {
                        setStartGame((prev) => !prev);
                      },
                },
            },
            {
                node: {
                    text: "Options"
                },
                children: [
                    {
                        node: {
                            text: "Mode",
                            control: <ModeSettings
                            gameParams={gameParams}
                            setGameParams={setGameParams} /> 
                            
                        }
                    },
                    {
                        node: {
                            text: "Timer",
                            control: <TimerSettings 
                            gameParams={gameParams}
                            setGameParams={setGameParams} /> 
                        }
                    },
                    {
                        node: {
                            text: "SountSettings",
                            control: <SoundSettings/> 
                        }
                    }
                ]
            },
            {
                node: {
                  text: 'Out',
                  action: function () {
                    navigate(ERoutes.Games);
                  },
                },
                children: '',
              },
        ]
    }
}