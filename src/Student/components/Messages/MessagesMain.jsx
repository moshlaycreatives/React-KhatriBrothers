import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
  Divider,
  Avatar,
  CircularProgress,
  Drawer,
  IconButton as MuiIconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { getAllUsers } from "../../../store/actions/authActions";
import { getStudentEnrolledCourses } from "../../../store/actions/courseActions";

const MessageMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const endOfMessagesRef = useRef(null);

  const [msgsData, setMsgsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const base = "https://khatribrothersacademy.com:4545";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [selectedUser, setSelectedUser] = useState("");
  const socket = useMemo(
    () => io("https://khatribrothersacademy.com:4545"),
    []
  );

  const [allUsers, setAllUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    setLoading(true)
    dispatch(getStudentEnrolledCourses())
      .then((users) => {
        setAllUsers(users.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    dispatch(getAllUsers())
      .then((users) => {
        setAdminUsers(users.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  }, []);

  const filteredUsers = adminUsers?.filter(
    (user) => user?.role === "admin" && user?._id !== userId
  );

  useEffect(() => {
    socket.on("getUsers", (msgs) => {
      console.log(msgs);
    });

    socket.on("userMsgs", (res) => {
      setMsgsData(res?.messages);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    socket.on("getMessage", (msg) => {
      setMsgsData((prevMsgs = []) => [...prevMsgs, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("getMessage");
    };
  }, []);

  const handleSend = () => {
    if (message.trim() && receiverId) {
      const newMessage = {
        receiverId,
        text: message,
        senderId: userId,
        imgUrl: "",
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      socket.emit("sendMessage", newMessage);
      setMsgsData((prevMsgs = []) => [...prevMsgs, newMessage]);
      setMessage("");
    }
  };

  // const handleSelectChat = (id, firstName, lastName) => {
  //   socket.emit("addUser", userId, id);
  //   setReceiverId(id);
  //   setSelectedUser(`${firstName} ${lastName}`);
  // };


 const handleSelectChat = (id, firstName, lastName) => {
  socket.emit("addUser", userId, id);
  setReceiverId(id);
  setSelectedUser(`${firstName} ${lastName}`);
  if (isMobile) setDrawerOpen(false); // Close drawer after selecting a user
};
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) return; // Allow Shift + Enter to insert a new line
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView();
    }
  }, [msgsData]);






  const renderUsersList = () => (
    <Box sx={{ width: isMobile ? "100%" : "35%", padding: isMobile ? 0 : "10px" }}>
      <br />
      <Typography
        sx={{
          fontSize: "1.2rem",
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        Admin
      </Typography>
      <Box>
        {filteredUsers && filteredUsers?.map((val) => (
          <Box
            key={val._id}
            onClick={() => handleSelectChat(val._id, val.firstName, val.lastName)}
            sx={{
              cursor: "pointer",
              padding: "8px",
              backgroundColor: receiverId === val._id ? theme.palette.primary.main : "transparent",
              color: receiverId === val._id ? "white" : "inherit",
              marginBottom: "4px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`} />
              <Box sx={{ marginLeft: "0.5rem" }}>
                <Typography
                  sx={{
                    fontWeight: receiverId === val._id ? "bold" : "normal",
                    fontSize: "1.1rem",
                  }}
                >
                  {val.firstName} {val.lastName}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: receiverId === val._id ? "white" : "grey" }}>

                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography
        sx={{
          fontSize: "1.2rem",
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        Instructors
      </Typography>

      {allUsers && allUsers.filter(val => val?.instructorId).map((val) => (
        <Box
          key={val?.instructorId?._id}
          onClick={() => handleSelectChat(val.instructorId._id, val.instructorId.firstName, val.instructorId.lastName)}
          sx={{
            cursor: "pointer",
            padding: "8px",
            backgroundColor: receiverId === val?.instructorId?._id ? theme.palette.primary.main : "transparent",
            color: receiverId === val?.instructorId?._id ? "white" : "inherit",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`} />
            <Box sx={{ marginLeft: "0.5rem" }}>
              <Typography
                sx={{
                  fontWeight: receiverId === val?.instructorId?._id ? "bold" : "normal",
                  fontSize: "1.1rem",
                }}
              >
                {val?.instructorId?.firstName} {val?.instructorId?.lastName}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: receiverId === val?.instructorId?._id ? "white" : "grey" }}>

              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );














  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Messages
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
        }}

      >


{isMobile && (
          <MuiIconButton onClick={() => setDrawerOpen(true)} sx={{ alignSelf: "flex-start",color:theme.palette.primary.main,
                mt:1 }}>
            <MenuIcon />
          </MuiIconButton>
        )}

{isMobile ? (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>

        <Box sx={{padding:'6rem 0.5rem 0rem 0.5rem'}}>
  {renderUsersList()}
              </Box>
        </Drawer>

):(
<>

<Box
          sx={{
            width: isMobile ? "100%" : "35%",
            padding: isMobile ? 0 : "10px",
          }}
        >
          <br />
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Admin
          </Typography>
          <Box>
            {filteredUsers && filteredUsers.map((val) => (
              <Box
                key={val._id}
                onClick={() =>
                  handleSelectChat(val._id, val.firstName, val.lastName)
                }
                sx={{
                  cursor: "pointer",
                  padding: "8px",
                  backgroundColor:
                    receiverId === val._id
                      ? theme.palette.primary.main
                      : "transparent",
                  color: receiverId === val._id ? "white" : "inherit",

                  marginBottom: "4px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`}
                  />
                  <Box sx={{ marginLeft: "0.5rem" }}>
                    <Typography
                      sx={{
                        fontWeight: receiverId === val._id ? "bold" : "normal",
                        fontSize: "1.1rem",
                      }}
                    >
                      {val.firstName} {val.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: receiverId === val._id ? "white" : "grey",
                      }}
                    >

                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{
              fontSize: "1.2rem",
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Instructors
          </Typography>

          {allUsers && allUsers.filter(val => val?.instructorId).map((val) => (
            <Box
              key={val?.instructorId?._id}
              onClick={() =>
                handleSelectChat(
                  val.instructorId._id,
                  val.instructorId.firstName,
                  val.instructorId.lastName
                )
              }
              sx={{
                cursor: "pointer",
                padding: "8px",
                backgroundColor:
                  receiverId === val?.instructorId?._id
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  receiverId === val?.instructorId?._id ? "white" : "inherit",

                marginBottom: "4px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`}
                />
                <Box sx={{ marginLeft: "0.5rem" }}>
                  <Typography
                    sx={{
                      fontWeight:
                        receiverId === val?.instructorId?._id ? "bold" : "normal",
                      fontSize: "1.1rem",
                    }}
                  >
                    {val?.instructorId?.firstName} {val?.instructorId?.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color:
                        receiverId === val?.instructorId?._id ? "white" : "grey",
                    }}
                  >

                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>



</>
)}

        <Paper
          sx={{
            width: isMobile ? "100%" : "60%",
            margin: isMobile ? "20px 0" : "20px auto",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "8px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h6" align="center" color="primary">
              {selectedUser || "Select Instructor"}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "40vh",
              overflowY: "auto",
              padding: "8px",
              // backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {msgsData?.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection:
                    msg.senderId === userId ? "row-reverse" : "row",
                  marginBottom: "8px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      msg.senderId === userId
                        ? theme.palette.primary.main
                        : theme.palette.grey[300],
                    color: msg.senderId === userId ? "white" : "inherit",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    maxWidth: "60%",
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>{msg.text}</Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      textAlign: "right",
                      marginTop: "4px",
                    }}
                  >
                    {msg.createdAt}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={endOfMessagesRef} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              multiline
              maxRows={3}
              fullWidth
              size='small'
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ marginRight: "8px" }}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default MessageMain;
