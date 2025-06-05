import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ExitToApp,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Apartment as ApartmentIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logic to clear user authentication (e.g., remove cookies or clear state)
    logout();
    // Redirect to the registration page after logout
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#008080', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Poppins, sans-serif', flex: 1, textAlign: 'center', color: 'white' }}>
            Landmanager
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: '220px',
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          '& .MuiDrawer-paper': {
            width: '220px',
            backgroundColor: '#006666',
          },
        }}
      >
        <Toolbar />
        <List>
          {userRole === 'LM' ? (
            <>
              <ListItem button component={Link} to="/user/projects" sx={{ mb: 2, color: 'white' }}>
                <BusinessIcon />
                <ListItemText primary="Projects" />
              </ListItem>
              <ListItem button component={Link} to="/user/profile" sx={{ mb: 2, color: 'white' }}>
                <AccountCircleIcon />
                <ListItemText primary="Profile" />
              </ListItem>
              <Button sx={{ color: 'white', marginTop: 'auto' }} onClick={handleLogout}>
                <ExitToApp />
                   Logout
              </Button>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/user/dashboard" sx={{ mb: 2, color: 'white' }}>
                <DashboardIcon />
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/user/projects" sx={{ mb: 2, color: 'white' }}>
                <BusinessIcon />
                <ListItemText primary="Projects" />
              </ListItem>
              <ListItem button component={Link} to="/user/assets" sx={{ mb: 2, color: 'white' }}>
                <ApartmentIcon />
                <ListItemText primary="Assets" />
              </ListItem>
              <ListItem button component={Link} to="/user/notifications" sx={{ mb: 2, color: 'white' }}>
                <NotificationsIcon />
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button component={Link} to="/user/profile" sx={{ mb: 2, color: 'white' }}>
                <AccountCircleIcon />
                <ListItemText primary="Profile" />
              </ListItem>
              <Button sx={{ color: 'white', marginTop: 'auto' }} onClick={handleLogout}>
                <ExitToApp />
                   Logout
              </Button>
            </>
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>

      {/* Footer */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ backgroundColor: '#006666', py: 2, color: 'white', mt: 'auto', position: 'fixed', bottom: 0, width: '100%' }}
      >
        @Landmanager 2023 Pvt. Ltd.
      </Typography>
    </Box>
  );
};

export default Layout;

