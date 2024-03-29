import { List, ListItem } from '@mui/material';
import { useRef } from 'react';
import App from '../../../../../../reusable/AudioTest/App';
import { AudioViewer } from '../../AudioViewer/AudioViewer';

function VoiseAddsGalery({ audios }) {
  const itemsRef = useRef([]);
  return (
    <List>
      {audios.map((audio, idx) => (
       <ListItem key={idx}>
        {/* <AudioAnalyser Audiodata={audio}/> */}
        <AudioViewer id={idx} items={itemsRef} audio={audio}/>
       </ListItem>
      ))}
    </List>
  );
}

export { VoiseAddsGalery };
