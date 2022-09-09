import React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";

function GameMenu({ menuTree }) {
  const [optionNode, setOptionNode] = useState(menuTree.children);

  function onTreeItemPress(treeNode) {
    if (treeNode.children) {
        setOptionNode(treeNode.children);
    } else if (treeNode.action) {
        treeNode.action()
    }
  }
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, .5)",
        position: 'absolute',
        color: 'white',
        margin: 'auto auto',
        flexDirection: "column",
        alignItems: "center",
        display: 'flex',
        justifyContent: 'center',
        gap: "75px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
        {optionNode.map((treeNode) => (
      <ListItemButton sx={{
        display: 'flex',
        flexDirection: "column",
        flexGrow: "0"
        
      }} component="a" href="#simple-list" onClick={() => onTreeItemPress(treeNode)}>
          <ListItemText primary={treeNode.node.text}/>
          <Box>
            {treeNode.node.control}
          </Box>
      </ListItemButton>
        ))}
    </List>
  );
}

export default GameMenu;
