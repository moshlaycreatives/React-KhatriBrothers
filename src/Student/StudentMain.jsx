import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  FormControl,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  CircularProgress,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon for opening drawer
import { Helmet } from "react-helmet";
import Dashboard from "./components/Dashboard/Dashboard";
import MessagesMain from "./components/Messages/MessagesMain";
import CourseInfoMain from "./components/CourseInfo/CourseInfoMain";
import Testimonials from "./components/Testimonials/Testimonials";
import TermsConditionsMain from "./components/TermsConditions/TermsConditionsMain";
import SettingsMain from "./components/Settings/SettingsMain";
import { userLogout } from "../store/actions/authActions";
import ShowProfileData from "./components/ManageProfile/ShowProfileData";
import { useDispatch, useSelector } from "react-redux";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  getNotification,
  getStudentEnrolledCourses,
} from "../store/actions/courseActions";
import { BiMessageAltDetail } from "react-icons/bi";
import { TbMessage2Cog } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { CgFileDocument } from "react-icons/cg";
import { PiVideo } from "react-icons/pi";
import { GoInfo } from "react-icons/go";
import { TbMessage2Star } from "react-icons/tb";
import StudentLectures from "./components/StudentLectures/StudentLectures";
import StudentTrailJoin from "./components/FreeTrailStudent/StudentTrailJoin";
import { enqueueSnackbar } from "notistack";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router";

const drawerWidth = 300;
const restrictedRoutes = ["Classes", "Course Info", "Message", "Testimonial"];
const listData = [
  { title: "Dashboard", icon: <RxDashboard /> },
  { title: "Course Info", icon: <GoInfo /> },
  { title: "Classes", icon: <SiGoogleclassroom /> },
  { title: "Join Free Trial Class", icon: <GoInfo /> },
  { title: "Message", icon: <BiMessageAltDetail /> },
  { title: "Testimonial", icon: <TbMessage2Star /> },
  { title: "Terms & Conditions", icon: <CgFileDocument /> },
  { title: "Settings", icon: <IoSettingsOutline /> },
  { title: "Logout", icon: <MdLogout /> },
];

