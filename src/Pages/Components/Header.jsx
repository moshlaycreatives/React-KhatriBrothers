

import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/actions/authActions";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const judge_check =
    location.pathname.includes("judge-score-card") ||
    location.pathname.includes("judge-login");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleLogin = () => {
    if (judge_check) {
      navigate("/judge-login");
    } else {
      navigate("/admin-login");
    }
    setDrawerOpen(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const dispatch = useDispatch();

  const handleMenuItemClick = (value) => {
    if (value === "Logout") {
      dispatch(userLogout());
      dispatch({
        type: "RESET_STATE",
      });
    }
  };

  const currentPath = location.pathname;

  const isHidden =
    /^\/public-screen\/[^\/]+$/.test(currentPath) ||
    /^\/admin\/contest\/[^\/]+$/.test(currentPath) ||
    /^\/public-screen-result\/[^\/]+$/.test(currentPath) ||
    currentPath === "/public-screen-result" ||
    currentPath === "/admin_side_screen1" ||
    currentPath === "/admin_side_screen2" ||
    currentPath === "/participant-registered";

  if (isHidden) {
    return null;
  }

  const auth = useSelector((state) => state?.admin?.isAuthenticated);
  const username = useSelector((state) => state?.admin?.user?.name);

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Courses", route: "/advance-course" },
    { label: "About", route: "/about-us" },
    { label: "Faq's", route: "/faqs" },
    { label: "Blogs", route: "/blogs" },
    { label: "Contact", route: "/contact-us" },
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
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", cursor: "pointer" }}>
          Logo
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 5 }}>
        {menuItems.map((item, index) => (
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
        ))}
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 5 }}>
        <Button
          onClick={handleLogin}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.main,
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
            <br/>
            <br/>

            {menuItems.map((item, index) => (
              <Box key={index}>
                <Typography
                  variant="h6"
                  onClick={() => {
                    navigate(item.route);
                    setDrawerOpen(false);
                  }}
                  sx={{ marginBottom: 2, marginTop:1, cursor: "pointer" }}
                >
                  {item.label}
                </Typography>
                {index < menuItems.length - 1 && <Divider />}
              </Box>
            ))}
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
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
