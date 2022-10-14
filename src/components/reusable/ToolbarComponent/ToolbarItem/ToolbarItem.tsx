import { Toolbar } from '@mui/material';
import { Box, padding } from '@mui/system';
function ToolbarItem({ children }) {
  return (
    <Box
      sx={{
        border: '2px solid #000000',
        background: '#1F2326',
        borderRadius: '20% 0 0 0',
        padding: '5px 8px',
        color: '#F8F8F8',
      }}
    >
      {children}
    </Box>
  );
}
export default ToolbarItem;
