import React, { useMemo } from 'react';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  ListItem,
} from '@mui/material';
import {
  findTreeNodeById,
  forEachTreeNodes,
} from '../../utils/treeWalker/treeWalker';

function GameMenu({ menuTree }) {
  const [optionNode, setOptionNode] = useState(menuTree.children);
  const menuTreeWithIds = useMemo(() => {
    let makeTreenodesIds = (node, parrentNode) => {};
    return forEachTreeNodes(menuTree, makeTreenodesIds);
  }, [optionNode]);

  function onTreeItemPress(treeNode) {
    if (treeNode.children) {
      setOptionNode(treeNode.children);
    } else if (treeNode.node.action) {
      console.log('action');
      treeNode.node.action();
    }
  }

  function onNavBack() {
    const parrentId = optionNode[0].node.id.replace(/-\d+-\d+$/, '');
    const parrentNode = findTreeNodeById({
      treeNode: menuTreeWithIds,
      id: parrentId,
      nodePath: 'node/id',
    });
    if (
      parrentNode &&
      parrentNode.children.length &&
      parrentId !== optionNode[0]
    ) {
      setOptionNode(parrentNode.children);
    }
  }
  return (
    <Box>
      <List
        sx={{
          backdropFilter: 'blur(5px)',
          width: '100%',
          height: '150%',
          background: 'rgba(0, 0, 0, .5)',
          position: 'absolute',
          gap: "30px",
          bottom: "100px",

          color: 'white',
          margin: 'auto auto',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            zIndex: 2000,
            position: 'fixed',
            left: "4%",
            top: '32%',
          }}
          onClick={onNavBack}
          >
          Back
        </Button>
        {optionNode.map((treeNode, idx) => (
          treeNode.node.control ? <ListItem
            sx={{
              display: "flex",
              flexDirection: 'column',
              background: "transparent",
              // border: "2px solid #F8F8F8",
              width: "90%",
              height: "max-content",
              overflowY: "hidden",
              overflowX: "hidden",
              border: "none",
              position: "relative",
              "&:after": {
                content: '""',
                position: 'absolute',
                width: '1158%',
                height: '1000%',
                top: '20px; right: -500%',
                background: '#F8F8F8',
                color: "",
                transformOrigin: '48.3% 0',
                transform: 'rotate(-41deg)',
                zIndex: -1,
              },
              "&:hover": {
                animation: "gameMenu 2s",
              }
            }}
            key={treeNode.node.id}
            component="button"
            onClick={() => onTreeItemPress(treeNode)}
          >
            <ListItemText
              primary={
                <Typography variant="h4">{treeNode.node.text}</Typography>
              }
            />
            {treeNode.node.control}
          </ListItem> :
          <ListItemButton
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '0',
          }}
          key={treeNode.node.id}
          component="button"
          onClick={() => onTreeItemPress(treeNode)}
        >
          <ListItemText
            primary={
              <Typography variant="h4">{treeNode.node.text}</Typography>
            }
          />
          <Box>{treeNode.node.control}</Box>
        </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default GameMenu;
