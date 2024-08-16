import React, { useState } from "react";
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
  MenuItem as MuiMenuItem,
  Select,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Menu,
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
import AdvanceCoursesMain from "./components/AdvanceCourses/AdvanceCoursesMain";
import BeginnerCoursesMain from "./components/BegginerCourses/BeginnerCoursesMain";
import StudentMain from "./components/Students/StudentMain";
import InstructorMain from "./components/Instructor/InstructorMain";
import IntermediateCoursesMain from "./components/IntermediateCourses/IntermediateCoursesMain";
import GhazalCoursesMain from "./components/GhazalCourses/GhazalCoursesMain";
import BhajjanCoursesMain from "./components/BhajjanCourses/BhajjanCoursesMain";
import TablaCoursesMain from "./components/TablaCourses/TablaCoursesMain";
import { IoIosNotificationsOutline } from "react-icons/io";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import { getNotification } from "../store/actions/courseActions";
import { RxDashboard } from "react-icons/rx";
import { BiMessageAltDetail } from "react-icons/bi";import { TbMessage2Cog } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { CgFileDocument } from "react-icons/cg";
import { PiVideo } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { TbMessage2Star } from "react-icons/tb";








import { useNavigate } from "react-router";
import BollyWoodMain from "./components/BollyWoodCourses/BollyWoodMain";
import AdminBlogsMain from "./components/Blogs/AdminBlogsMain";
import PendingCustomCourseMain from "./components/PendingCustomCourses/PendingCustomCourseMain";
import AdminFreeTrailsMain from "./components/AdminFreeTrails/AdminFreeTrailsMain";
import AdminJoinFreeTrails from "./components/AdminFreeTrails/AdminJoinFreeTrails";

const drawerWidth = 240;

const listData = [
  { title: "Dashboard", icon: <RxDashboard /> },
  {
    title: "Hindustani Vocal Courses", icon: <CiMicrophoneOn />,
    submenu: [
      { title: "Beginner Course", icon: <BiMessageAltDetail /> },
      { title: "Intermediate Course", icon: <BiMessageAltDetail /> },
      { title: "Advance Course", icon: <BiMessageAltDetail /> },
    ],
  },

  { title: "Bhajan", icon: <ArticleIcon /> },
  { title: "Gazal", icon: <ArticleIcon /> },
  { title: "Tabla", icon: <ArticleIcon /> },
  { title: "Bollywood Public Filmy Songs", icon: <ArticleIcon /> },

  { title: "Pending Custom Courses", icon: <PiStudent /> },


  { title: "Instructors", icon: <GiTeacher /> },
  { title: "Students", icon: <PiStudent /> },
  { title: "Join Free Trails", icon: <IoMdContacts />  },

  { title: "Pending Trails", icon: <IoMdContacts />  },
  { title: "Message", icon: <BiMessageAltDetail /> },
  { title: "Testimonial", icon: <TbMessage2Star /> },
  { title: "Contact Details", icon: <IoMdContacts />  },
  { title: "Blogs", icon: <IoMdContacts />  },


  { title: "Terms & Conditions", icon: <CgFileDocument /> },
  { title: "Settings", icon: <IoSettingsOutline /> },
  { title: "Logout", icon: <MdLogout />  },
];

