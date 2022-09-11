import React, { useCallback, useState } from "react";
import { Box, Toolbar, Divider, Button, Drawer, Slider } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ExpandLess, ChevronRight } from "@mui/icons-material";
import { makeNodesTree } from "../../../utils/treeWalker/treeWalker";
import { useNavigate } from "react-router-dom";
import gamesTree from "../../../games/GamesList/GamesTree";
import SearchField from "../../../components/reusable/SearchField/SearchField";
import RangeSlider from "../../../components/reusable/RangeSlider/RangeSlider";
import api from "../../../api/api";

function Master({}) {
  const [filters, setFilters] = useState({
    search: "",
    categpryId: null,
    range: {from: 0, to: 100}
  })

  function onChangeFilters(value, type) {
    setFilters(prevFilters => ({...prevFilters, [type]: value}))
  }
  let parseGameCategories = useCallback((treeChildren, onNavCategory) => {
    // let childContent = function (node, nodeId, forEachData) {
    //   return forEachData(TreeItem, {
    //     label: node.text,
    //     nodeId,
    //     onClick: () => onNavCategory(),
    //   });
    // };
    // return makeNodesTree({
    //   treeChildren: treeChildren,
    //   childContent: childContent,
    //   openFirstLeaf: true,
    //   firstRowProps: function (leaf, id) {
    //     return { label: leaf.node.text, nodeId: id };
    //   },
    // });
    api.getGameCategories()
    .then(category => {
      console.log(category)
    })
  }, []);
  const navigate = useNavigate();
  function onNavCategory(game) {
    navigate(`/games/${game}`);
  }

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
          value={filters.search}
          onChange={(value) => onChangeFilters(value, 'search')} 
          />
          <Divider />
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
          >
            {parseGameCategories(gamesTree, onNavCategory)}
          </TreeView>
          <Divider />
          <RangeSlider
          from={filters.range.from}
          to={filters.range.to}
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
