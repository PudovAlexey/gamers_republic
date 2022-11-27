import { List, ListItem } from '@mui/material';
import { AudioViewer } from '../../AudioViewer/AudioViewer';

function VoiseAddsGalery({ audios }) {
  return (
    <List>
      {audios.map((audio, idx) => (
       <ListItem key={idx}>
        <AudioViewer audio={audio}/>
       </ListItem>
      ))}
    </List>
  );
}

export { VoiseAddsGalery };
