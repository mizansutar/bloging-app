import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#333',
  padding: '10px 0',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
});

const Logo = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ff4081',
  textTransform: 'uppercase',
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '10px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: '#ff4081',
    color: '#333',
  },
});

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    color: 'white',
  },
}));

const DrawerList = styled(List)({
  width: 250,
});

const DrawerLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

// Header component
const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
  ];

  const drawer = (
    <DrawerList onClick={handleDrawerToggle}>
      {navItems.map((item) => (
        <DrawerLink to={item.path} key={item.text}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </DrawerLink>
      ))}
    </DrawerList>
  );

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo>ONAS  </Logo>
        <NavLinks>
          {navItems.map((item) => (
            <StyledLink to={item.path} key={item.text}>
              {item.icon}
              <Box component="span" ml={1}>
                {item.text}
              </Box>
            </StyledLink>
          ))}
        </NavLinks>
        <MenuIconButton edge="end" onClick={handleDrawerToggle}>
          <MenuIcon />
        </MenuIconButton>
      </StyledToolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;
