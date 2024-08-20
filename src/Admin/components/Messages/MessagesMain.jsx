import React, { useEffect, useMemo, useState } from "react";
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
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { getAllUsers } from "../../../store/actions/authActions";
import ViewAllChats from "./ViewAllChats";
import { getRecentMessage } from "../../../store/actions/courseActions";

const MessageMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [msgsData, setMsgsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [recentMessage, setRecentMessage] = useState([]);

  const [showConversations, setShowConversations] = useState(false); // Manage view state
  const userId = useSelector((state) => state?.auth?.user?._id);
  const socket = useMemo(
    () => io("http://16.171.98.198:4545"),
    []
  );

  useEffect(() => {
    dispatch(getRecentMessage())
      .then((users) => {
        setRecentMessage(users.data.data);
        // setLoading(false)
      })
      .catch((error) => {
        // setLoading(false)
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    dispatch(getAllUsers())
      .then((users) => {
        setAllUsers(users.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  }, []);

  const filteredInstructors = allUsers?.filter(
    (user) => user?.role === "instructor" && user?._id !== userId
  );

  const filteredStudents = allUsers?.filter(
    (user) => user?.role === "user" && user?._id !== userId
  );

  useEffect(() => {
    socket.on("getUsers", (msgs) => {
      console.log(msgs);
    });

    socket.on("userMsgs", (res) => {
      setMsgsData(res?.messages);
      console.log(res, "res");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    socket.on("getMessage", (msg) => {
      console.log(msg, "msss");
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
        receiverId: receiverId,
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
      console.log(newMessage, "new");
      setMsgsData((prevMsgs = []) => [...prevMsgs, newMessage]);
      setMessage("");
    }
  };

  const handleSelectChat = (id, firstName) => {
    socket.emit("addUser", userId, id);
    setReceiverId(id);
    setSelectedUser(firstName);
  };

  const handleViewAllConversations = () => {
    setShowConversations(true);
  };

  const handleBackToMessages = () => {
    setShowConversations(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter key behavior (new line)
      handleSend();
    }
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Messages
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
          {showConversations ? (
            <Button variant="contained" onClick={handleBackToMessages}>
              Back to Messages
            </Button>
          ) : (
            <Button variant="contained" onClick={handleViewAllConversations}>
              View All Conversations
            </Button>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          maxWidth: "100%",
        }}
      >
        {showConversations ? (
          <ViewAllChats />
        ) : (
          <>
            <Box sx={{ flex: 1, marginRight: isMobile ? 0 : 2
            ,

                maxHeight: "60vh", // Adjust this value as needed
                overflowY: "auto",
                borderRight: `1px solid ${theme.palette.divider}`, // Optional: Add a border to separate sections
                paddingRight: 2,

            }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                }}
              >
                Instructors
              </Typography>
              {filteredInstructors.map((val) => (
                <Box
                  key={val._id}
                  onClick={() => handleSelectChat(val._id, val.firstName)}
                  sx={{
                    cursor: "pointer",
                    padding: "8px",

                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                    backgroundColor:

                      receiverId === val._id ? theme.palette.primary.main : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar />
                    <Box sx={{ marginLeft: "0.5rem" }}>
                      <Typography
                        sx={{
                          color:
                            receiverId === val._id
                              ? "white"
                              : theme.palette.text.primary,
                          fontWeight:
                            receiverId === val._id ? "bold" : "normal",
                          fontSize: "0.9rem",
                        }}
                      >
                        {val.firstName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "grey",
                        }}
                      >
                        Hi
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
        ))}

              <Typography
                sx={{
                  fontWeight: "bold",
                  marginTop: "16px",
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                }}
              >
                Students
              </Typography>
              {filteredStudents.map((val) => (
                <Box
                  key={val._id}
                  onClick={() => handleSelectChat(val._id, val.firstName)}
                  sx={{
                    cursor: "pointer",
                    padding: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                    backgroundColor:
                      receiverId === val._id ? theme.palette.primary.main : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar />
                    <Box sx={{ marginLeft: "0.5rem" }}>
                      <Typography
                        sx={{
                          color:
                            receiverId === val._id
                              ? "white"
                              : theme.palette.text.primary,
                          fontWeight:
                            receiverId === val._id ? "bold" : "normal",
                          fontSize: "0.9rem",
                        }}
                      >
                        {val.firstName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "grey",
                        }}
                      >
                        Hi
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
         ) )}
            </Box>

            <Paper
              sx={{
                width: isMobile ? "100%" : "60%",
                margin: "20px auto",
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
                  {selectedUser || "Select User For Chat"}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "40vh",
                  overflowY: "auto",
                  padding: "8px",
                }}
              >
                {msgsData?.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        msg.senderId === userId ? "flex-end" : "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          msg.senderId === userId
                            ? theme.palette.primary.main
                            : "#dfb3cc",
                        color:
                          msg.senderId === userId
                            ? "white"
                            : theme.palette.primary.main,
                        padding: "8px 12px",
                        borderRadius: "12px",
                        maxWidth: "60%",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          marginTop: "4px",
                        }}
                      >
                        {msg.createdAt}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderTop="1px solid #e0e0e0"
                pt={1}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <AttachFileIcon />
                      </IconButton>
                    ),
                  }}
                />
                <IconButton color="primary" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </>
  );
};

export default MessageMain;