const AdminMain = () => {
  const base = "http://16.171.98.198:4545";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedItem, setSelectedItem] = useState(listData[0].title);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userData = useSelector((state) => state?.auth?.user);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  console.log(userData, "data");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePictureUrl = base + userData?.profilePicture;

  const handleItemClick = (title, hasSubMenu = false) => {
    if (title === "Logout") {
      setLogoutModalOpen(true);
    } else if (hasSubMenu) {
      setOpenSubMenu(openSubMenu === title ? null : title); // Toggle submenu visibility

      // On mobile, do not close the drawer
      if (!isMobile) {
        setDrawerOpen(false); // Close the drawer on larger screens
      }
    } else {
      setSelectedItem(title);
      setOpenSubMenu(null); // Close any open submenu

      // On mobile, close the drawer
      if (isMobile) {
        setDrawerOpen(false);
      }
    }
  };


  const handleSubItemClick = (parentTitle, subTitle) => {
    setSelectedItem(`${parentTitle} - ${subTitle}`);
    // setOpenSubMenu(null); // Close submenu
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    // Replace this with actual dispatch if you use redux
    dispatch(userLogout());
    navigate("/");
    setLogoutModalOpen(false);
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    // Fetch notifications when the dropdown is opened
    dispatch(getNotification()).then((response) => {
      console.log(response.data.data, "haha");
      setNotifications(response.data.data); // Assuming the API returns data in this format
    });
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const open = Boolean(notificationAnchorEl);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ display: isMobile ? "block" : "flex" }}>
        {/* <CssBaseline /> */}
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
                  {
  notifications && notifications.length > 0 ? (
    notifications.map((notification, index) => (
      <Box key={index} sx={{padding:'0.5rem 2rem', cursor:'alias', backgroundColor: notification.isRead ? 'transparent' : '#d7d7d7'}}>
        <Typography sx={{fontSize:'0.8rem',cursor:'alias', fontWeight:600, color: theme.palette.primary.main}}>
          {notification?.title}
        </Typography>
        <Typography sx={{fontSize:'0.6rem', cursor:'allias'}}>
          {notification?.body}
        </Typography>
        <Divider />
      </Box>
    ))
  ) : (
    <Typography sx={{fontSize:'0.8rem', padding:'0.5rem 2rem', color:'gray'}}>
      No notifications available right now
    </Typography>
  )}
                </Menu>{" "}
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
                            {userData?.firstName}
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
                <React.Fragment key={ind}>

                  <>
                  <ListItem
                    disablePadding
                    sx={{
                      backgroundColor: selectedItem.includes(val.title)
                        ? "white"
                        : "transparent",
                        py:1,
                      borderRadius: "0px",
                      color: selectedItem.includes(val.title)
                        ? theme.palette.primary.main
                        : "#fff",
                    }}
                    onClick={() => handleItemClick(val.title, !!val.submenu)}
                  >
                    <ListItemButton>
                      <ListItemIcon
                        sx={{
                          color: selectedItem.includes(val.title)
                            ? theme.palette.primary.main
                            : "#fff",
                            fontSize:'1.5rem'
                        }}
                      >
                        {val.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={val.title}
                        sx={{
                          color: selectedItem.includes(val.title)
                            ? theme.palette.primary.main
                            : "#fff",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                 <Divider sx={{backgroundColor:'white', width:'100%', color:'white' ,}}/>

                  </>

                  {val.submenu && openSubMenu === val.title && (
                    <List sx={{ pl: 4 }}>
                      {val.submenu.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          disablePadding
                          sx={{
                            backgroundColor:
                              selectedItem === `${val.title} - ${subItem.title}`
                                ? "white"
                                : "transparent",
                            mt: 1,
                            borderRadius: "0px",
                            color:
                              selectedItem === `${val.title} - ${subItem.title}`
                                ? theme.palette.primary.main
                                : "#fff",
                          }}
                          onClick={() =>
                            handleSubItemClick(val.title, subItem.title)
                          }
                        >
                          <ListItemButton>
                            <ListItemText
                              primary={subItem.title}
                              sx={{
                                color:
                                  selectedItem ===
                                  `${val.title} - ${subItem.title}`
                                    ? theme.palette.primary.main
                                    : "#fff",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>

                      ))}
                    </List>
                  )}
                 <Divider sx={{backgroundColor:'white', width:'100%', color:'white' ,}}/>

                </React.Fragment>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box>
            {selectedItem === "Dashboard" && <Dashboard />}

            {selectedItem === "Hindustani Vocal Courses - Beginner Course" && (
              <BeginnerCoursesMain />
            )}
            {selectedItem ===
              "Hindustani Vocal Courses - Intermediate Course" && (
              <IntermediateCoursesMain />
            )}
            {selectedItem === "Hindustani Vocal Courses - Advance Course" && (
              <AdvanceCoursesMain />
            )}

            {selectedItem === "Bhajan" && <BhajjanCoursesMain />}

            {selectedItem === "Gazal" && <GhazalCoursesMain />}
            {selectedItem === "Tabla" && <TablaCoursesMain />}
            {selectedItem === "Bollywood Public Filmy Songs" && <BollyWoodMain />}
            {selectedItem === "Pending Custom Courses" && <PendingCustomCourseMain />}

            {/* { selectedItem === 'Students' && <ArticleIcon /> } */}
            {selectedItem === "Students" && <StudentMain />}
            {selectedItem === "Join Free Trails" && <AdminJoinFreeTrails />}

            {selectedItem === "Pending Trails" && <AdminFreeTrailsMain />}

            {selectedItem === "Instructors" && <InstructorMain />}
            {selectedItem === "Message" && <MessagesMain />}
            {selectedItem === "Testimonial" && <Testimonials />}
            {selectedItem === "Terms & Conditions" && <TermsConditionsMain />}
            {selectedItem === "Contact Details" && <ContactDetails />}
            {selectedItem === "Blogs" && <AdminBlogsMain />}


            {selectedItem === "Settings" && <SettingsMain />}
            {selectedItem === "ManageProfile" && <ShowProfileData />}
          </Box>
        </Box>
      </Box>

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
    </>
  );
};

export default AdminMain;
