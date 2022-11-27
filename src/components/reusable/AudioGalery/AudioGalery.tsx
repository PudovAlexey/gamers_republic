import { List, ListItem } from '@mui/material';

function AudioGalery({ audios }) {
  return (
    <List>
      {audios.map((audio, idx) => (
       <ListItem key={idx}>
         <audio controls>
          <source type="audio/mp3" src={audio}></source>
          Your blowser is not support
        </audio>
       </ListItem>
      ))}
    </List>
  );
}

export { AudioGalery };
