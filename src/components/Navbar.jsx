import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Popover,
  Box,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
const Navbar = ({ onSearch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate('/signin');
    localStorage.removeItem("user");

  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user))
  }, [])
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ background: "#fff" }}>
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <img src={logo} alt='logo' style={{ width: '100%', maxWidth: '160px', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ background: "#fff", borderRadius: 1 }}
              size="small"
              placeholder="Search book"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <SearchIcon onClick={handleSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box p={2}>
                <Typography variant="h6">{user?.username}</Typography>
              </Box>
              <Divider />
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Popover>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
