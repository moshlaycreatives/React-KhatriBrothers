import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Popover,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/actions/authActions";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isRoot = location.pathname === '/';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = useState(null);

  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const role = useSelector((state) => state?.auth?.user?.role);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleLogin = () => {
    navigate('/sign-in');
    setDrawerOpen(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleCoursesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHindustaniVocalClick = (event) => {
    setNestedAnchorEl(event.currentTarget);
  };

  const handleMenuItemSelect = (route) => {
    navigate(route);
    setAnchorEl(null);
    setNestedAnchorEl(null);
  };

  const handleDashboardNavigation = () => {
    if (role === "instructor") {
      navigate('/instructor-dashboard');
    } else if (role === "admin") {
      navigate('/admin-dashboard');
    } else if (role === "user") {
      navigate('/student-dashboard');
    }
    setDrawerOpen(false);
  };

  const currentPath = location.pathname;

  const isHidden =
    currentPath === "/sign-up" ||
    currentPath === "/sign-in" ||
    currentPath === "/forget-password" ||
    currentPath === "/otp-verification" ||
    currentPath === "/email-confirmation" ||

    currentPath === "/set-password" ||
    currentPath === "/admin-dashboard" ||
    currentPath === "/contact-us" ||
    currentPath === "/success" ||
    currentPath === "/cancel" ||
    currentPath === "/participant-registered" ||
    currentPath === "/student-dashboard" ||
    currentPath === "/instructor-dashboard"||
    currentPath === "/Instructor-dashboard";


  if (isHidden) {
    return null;
  }

  const menuItems = [
    { label: "Home", route: "/" },
    {
      label: "Courses",
      route: null,
    },
    { label: "About", route: "/about-us" },
    { label: "FAQ's", route: "/faqs" },
    { label: "Blogs", route: "/blogs" },
    { label: "Contact", route: "/contact-us" },
  ];

  const courseOptions = [
    {
      label: "Hindustani Vocal",
      subOptions: [
        { label: "Beginner Course", route: "/beginner-course" },
        { label: "Intermediate Course", route: "/intermediate-course" },
        { label: "Advanced Course", route: "/advanced-course" },
      ],
    },
    { label: "Bhajan", route: "/bhajan-course" },
    { label: "Tabla", route: "/tabla-course" },
    { label: "Ghazal", route: "/ghazal-course" },
    { label: "Bollywood/Filmy Songs", route: "/bollywood-course" },
    { label: "Customized Courses", route: "/custom-courses" },


  ];

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        padding: "2rem 10%",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Box onClick={() => navigate('/')}>
        <Typography variant="h5" sx={{ fontWeight: "bold", cursor: "pointer" }}>
        <Box sx={{ }}>
      <img
        src='/khatrilogowhite.svg'
        width='30%'
        style={{ display: isRoot ? 'none' : 'block' }}
        alt="Logo"
      />
      <img
        src='/khatrilogoblack.svg'
        width='30%'
        style={{ display: isRoot ? 'block' : 'none' }}
        alt="Black Logo"
      />
    </Box>
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 5 }}>
        {menuItems.map((item, index) => (
          item.route ? (
            <Typography
              key={index}
              onClick={() => {
                navigate(item.route);
                setDrawerOpen(false);
              }}
              sx={{ fontSize: "1.1rem", cursor: "pointer" }}
            >
              {item.label}
            </Typography>
          ) : (
            <Typography
              key={index}
              onClick={handleCoursesClick}
              sx={{ fontSize: "1.1rem", cursor: "pointer", display: 'flex', alignItems: 'center' }}
            >
              {item.label}
              <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
            </Typography>
          )
        ))}
      </Box>

      {auth ? (
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 5 }}>
          <Button
            onClick={handleDashboardNavigation}
            variant="contained"
            size="small"
            sx={{
              // backgroundColor: theme.palette.primary.main,
              backgroundColor:location.pathname === '/'? theme.palette.primary.main :"white",
              color:location.pathname === '/'? 'white' : theme.palette.primary.main,
':hover':{
  backgroundColor:location.pathname === '/'? theme.palette.primary.main :"white",
  color:location.pathname === '/'? 'white' : theme.palette.primary.main,
},
              padding: "0.5rem 2rem",
              textTransform: "none",
              fontSize: "0.9rem",
              marginLeft: "1rem",
              borderRadius: "0px",
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 5 }}>
          <Button
            onClick={handleLogin}
            variant="contained"
            size="small"
            sx={{
              backgroundColor:location.pathname === '/'? theme.palette.primary.main :"white",
              color:location.pathname === '/'? 'white' : theme.palette.primary.main,
':hover':{
  backgroundColor:location.pathname === '/'? theme.palette.primary.main :"white",
  color:location.pathname === '/'? 'white' : theme.palette.primary.main,
},
              padding: "0.5rem 2rem",
              textTransform: "none",
              fontSize: "0.9rem",
              marginLeft: "1rem",
              borderRadius: "0px",
            }}
          >
            Get Started
          </Button>
        </Box>
      )}

      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <IconButton onClick={handleDrawerOpen} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box sx={{ width: 250, padding: "20px" }}>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <br />
            <br />

            {menuItems.map((item, index) => (
              <Box key={index}>
                {item.route ? (
                  <Typography
                    variant="h6"
                    onClick={() => {
                      navigate(item.route);
                      setDrawerOpen(false);
                    }}
                    sx={{ marginBottom: 2, marginTop: 1, cursor: "pointer" }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    onClick={handleCoursesClick}
                    sx={{ marginBottom: 2, marginTop: 1, cursor: "pointer", display: 'flex', alignItems: 'center' }}
                  >
                    {item.label}
                    <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
                  </Typography>
                )}
                {index < menuItems.length - 1 && <Divider />}
              </Box>
            ))}

            {auth ? (
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleDashboardNavigation}
                  sx={{
                    padding: "0.8rem 0rem",
                    borderRadius: "0px",
                    width: "100%",
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            ) : (
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    padding: "0.8rem 0rem",
                    borderRadius: "0px",
                    width: "100%",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Box>
        </Drawer>
      </Box>


      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {courseOptions.map((option, index) => (
          <React.Fragment key={index}>
            {option.subOptions ? (
              <MenuItem
                onMouseEnter={handleHindustaniVocalClick}
                onClick={() => setNestedAnchorEl(anchorEl)}
              >
                {option.label}
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleMenuItemSelect(option.route)}>
                {option.label}
              </MenuItem>
            )}
          </React.Fragment>
        ))}
      </Menu>

      {/* Nested Hindustani Vocal Dropdown */}
      <Popover
        anchorEl={nestedAnchorEl}
        open={Boolean(nestedAnchorEl)}
        onClose={() => setNestedAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {courseOptions[0].subOptions.map((subOption, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemSelect(subOption.route)}
          >
            {subOption.label}
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
};

export default Header;
