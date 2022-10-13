import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';
import { height } from "@mui/system";
import { MenuList } from "@mui/material";
import Logo from "../../assets/main/Logo";
import AuthorLogo from "../../assets/main/AuthorLogo";

const pages = ["Home", "Games", "Blog", "Contact"];

const Header = () => {

  return (
    <AppBar sx={ { zIndex: (theme) => theme.zIndex.drawer + 1 }}>
     <Box sx={{
      padding: "46px 73px"
     }}>
     <Box sx={{
      display: "flex",
     }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "250px"
      }}>
      <Logo/>
      <Box sx={{
        background: "#FFFFFF",
        height: 42,
        width: 2
      }}></Box>
      <AuthorLogo/>
      </Box>
     <MenuList sx={{
      display: "flex",
      justifyContent: "space-around"
     }}>
     {pages.map(page => (
        <MenuItem>{page}</MenuItem>
      ))}
     </MenuList>
     </Box>
     <Box></Box>
     </Box>
    </AppBar>
  );
};
export { Header };
