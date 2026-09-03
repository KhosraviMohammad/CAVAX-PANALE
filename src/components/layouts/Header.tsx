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
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        width: {
          sm: `calc(100% - ${desktopOpen ? drawerWidth : collapsedWidth}px)`,
        },
        ml: { sm: `${desktopOpen ? drawerWidth : collapsedWidth}px` },
        transition: "width 0.3s ease, margin 0.3s ease",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 1px 3px rgba(0, 0, 0, 0.05)"
            : "0 1px 3px rgba(0, 0, 0, 0.3)",
        borderRadius: "0",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
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
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(255, 255, 255, 0.08)",
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
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          >
            {pageTitle}
          </Typography>

          {pageDescription && (
            <Tooltip title={pageDescription} arrow placement="bottom">
              <IconButton
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  p: 0.5,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(255, 255, 255, 0.08)",
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
