import React, { useCallback, useState, useEffect } from 'react';
import { Box, Toolbar, Divider, Button, Drawer, Slider } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ExpandLess, ChevronRight } from '@mui/icons-material';
import { makeNodesTree } from '../../../utils/treeWalker/treeWalker';
import { useNavigate } from 'react-router-dom';
import gamesTree from '../../../games/GamesList/GamesTree';
import SearchField from '../../../components/reusable/SearchField/SearchField';
import RangeSlider from '../../../components/reusable/RangeSlider/RangeSlider';
import api from '../../../api/api';
import { Node } from '../../../utils/treeWalker/types';
import ToolbarComponent from '../../../components/reusable/ToolbarComponent/ToolbarComponent';

function Master({ filterValues, setFilterValues, filters, setFilters }) {
  const [expandedTree, setExpandedTree] = React.useState<string[]>([]);
  const [selectedTree, setSelectedTree] = React.useState<string[]>([]);
  let [gameCategories, setGameCategories] = useState(null);
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpandedTree(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelectedTree(nodeIds);
  };

  function onChangeFilters(value, type) {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    setFilterValues((prevFilters) => ({ ...prevFilters, [type]: value }));
  }
  function onNavCategory(categoryNode) {
    const { nodeId } = categoryNode;
    if (!categoryNode.length) onChangeFilters(nodeId, 'categpryId');
  }

  useEffect(() => {
    api.getGameCategories().then((category: Node) => {
      let childContent = function (node, nodeId, forEachData) {
        return forEachData(TreeItem, {
          label: node.text,
          nodeId,
          onClick: () => onNavCategory(node),
        });
      };
      const gameCategories = makeNodesTree({
        treeChildren: category,
        childContent: childContent,
        openFirstLeaf: true,
        firstRowProps: function (leaf, id) {
          return { label: leaf.node.text, nodeId: id };
        },
      });
      setGameCategories(gameCategories);
    });
  }, []);
  function onExpandMore() {}

  function onCollapseLess() {}
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: "100%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "100%", boxSizing: 'border-box' },
        }}
      >
        <Divider />
        <Box>
          <SearchField
            value={filterValues.search}
            onChange={(value) => onChangeFilters(value, 'search')}
          />
          <Divider />
          <ToolbarComponent justifyContent="right" width="100%">
            <Box></Box>
            <Box>
              <Button onClick={onExpandMore}>
                <ExpandLess />
              </Button>
              <Button onClick={onCollapseLess}>
                <ExpandMore />
              </Button>
            </Box>
          </ToolbarComponent>
          <Divider />
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
            expanded={expandedTree}
            selected={selectedTree}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          >
            {gameCategories}
          </TreeView>
          <Divider />
          <RangeSlider
            from={filterValues.range.from}
            to={filterValues.range.to}
            onChange={(from, to) => onChangeFilters({ from, to }, 'range')}
          />
          <Divider />
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export default Master;
