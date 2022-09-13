import React, { useCallback, useState, useEffect } from "react";
import { Box, Toolbar, Divider, Button, Drawer, Slider } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ExpandLess, ChevronRight } from "@mui/icons-material";
import { makeNodesTree } from "../../../utils/treeWalker/treeWalker";
import { useNavigate } from "react-router-dom";
import gamesTree from "../../../games/GamesList/GamesTree";
import SearchField from "../../../components/reusable/SearchField/SearchField";
import RangeSlider from "../../../components/reusable/RangeSlider/RangeSlider";
import api from "../../../api/api";

function Master({filterValues, setFilterValues,filters, setFilters}) {
  let [gameCategories, setGameCategories] = useState(null)

  
  function onChangeFilters(value, type) {
    setFilters(prevFilters => ({...prevFilters, [type]: value}))
    setFilterValues(prevFilters => ({...prevFilters, [type]: value}))
  }
  function onNavCategory(categoryNode) {
    const {nodeId} = categoryNode
    if (!categoryNode.length) onChangeFilters(nodeId, "categpryId")
  }
  
  useEffect(() => {
    api.getGameCategories()
    .then(category => {
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
      setGameCategories(gameCategories)
    })
  }, [])
  function onExpandMore() {}

  function onCollapseLess() {}
  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: 270,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 270, boxSizing: "border-box" },
        }}
      >
        <Box>
          <Toolbar>
            <Button onClick={onExpandMore}>
              <ExpandLess />
            </Button>
            <Button onClick={onCollapseLess}>
              <ExpandMore />
            </Button>
          </Toolbar>
          <Divider />
          <SearchField
          value={filterValues.search}
          onChange={(value) => onChangeFilters(value, 'search')} 
          />
          <Divider />
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
          >
            {gameCategories}
          </TreeView>
          <Divider />
          <RangeSlider
          from={filterValues.range.from}
          to={filterValues.range.to}
          onChange={(from, to) => onChangeFilters({from, to}, 'range')}
          />
          <Divider />
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Master;
