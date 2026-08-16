import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Box,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Help as HelpIcon } from "@mui/icons-material";
// import {BlockIcon as HelpIcon} from "@/assets/icons";

import { useSelector } from "react-redux";
import { selectHeaderTitle, selectHeaderDescription } from "@/store/selectors";
import { MenuIcon } from "@/assets/icons";

interface HeaderProps {
  onDrawerToggle: () => void;
  onDesktopDrawerToggle: () => void;
  desktopOpen: boolean;
  drawerWidth: number;
  collapsedWidth: number;
}

const Header: React.FC<HeaderProps> = ({
  onDesktopDrawerToggle,
  desktopOpen,
  drawerWidth,
  collapsedWidth,
}) => {
  const theme = useTheme();
  const pageTitle = useSelector(selectHeaderTitle);
  const pageDescription = useSelector(selectHeaderDescription);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        width: {
          sm: `calc(100% - ${desktopOpen ? drawerWidth : collapsedWidth}px)`,
        },
        ml: { sm: `${desktopOpen ? drawerWidth : collapsedWidth}px` },
        transition: "width 0.3s ease, margin 0.3s ease",
        background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        borderRadius: "0",
      }}
    >
      <Toolbar
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main}05, rgba(0,0,0,0.15))`,
          borderBottom: `1px solid ${theme.palette.primary.main}30`,
        }}
      >
        {/* Left: Drawer toggles */}

        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={onDesktopDrawerToggle}
          sx={{
            mr: 2,
            display: { xs: "none", sm: "block" },
            color: "white",
            "&:hover": {
              background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* Center: Page title */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "white",
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, #ffffff 50%, #f0f0f0 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {pageTitle}
          </Typography>

          {pageDescription && (
            <Tooltip title={pageDescription} arrow placement="bottom">
              <IconButton
                size="small"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  p: 0.5,
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  },
                }}
              >
                <HelpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Right-side actions (exclude 'filter' which appears near title) */}
        <Stack direction="row" spacing={1} sx={{ ml: 2, alignItems: "center" }}>
          {/* دکمه‌های اکشن قبلی */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
