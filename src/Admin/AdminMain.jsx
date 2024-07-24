import React, { useState } from 'react';
import { Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Button, FormControl, MenuItem, Select, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Helmet } from 'react-helmet';
import Dashboard from './components/Dashboard/Dashboard';
import MessagesMain from './components/Messages/MessagesMain';
import CourseInfoMain from './components/CourseInfo/CourseInfoMain';
import Testimonials from './components/Testimonials/Testimonials';
import TermsConditionsMain from './components/TermsConditions/TermsConditionsMain';
import SettingsMain from './components/Settings/SettingsMain';
import { userLogout } from '../store/actions/authActions';

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

const AdminMain = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(listData[0].title);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleItemClick = (title) => {
    if (title === 'Logout') {
      setLogoutModalOpen(true);
    } else {
      setSelectedItem(title);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());

    setLogoutModalOpen(false);

  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };




  return (
    <>
      <Helmet>
        <title>Admin_Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: 'white', padding: '0.3rem 0rem', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
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
                            alt=""
                            sx={{ height: "2rem", width: "2rem", marginRight: "8px" }}
                          />
                          <Typography sx={{ fontSize: "1rem" }}>
                            Momin
                          </Typography>
                        </Box>
                      )}
                    >
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
          variant="permanent"
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
                    <ListItemText primary={val.title} sx={{ fontWeight: selectedItem === val.title && 'bold' }} />
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
          </Box>
        </Box>
      </Box>

      <Dialog open={logoutModalOpen} onClose={handleCloseModal} sx={{ borderRadius: '0 !important' }}>

        <DialogContent sx={{ borderRadius: '0 !important' }}>
          <DialogContentText sx={{color:'black', paddingRight:'10rem',}}>
            Are you sure you want to logout?

          </DialogContentText>
        </DialogContent>
<br/>

        <DialogActions>

        <Button onClick={handleLogout} sx={{fontWeight:'400'}} color="primary" autoFocus>
            Logout
          </Button>
          <Button onClick={handleCloseModal} sx={{ color:'grey',fontWeight:'400'}}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminMain;
