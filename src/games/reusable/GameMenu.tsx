import React, { useMemo } from 'react';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
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
          color: 'white',
          margin: 'auto auto',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '75px',
          top: 0,
          bottom: 200,
          left: 0,
          right: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            zIndex: 2000,
            position: 'relative',
            top: '80px',
            right: '100px',
          }}
          onClick={onNavBack}
        >
          Back
        </Button>
        {optionNode.map((treeNode, idx) => (
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