const StudentMain = () => {
  const base = "http://16.171.98.198:4545";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedItem, setSelectedItem] = useState(listData[0].title);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userData = useSelector((state) => state?.auth?.user);
  console.log(userData, "data");
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
const [loading, setLoading] = useState(false); // State for loader


  console.log(userData, "data");
  const dispatch = useDispatch();

  const profilePictureUrl = base + userData.profilePicture;

  // const handleItemClick = (title) => {
  //   if (title === "Logout") {
  //     setLogoutModalOpen(true);
  //   } else if (title === "ManageProfile") {
  //     setSelectedItem(title);
  //   } else {
  //     setSelectedItem(title);
  //   }
  //   if (isMobile) {
  //     setDrawerOpen(false);
  //   }
  // };

  const handleItemClick = (title) => {
    const unrestrictedItems = [
      "Dashboard",
      "Join Free Trial Class",
      "Terms & Conditions",
      "Settings",
      "ManageProfile",
      "Logout",
    ];

    if (unrestrictedItems.includes(title) || courseData.length > 0) {
      if (title === "Logout") {
        setLogoutModalOpen(true);
      } else if (title === "ManageProfile") {
        setSelectedItem(title);
      } else {
        setSelectedItem(title);
      }
      if (isMobile) {
        setDrawerOpen(false);
      }
    } else {
      setShowPopup(true);
      // enqueueSnackbar('Pleaase Enroll course to access this section',{variant:'error'})
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userLogout());
    setLogoutModalOpen(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };

  const handleCloseModalPopup = () => {
    setShowPopup(false);
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);

    dispatch(getNotification()).then((response) => {
      console.log(response.data.data, "haha");
      setNotifications(response.data.data);
    });
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const open = Boolean(notificationAnchorEl);

  useEffect(() => {}, []);

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
setLoading(true)
 try {
        const res = await dispatch(getStudentEnrolledCourses());
        const data = res.data.data;
        console.log(data, "data on mains tudent");
        setCourseData(data);
setLoading(false)
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Student Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ display: isMobile ? "block" : "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "white",
            padding: "0.3rem 0rem",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                mr: 2,
                display: isMobile ? "block" : "none",
                color: theme.palette.primary.main,
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: theme.palette.primary.main, fontSize: "2rem" }}
              >
                Logo
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <IconButton color="inherit" onClick={handleNotificationClick}>
                  <IoIosNotificationsOutline
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>

                <Menu
                  anchorEl={notificationAnchorEl}
                  open={open}
                  onClose={handleNotificationClose}
                  PaperProps={{
                    sx: {
                      width: 250,
                      maxWidth: "90%",
                      minHeight: "80vh",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: "800",
                      paddingLeft: "1.5rem",
                      marginBottom: "5px",
                    }}
                  >
                    Notifications
                  </Typography>
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Box
                        key={index}
                        sx={{
                          padding: "0.5rem 2rem",
                          backgroundColor: notification.isRead
                            ? "transparent"
                            : "#d7d7d7",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {notification?.title}
                        </Typography>
                        <Typography sx={{ fontSize: "0.6rem" }}>
                          {notification?.body}
                        </Typography>
                        <Divider />
                      </Box>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        padding: "0.5rem 2rem",
                        color: "gray",
                      }}
                    >
                      No notifications available right now
                    </Typography>
                  )}
                </Menu>
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
                            sx={{
                              height: "2rem",
                              width: "2rem",
                              marginRight: "8px",
                            }}
                          />
                          <Typography sx={{ fontSize: "1rem" }}>
                            {userData?.firstName} {userData?.lastName}
                          </Typography>
                        </Box>
                      )}
                      onChange={(event) => handleItemClick(event.target.value)}
                    >
                      <MenuItem
                        sx={{ fontSize: "0.8rem" }}
                        value="ManageProfile"
                      >
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
          variant={isMobile ? "temporary" : "permanent"}
          open={!isMobile ? true : drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              overflow: "auto",
              backgroundColor: theme.palette.primary.main,
              height: "100vh",
            }}
          >
            <List>
              {listData.map((val, ind) => (
                <>
                  <ListItem
                    key={ind}
                    disablePadding
                    sx={{
                      backgroundColor:
                        selectedItem === val.title ? "white" : "transparent",
                      py: 1,
                      borderRadius: "0px",
                      color:
                        selectedItem === val.title
                          ? theme.palette.primary.main
                          : "#fff",
                    }}
                    onClick={() => handleItemClick(val.title)}
                  >
                    <ListItemButton
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <ListItemIcon
                          sx={{
                            color:
                              selectedItem === val.title
                                ? theme.palette.primary.main
                                : "#fff",
                            fontSize: "1.5rem",
                          }}
                        >
                          {val.icon}
                        </ListItemIcon>
                        <ListItemIcon
                          sx={{
                            color:
                              selectedItem === val.title
                                ? theme.palette.primary.main
                                : "#fff",
                          }}
                        >
                          {val.title}
                        </ListItemIcon>
                      </Box>
                      {restrictedRoutes.includes(val.title) &&
                        courseData.length === 0 && (
                          <LockIcon
                            color="white"
                            style={{ fontSize: "1.1rem" }}
                          />
                        )}
                    </ListItemButton>
                  </ListItem>
                  <Divider
                    sx={{
                      backgroundColor: "white",
                      width: "100%",
                      color: "white",
                    }}
                  />
                </>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box>
            {selectedItem === "Dashboard" && <Dashboard />}
            {selectedItem === "Course Info" && <CourseInfoMain />}
            {selectedItem === "Classes" && <StudentLectures />}
            {selectedItem === "Join Free Trial Class" && <StudentTrailJoin />}

            {selectedItem === "Message" && <MessagesMain />}
            {selectedItem === "Testimonial" && <Testimonials />}
            {selectedItem === "Terms & Conditions" && <TermsConditionsMain />}
            {selectedItem === "Settings" && <SettingsMain />}
            {selectedItem === "ManageProfile" && <ShowProfileData />}
          </Box>
        </Box>
      </Box>


{loading && (
<Box
   sx={{
    position: "fixed",
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundColor: "rgba(255, 255, 255, 0.8)",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     zIndex: theme.zIndex.modal + 1, // Ensure it is above other components
   }}
 >
   <CircularProgress />
 </Box>
)}

      <Dialog
        open={logoutModalOpen}
        onClose={handleCloseModal}
        sx={{ borderRadius: "0 !important" }}
      >
        <DialogContent sx={{ borderRadius: "0 !important" }}>
          <DialogContentText
            sx={{ color: "black", paddingRight: isMobile ? "0rem" : "10rem" }}
          >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <br />
        <DialogActions>
          <Button
            onClick={handleLogout}
            sx={{ fontWeight: "400" }}
            color="primary"
            autoFocus
          >
            Logout
          </Button>
          <Button
            onClick={handleCloseModal}
            sx={{ color: "grey", fontWeight: "400" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showPopup}
        onClose={handleCloseModalPopup}
        sx={{ borderRadius: "0 !important" }}
      >
        <DialogContent sx={{ borderRadius: "0 !important" }}>
          <DialogContentText
            sx={{
              paddingRight: isMobile ? "0rem" : "1rem",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
                color: "black",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Please Pay Your Enrollment Dues for access.
                <br />
                <br />
                <Button variant="contained" onClick={() => navigate("/")}>
                  Go to Website
                </Button>
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentMain;
