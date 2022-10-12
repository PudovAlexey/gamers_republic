import { Toolbar, Box } from "@mui/material";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
function ToolbarComponent({ children, width, justifyContent}) {
  return (
    <Toolbar sx={{
        justifyContent: justifyContent || 'left'
    }}>
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: "5px",
        width
    }}>
    {children.map((item) => {
         if (!item) return
        return <ToolbarItem>{item}</ToolbarItem>
      
    })}
    </Box>
  </Toolbar>
  )
}
export default ToolbarComponent;
