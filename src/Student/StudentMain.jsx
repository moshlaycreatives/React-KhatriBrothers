import React, { useState } from 'react';
import { Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Button, FormControl, MenuItem, Select, useTheme, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon for opening drawer
import { Helmet } from 'react-helmet';
import Dashboard from './components/Dashboard/Dashboard';
import MessagesMain from './components/Messages/MessagesMain';
import CourseInfoMain from './components/CourseInfo/CourseInfoMain';
import Testimonials from './components/Testimonials/Testimonials';
import TermsConditionsMain from './components/TermsConditions/TermsConditionsMain';
import SettingsMain from './components/Settings/SettingsMain';
import { userLogout } from '../store/actions/authActions';
import ShowProfileData from './components/ManageProfile/ShowProfileData';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const listData = [
  { title: 'Dashboard', icon: <WorkIcon /> },
  { title: 'Course Info', icon: <ArticleIcon /> },
  { title: 'Message', icon: <AccountCircleIcon /> },
  { title: 'Testimonial', icon: <AccountCircleIcon /> },
  { title: 'Terms & Conditions', icon: <AccountCircleIcon /> },
  { title: 'Settings', icon: <AccountCircleIcon /> },
  { title: 'Logout', icon: <AccountCircleIcon /> },
];

const StudentMain = () => {
  const base = 'https://wv9pfwh9-4545.inc1.devtunnels.ms'
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedItem, setSelectedItem] = useState(listData[0].title);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
const userData = useSelector((state)=>state?.auth?.user)
console.log(userData, 'data')


const profilePictureUrl = base + userData.profilePicture;


  const handleItemClick = (title) => {
    if (title === 'Logout') {
      setLogoutModalOpen(true);
    } else if (title === 'ManageProfile') {
      setSelectedItem(title);
    } else {
      setSelectedItem(title);
    }
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    // Replace this with actual dispatch if you use redux
    // dispatch(userLogout());
    setLogoutModalOpen(false);
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Helmet>
        <title>Admin_Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ display: isMobile ? 'block':'flex' }}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" sx={{ backgroundColor: 'white', padding: '0.3rem 0rem', zIndex: (theme) => theme.zIndex.drawer + 1, }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2, display: isMobile ? 'block' : 'none', color:theme.palette.primary.main }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.primary.main, fontSize: '2rem' }}>
                Logo
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <Box>
                  <FormControl sx={{ padding: 0 }}>
                    <Select
                      sx={{
                        outline: "none",
                        "&:focus": {
                          outline: "none",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Select user" }}
                      style={{ minWidth: "120px", padding: 0 }}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                          src={profilePictureUrl}
                            alt=""
                            sx={{ height: "2rem", width: "2rem", marginRight: "8px" }}
                          />
                          <Typography sx={{ fontSize: "1rem" }}>
                            {userData.firstName}
                          </Typography>
                        </Box>
                      )}
                      onChange={(event) => handleItemClick(event.target.value)}
                    >
                      <MenuItem sx={{ fontSize: "0.8rem" }} value="ManageProfile">
                        Manage Profile
                      </MenuItem>

                      <MenuItem sx={{ fontSize: "0.8rem" }} value="Logout">
                        Logout
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={!isMobile ? true : drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', backgroundColor: theme.palette.primary.main, height: '100vh' }}>
            <List>
              {listData.map((val, ind) => (
                <ListItem
                  key={ind}
                  disablePadding
                  sx={{
                    backgroundColor: selectedItem === val.title ? 'white' : 'transparent',
                    mt: 2,
                    borderRadius: '0px',
                    color: selectedItem === val.title ? theme.palette.primary.main : '#fff',
                  }}
                  onClick={() => handleItemClick(val.title)}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: selectedItem === val.title ? theme.palette.primary.main : '#fff' }}>
                      {val.icon}
                    </ListItemIcon>
                    <ListItemIcon sx={{ color: selectedItem === val.title ? theme.palette.primary.main : '#fff' }}>
                      {val.title}
                    </ListItemIcon>

                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box>
            {selectedItem === 'Dashboard' && <Dashboard />}
            {selectedItem === 'Course Info' && <CourseInfoMain />}
            {selectedItem === 'Message' && <MessagesMain />}
            {selectedItem === 'Testimonial' && <Testimonials />}
            {selectedItem === 'Terms & Conditions' && <TermsConditionsMain />}
            {selectedItem === 'Settings' && <SettingsMain />}
            {selectedItem === 'ManageProfile' && <ShowProfileData />}
          </Box>
        </Box>
      </Box>

      <Dialog open={logoutModalOpen} onClose={handleCloseModal} sx={{ borderRadius: '0 !important' }}>
        <DialogContent sx={{ borderRadius: '0 !important' }}>
          <DialogContentText sx={{ color: 'black', paddingRight: isMobile ? '0rem' : '10rem' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <br />
        <DialogActions>
          <Button onClick={handleLogout} sx={{ fontWeight: '400' }} color="primary" autoFocus>
            Logout
          </Button>
          <Button onClick={handleCloseModal} sx={{ color: 'grey', fontWeight: '400' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentMain;
