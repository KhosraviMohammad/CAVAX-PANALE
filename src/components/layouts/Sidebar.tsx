import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { LogoutIcon, ChevronLeftIcon } from "@/assets/icons";
import { Assignment as SampleIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions";

interface SidebarProps {
  drawerWidth: number;
  collapsedWidth: number;
  mobileOpen: boolean;
  desktopOpen: boolean;
  onDrawerToggle: () => void;
  onDesktopDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  collapsedWidth,
  mobileOpen,
  desktopOpen,
  onDrawerToggle,
  onDesktopDrawerToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const theme = useTheme();

  const menuItems = [
    {
      title: "صفحه نمونه",
      path: "/sample",
      icon: <SampleIcon />,
    },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: `linear-gradient(0deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: "white",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box
          sx={{
            width: desktopOpen ? 84 : 44,
            height: desktopOpen ? 84 : 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: desktopOpen ? 1.5 : 0,
            p: 0.5,
            borderRadius: "16px",
            background: "#FFFFFF",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            border: `2px solid ${theme.palette.secondary.main}50`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            },
          }}
        >
          <Box
            component="img"
            src="/images/Logo1.png"
            alt="Logo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        {desktopOpen && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              fontSize: "1.1rem",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            سیستم مانیتورینگ BSCADA
          </Typography>
        )}
      </Box>

      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "10px !important",
          background: "rgba(0,0,0,0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          minHeight: "48px !important",
        }}
      >
        <IconButton
          onClick={onDesktopDrawerToggle}
          sx={{
            color: "white",
            "&:hover": { background: "rgba(255,255,255,0.1)" },
          }}
          aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Box
            sx={{
              transition: "transform 0.4s ease",
              transform: desktopOpen ? "rotate(0deg)" : "rotate(180deg)",
              display: "inline-flex",
            }}
          >
            <ChevronLeftIcon />
          </Box>
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List sx={{ px: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/sample" && location.pathname === "/");

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  borderRadius: 2,
                  justifyContent: desktopOpen ? "initial" : "center",
                  px: 2,
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.15)",
                  },
                  "&.Mui-selected": {
                    background: "rgba(255,255,255,0.25)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: desktopOpen ? 2 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {desktopOpen && (
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.95rem",
                          fontWeight: isActive ? 700 : 500,
                        },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />

      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              justifyContent: desktopOpen ? "initial" : "center",
              px: 2,
              color: "white",
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 2 : "auto",
                justifyContent: "center",
                color: "white",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary="خروج از حساب" sx={{ color: "white" }} />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: desktopOpen ? drawerWidth : collapsedWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: desktopOpen ? drawerWidth : collapsedWidth,
            transition: "width 0.3s ease",
            borderRadius: "0",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
