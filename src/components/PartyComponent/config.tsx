import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { ChatComponent } from './parts/ChatUpdate/ChatComponent';
import { TeamComponent } from './parts/Team/TeamComponent';
import { GameDetailsComponent } from './parts/GameDetails/GameDetails';

const partyParts = {
  chat:  {label: "Chat", icon: <ChatIcon/>, component: <ChatComponent/>},
  team:  {label: "Team", icon: <PeopleAltIcon/>, component: <TeamComponent/>},
  gameDetails:  {label: "GameDetails", icon: <VideogameAssetIcon/>, component: <GameDetailsComponent/>}
}

export {
    partyParts
}