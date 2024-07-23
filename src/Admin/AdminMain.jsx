import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import Category from './components/Category/Category';
import { Helmet } from 'react-helmet';
import Sellers from './components/Sellers/Sellers';
import ApprovedProducts from './components/Products/ApprovedProducts';
import PendingProducts from './components/Products/PendingProducts';
import AddProduct from './components/Products/AddProduct';
// import other components and actions

const drawerWidth = 240;

const listData = [
  { title: 'Manage Categories', icon: <WorkIcon /> },
  { title: 'Approved Products', icon: <ArticleIcon /> },
  { title: 'Pending Products', icon: <AccountCircleIcon /> },
  { title: 'All Sellers', icon: <AccountCircleIcon /> },
  { title: 'Add Product', icon: <AccountCircleIcon /> },
];

const AdminMain = () => {
  const [selectedItem, setSelectedItem] = React.useState(listData[0].title);
  const handleItemClick = (title) => {
    setSelectedItem(title);
  };
  const handleSignOut = () => {
    // dispatch(adminLogOut());
    console.log('Sign out');
  };

  return (
    <>
      <Helmet>
        <title>Admin_Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Ex Furniture Admin
            </Typography>
            <Button variant="contained" sx={{ ml: 'auto' }} color="secondary" onClick={handleSignOut}>
              Signout
            </Button>
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
          <Box sx={{ overflow: 'auto' }}>
            <List sx={{ p: 1 }}>
              {listData.map((val, ind) => (
                <ListItem
                  key={ind}
                  disablePadding
                  sx={{
                    backgroundColor: selectedItem === val.title ? '#007BFF' : 'transparent',
                    mt: 2,
                    borderRadius: '15px',
                    color: selectedItem === val.title ? '#fff' : '#000',
                    '&:hover': {
                      backgroundColor: '#007BFF',
                    },
                  }}
                  onClick={() => handleItemClick(val.title)}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: selectedItem === val.title ? '#fff' : '#000' }}>
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
            {selectedItem === 'Manage Categories' && <Category />}
            {selectedItem === 'All Sellers' && <Sellers />}
            {selectedItem === 'Approved Products' && <ApprovedProducts />}
            {selectedItem === 'Pending Products' && <PendingProducts />}
            {selectedItem === 'Add Product' && <AddProduct />}




          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminMain;
