import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { display } from '@mui/system';
import { useRef } from 'react';
import { stylesComponent } from './styles';
import { useTheme } from '@emotion/react';

function MasterDetail({ Master, Detail }) {
  const theme = useTheme()
  const masterControl = useRef()
  const MasterControl = Master.control
  const DetailControl = Detail.control
  const styles = stylesComponent(theme)

  function onStartMoveMaster(e) {
    // console.log(e, masterControl)
    const currentRightPosition = e.currentTarget.getBoundingClientRect().x
    if (masterControl.current) {
      function handleResizeMaster({clientX}) {
        const count = currentRightPosition - clientX
        console.log(count)
        
        masterControl.current.style.width =
        masterControl.current.offsetWidth - (currentRightPosition - clientX) + 'px'
      }
      document.addEventListener('mousemove', handleResizeMaster)
      function onResizeEnd() {
        document.removeEventListener('mousemove', handleResizeMaster)
        document.removeEventListener('mousemove', onResizeEnd)
      }

      document.addEventListener('mouseup', onResizeEnd)
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
        <Box sx={styles.master}  ref={masterControl}>
        <MasterControl style={{
          ...Master?.params?.sx,

        }} {...(Master?.params || {})}/>
        </Box>
        <CssBaseline>
          <Box onMouseDown={onStartMoveMaster} sx={styles.pointerResize}>   
          <MoreVertIcon/>
          </Box>
        </CssBaseline>
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${240}px)` },
      }}
      >
        <DetailControl {...(Detail?.params || {})}/>
        </Box>
    </Box>
  );
}

export default MasterDetail;
