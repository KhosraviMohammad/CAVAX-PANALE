import React from 'react';
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
} from '@mui/material';
import {
  DashboardIcon,
  SidebarSecurityIcon,
  SidebarSettingsIcon,
  DevicesIcon,
  RouterIcon,
  LogoutIcon,
  ChevronLeftIcon,
  PersonIcon,
} from '@/assets/icons';
import { useNavigate } from 'react-router-dom';

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
  const theme = useTheme();

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 10%, #1a1a1a 40%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          sx={{
            width: desktopOpen ? 80 : 50,
            height: desktopOpen ? 80 : 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: desktopOpen ? 2 : 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {/* <Box
            component='img'
            src='/images/Logo.png'
            alt='Logo'
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
            }}
          /> */}
        </Box>
        {desktopOpen && (
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            Panel
          </Typography>
        )}
      </Box>

      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '10px !important',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          minHeight: '48px !important',
        }}
      >
        <IconButton
          onClick={onDesktopDrawerToggle}
          sx={{
            color: 'white',
            '&:hover': { background: 'rgba(255,255,255,0.1)' },
          }}
          aria-label={desktopOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Box
            sx={{
              transition: 'transform 0.4s ease',
              transform: desktopOpen ? 'rotate(0deg)' : 'rotate(180deg)',
              display: 'inline-flex',
            }}
          >
            <ChevronLeftIcon />
          </Box>
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dashboard')}
            sx={{
              minHeight: 48,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}15, rgba(255,255,255,0.15))`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}20, rgba(255,255,255,0.2))`,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Dashboard' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dashboard/policies')}
            sx={{
              minHeight: 48,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}15, rgba(255,255,255,0.15))`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}20, rgba(255,255,255,0.2))`,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <SidebarSecurityIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Policies' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dashboard/policies/profile')}
            sx={{
              pl: desktopOpen ? 6 : 2, // تو رفتگی زیرمنو
              minHeight: 40,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}15, rgba(255,255,255,0.15))`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}20, rgba(255,255,255,0.2))`,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <PersonIcon /> {/* آیکن پروفایل */}
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Profile' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dashboard/devices')}
            sx={{
              minHeight: 48,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}15, rgba(255,255,255,0.15))`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}20, rgba(255,255,255,0.2))`,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <DevicesIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Devices' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dashboard/settings')}
            sx={{
              minHeight: 48,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}15, rgba(255,255,255,0.15))`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}20, rgba(255,255,255,0.2))`,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <SidebarSettingsIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Settings' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/login')}
            sx={{
              minHeight: 48,
              justifyContent: desktopOpen ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}10, rgba(255,255,255,0.08))`,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: desktopOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {desktopOpen && <ListItemText primary='Logout' sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: desktopOpen ? drawerWidth : collapsedWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label='mailbox folders'
    >
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRadius: '0',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: desktopOpen ? drawerWidth : collapsedWidth,
            transition: 'width 0.3s ease',
            borderRadius: '0',
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
