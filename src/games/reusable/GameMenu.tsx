import React, {useMemo} from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import { List, ListItemButton, ListItemText, Button } from "@mui/material";
import { findTreeNodeById, forEachTreeNodes } from "../../utils/treeWalker/treeWalker";

function GameMenu({ menuTree }) {
  const [optionNode, setOptionNode] = useState(menuTree.children);
  const menuTreeWithIds = useMemo(() => {
    let makeTreenodesIds = (node, parrentNode) => {
    }
    return  forEachTreeNodes(menuTree, makeTreenodesIds)
  }, [optionNode])


  function onTreeItemPress(treeNode) {
    if (treeNode.children) {
        setOptionNode(treeNode.children);
    } else if (treeNode.node.action) {
      console.log("action")
        treeNode.node.action()
    } else {
      let makeTreenodesIds = (node, parrentNode) => {
      }
      forEachTreeNodes(menuTree, makeTreenodesIds)
      const findCurrentNode = findTreeNodeById({treeNode: menuTree, id: treeNode.node.id.replace(/-\d+$/, ""), nodePath: "node/id"})
      setOptionNode(findCurrentNode.children)
    }
  }

  function onNavBack() {
    const parrentId = optionNode[0].node.id.replace(/-\d+-\d+$/, "")
    const parrentNode = findTreeNodeById({treeNode: menuTreeWithIds, id: parrentId, nodePath: "node/id"})
    if (parrentNode && parrentNode.children.length && parrentId !== optionNode[0]) {
      setOptionNode(parrentNode.children)
    }
  }
  return (
    <Box>
        <Button sx={{
          zIndex: 2000
        }} onClick={() => onNavBack(optionNode)}>Back</Button>
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
        {optionNode.map((treeNode, idx) => (
      <ListItemButton sx={{
        display: 'flex',
        flexDirection: "column",
        flexGrow: "0"
        
      }} key={treeNode.node.id} component="button" onClick={() => onTreeItemPress(treeNode)}>
          <ListItemText primary={treeNode.node.text}/>
          <Box>
            {treeNode.node.control}
          </Box>
      </ListItemButton>
        ))}
    </List>
    </Box>
  );
}

export default GameMenu;
