import { Toolbar, Box } from '@mui/material';
import ToolbarItem from './ToolbarItem/ToolbarItem';
function ToolbarComponent({ children, width, justifyContent }) {
  return (
    <Toolbar
      sx={{
        justifyContent: justifyContent || 'left',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px',
          width,
        }}
      >
        {children.map((item, idx) => {
          if (!item) return null;
          return item?.props?.children ? (
            <ToolbarItem key={idx}>{item}</ToolbarItem>
          ) : (
            <Box></Box>
          );
        })}
      </Box>
    </Toolbar>
  );
}
export default ToolbarComponent;
