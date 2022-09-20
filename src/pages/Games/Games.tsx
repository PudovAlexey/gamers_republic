import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Master from "./Master/Master";
import Detail from "./Detail/Detail";
import useDebounce from "../../hooks/useDebounce";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Games(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    debounced: [filters, setFilters],
    notDebounced: [filterValues, setFilterValues],
  } = useDebounce(
    {
      search: "",
      categpryId: null,
      range: { from: 0, to: 100 },
    },
    20
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Master filterValues={filterValues} setFilterValues={setFilterValues} filters={filters} setFilters={setFilters} />
      <CssBaseline />
      <Detail filters={filters} />
    </Box>
  );
}
