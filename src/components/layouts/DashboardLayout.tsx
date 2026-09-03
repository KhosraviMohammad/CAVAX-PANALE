import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

const drawerWidth = 240;
const collapsedWidth = 64;

const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        onDrawerToggle={handleDrawerToggle}
        onDesktopDrawerToggle={handleDesktopDrawerToggle}
        desktopOpen={desktopOpen}
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
      />

      {/* Sidebar - همیشه collapsedWidth دارد، با overlay باز می‌شود */}
      <Sidebar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        mobileOpen={mobileOpen}
        desktopOpen={desktopOpen}
        onDrawerToggle={handleDrawerToggle}
        onDesktopDrawerToggle={handleDesktopDrawerToggle}
      />

      {/* Main content - همیشه فقط collapsedWidth کم می‌شود */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${collapsedWidth}px` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
