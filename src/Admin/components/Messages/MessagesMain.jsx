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
  Button,
  CircularProgress,
  Drawer,
  IconButton as MuiIconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const base = "http://16.171.98.198:4545";
  const endOfMessagesRef = useRef(null);
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

  const handleSelectChat = (id, firstName, lastName) => {
    socket.emit("addUser", userId, id);
    setReceiverId(id);
    setSelectedUser(`${firstName} ${lastName}`);
    if (isMobile) setDrawerOpen(false);
  };

  const handleViewAllConversations = () => {
    setShowConversations(true);
  };

  const handleBackToMessages = () => {
    setShowConversations(false);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault(); // Prevent default Enter key behavior (new line)
  //     handleSend();
  //   }
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        // Allow Shift + Enter to insert a new line
        return;
      }
      // Prevent default behavior for Enter key (new line)
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
    <>
      <Box
        sx={{
          flex: 0.5,
          marginRight: isMobile ? 0 : 2,
          maxHeight: "60vh", // Adjust this value as needed
          overflowY: "auto",
          borderRight: `1px solid ${theme.palette.divider}`, // Optional: Add a border to separate sections
          paddingRight: 2,
        }}
      >
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
            onClick={() =>
              handleSelectChat(val._id, val.firstName, val.lastName)
            }
            sx={{
              cursor: "pointer",
              padding: "8px",

              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
              backgroundColor:
                receiverId === val._id
                  ? theme.palette.primary.main
                  : "transparent",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`}
              />

              <Box sx={{ marginLeft: "0.5rem" }}>
                <Typography
                  sx={{
                    color:
                      receiverId === val._id
                        ? "white"
                        : theme.palette.text.primary,
                    fontWeight: receiverId === val._id ? "bold" : "600",
                    fontSize: "0.9rem",
                  }}
                >
                  {val.firstName} {val.lastName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "grey",
                  }}
                ></Typography>
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
            onClick={() =>
              handleSelectChat(val._id, val.firstName, val.lastName)
            }
            sx={{
              cursor: "pointer",
              padding: "8px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
              backgroundColor:
                receiverId === val._id
                  ? theme.palette.primary.main
                  : "transparent",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={`${base}${val?.profilePicture?.replace(/ /g, "%20")}`}
              />

              <Box sx={{ marginLeft: "0.5rem" }}>
                <Typography
                  sx={{
                    color:
                      receiverId === val._id
                        ? "white"
                        : theme.palette.text.primary,
                    fontWeight: receiverId === val._id ? "bold" : "600",
                    fontSize: "0.9rem",
                  }}
                >
                  {val.firstName} {val.lastName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "grey",
                  }}
                ></Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </>
  )

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
            <Button variant="contained" sx={{fontSize:isMobile ? '0.5rem': '1rem'}} onClick={handleViewAllConversations}>
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
            {isMobile && (
              <MuiIconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ alignSelf: "flex-start",
                color:theme.palette.primary.main,
                mt:1
                 }}
              >
                <MenuIcon />
              </MuiIconButton>
            )}

            {isMobile ? (
              <Drawer
                anchor="left"
                open={drawerOpen}

                onClose={() => setDrawerOpen(false)}
              >

              <Box sx={{padding:'6rem 0.5rem 0rem 0.5rem'}}>
  {renderUsersList()}
              </Box>

              </Drawer>
            ) : (
              <>
                <Box
                  sx={{
                    flex: 0.5,
                    marginRight: isMobile ? 0 : 2,
                    maxHeight: "60vh", // Adjust this value as needed
                    overflowY: "auto",
                    borderRight: `1px solid ${theme.palette.divider}`, // Optional: Add a border to separate sections
                    paddingRight: 2,
                  }}
                >
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
                      onClick={() =>
                        handleSelectChat(val._id, val.firstName, val.lastName)
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "8px",

                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                        backgroundColor:
                          receiverId === val._id
                            ? theme.palette.primary.main
                            : "transparent",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={`${base}${val?.profilePicture?.replace(
                            / /g,
                            "%20"
                          )}`}
                        />

                        <Box sx={{ marginLeft: "0.5rem" }}>
                          <Typography
                            sx={{
                              color:
                                receiverId === val._id
                                  ? "white"
                                  : theme.palette.text.primary,
                              fontWeight:
                                receiverId === val._id ? "bold" : "600",
                              fontSize: "0.9rem",
                            }}
                          >
                            {val.firstName} {val.lastName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "grey",
                            }}
                          ></Typography>
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
                      onClick={() =>
                        handleSelectChat(val._id, val.firstName, val.lastName)
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "8px",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                        backgroundColor:
                          receiverId === val._id
                            ? theme.palette.primary.main
                            : "transparent",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={`${base}${val?.profilePicture?.replace(
                            / /g,
                            "%20"
                          )}`}
                        />

                        <Box sx={{ marginLeft: "0.5rem" }}>
                          <Typography
                            sx={{
                              color:
                                receiverId === val._id
                                  ? "white"
                                  : theme.palette.text.primary,
                              fontWeight:
                                receiverId === val._id ? "bold" : "600",
                              fontSize: "0.9rem",
                            }}
                          >
                            {val.firstName} {val.lastName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "grey",
                            }}
                          ></Typography>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </>
            )}

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
                      <Typography variant="body2"> {msg.text}</Typography>
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
                <div ref={endOfMessagesRef} />
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
                  multiline
                  minRows={1}
                  maxRows={3}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  // InputProps={{
                  //   endAdornment: (
                  //     <IconButton>
                  //       <AttachFileIcon />
                  //     </IconButton>
                  //   ),
                  // }}
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

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   Divider,
//   Avatar,
//   Button,
//   CircularProgress,
//   Drawer,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useSelector, useDispatch } from "react-redux";
// import { io } from "socket.io-client";
// import { getAllUsers } from "../../../store/actions/authActions";
// import ViewAllChats from "./ViewAllChats";
// import { getRecentMessage } from "../../../store/actions/courseActions";

// const MessageMain = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [message, setMessage] = useState("");
//   const [receiverId, setReceiverId] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const base = 'http://16.171.98.198:4545';

//   const [loading, setLoading] = useState(true);
//   const [msgsData, setMsgsData] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [recentMessage, setRecentMessage] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const [showConversations, setShowConversations] = useState(false); // Manage view state
//   const userId = useSelector((state) => state?.auth?.user?._id);
//   const socket = useMemo(
//     () => io("http://16.171.98.198:4545"),
//     []
//   );

//   useEffect(() => {
//     dispatch(getRecentMessage())
//       .then((users) => {
//         setRecentMessage(users.data.data);
//         // setLoading(false)
//       })
//       .catch((error) => {
//         // setLoading(false)
//         console.error("Error fetching users:", error);
//       });
//   }, []);

//   useEffect(() => {
//     dispatch(getAllUsers())
//       .then((users) => {
//         setAllUsers(users.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error fetching users:", error);
//       });
//   }, []);

//   const filteredInstructors = allUsers?.filter(
//     (user) => user?.role === "instructor" && user?._id !== userId
//   );

//   const filteredStudents = allUsers?.filter(
//     (user) => user?.role === "user" && user?._id !== userId
//   );

//   useEffect(() => {
//     socket.on("getUsers", (msgs) => {
//       console.log(msgs);
//     });

//     socket.on("userMsgs", (res) => {
//       setMsgsData(res?.messages);
//       console.log(res, "res");
//     });
//   }, [socket]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected with socket ID:", socket.id);
//     });

//     socket.on("getMessage", (msg) => {
//       console.log(msg, "msss");
//       setMsgsData((prevMsgs = []) => [...prevMsgs, msg]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("getMessage");
//     };
//   }, []);

//   const handleSend = () => {
//     if (message.trim() && receiverId) {
//       const newMessage = {
//         receiverId: receiverId,
//         text: message,
//         senderId: userId,
//         imgUrl: "",
//         createdAt: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }),
//       };
//       socket.emit("sendMessage", newMessage);
//       console.log(newMessage, "new");
//       setMsgsData((prevMsgs = []) => [...prevMsgs, newMessage]);
//       setMessage("");
//     }
//   };

//   const handleSelectChat = (id, firstName, lastName) => {
//     socket.emit("addUser", userId, id);
//     setReceiverId(id);
//     setSelectedUser(`${firstName} ${lastName}`);
//     setDrawerOpen(false); // Close drawer after selecting a chat
//   };

//   const handleViewAllConversations = () => {
//     setShowConversations(true);
//   };

//   const handleBackToMessages = () => {
//     setShowConversations(false);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       if (event.shiftKey) {
//         return;
//       }
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           sx={{
//             color: theme.palette.primary.main,
//             fontWeight: "550",
//             fontSize: isMobile ? "1.5rem" : "2rem",
//           }}
//         >
//           Messages
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
//           {showConversations ? (
//             <Button variant="contained" onClick={handleBackToMessages}>
//               Back to Messages
//             </Button>
//           ) : (
//             <>
//               <Button variant="contained" onClick={handleViewAllConversations}>
//                 View All Conversations
//               </Button>

//             </>
//           )}
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "start",
//           maxWidth: "100%",
//         }}
//       >
//       {isMobile && (
//                 <IconButton onClick={() => setDrawerOpen(true)}>
//                   <MenuIcon />
//                 </IconButton>
//               )}

//         {showConversations ? (
//           <ViewAllChats />
//         ) : (
//           <>
//             <Box
//               sx={{
//                 display: { xs: "none", md: "block" },
//                 flex: 0.5,
//                 marginRight: 2,
//                 maxHeight: "60vh",
//                 overflowY: "auto",
//                 borderRight: `1px solid ${theme.palette.divider}`,
//                 paddingRight: 2,
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: "bold",
//                   marginBottom: "8px",
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Instructors
//               </Typography>
//               {filteredInstructors.map((val) => (
//                 <Box
//                   key={val._id}
//                   onClick={() => handleSelectChat(val._id, val.firstName, val.lastName)}
//                   sx={{
//                     cursor: "pointer",
//                     padding: "8px",
//                     "&:hover": {
//                       backgroundColor: theme.palette.primary.main,
//                       color: "white",
//                     },
//                     backgroundColor:
//                       receiverId === val._id ? theme.palette.primary.main : "transparent",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, '%20')}`} />
//                     <Box sx={{ marginLeft: "0.5rem" }}>
//                       <Typography
//                         sx={{
//                           color:
//                             receiverId === val._id
//                               ? "white"
//                               : theme.palette.text.primary,
//                           fontWeight:
//                             receiverId === val._id ? "bold" : "600",
//                           fontSize: "0.9rem",
//                         }}
//                       >
//                         {val.firstName} {val.lastName}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           fontSize: "0.8rem",
//                           color: "grey",
//                         }}
//                       >
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Divider />
//                 </Box>
//               ))}

//               <Typography
//                 sx={{
//                   fontWeight: "bold",
//                   marginTop: "16px",
//                   marginBottom: "8px",
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Students
//               </Typography>
//               {filteredStudents.map((val) => (
//                 <Box
//                   key={val._id}
//                   onClick={() => handleSelectChat(val._id, val.firstName)}
//                   sx={{
//                     cursor: "pointer",
//                     padding: "8px",
//                     "&:hover": {
//                       backgroundColor: theme.palette.primary.main,
//                       color: "white",
//                     },
//                     backgroundColor:
//                       receiverId === val._id ? theme.palette.primary.main : "transparent",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, '%20')}`} />
//                     <Box sx={{ marginLeft: "0.5rem" }}>
//                       <Typography
//                         sx={{
//                           color:
//                             receiverId === val._id
//                               ? "white"
//                               : theme.palette.text.primary,
//                           fontWeight:
//                             receiverId === val._id ? "bold" : "600",
//                           fontSize: "0.9rem",
//                         }}
//                       >
//                         {val.firstName} {val.lastName}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           fontSize: "0.8rem",
//                           color: "grey",
//                         }}
//                       >
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Divider />
//                 </Box>
//               ))}
//             </Box>

//             <Box
//               sx={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "80vh",
//                 maxHeight: "80vh",
//               }}
//             >
//               <Paper
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   flex: 1,
//                   padding: 2,
//                   overflowY: "auto",
//                 }}
//               >
//                 {msgsData.map((msg, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       flexDirection: msg.senderId === userId ? "row-reverse" : "row",
//                       alignItems: "center",
//                       marginBottom: 1,
//                     }}
//                   >
//                     <Avatar src={`${base}${msg.imgUrl}`} />
//                     <Box
//                       sx={{
//                         backgroundColor:
//                           msg.senderId === userId
//                             ? theme.palette.primary.main
//                             : theme.palette.grey[200],
//                         color:
//                           msg.senderId === userId ? "white" : theme.palette.text.primary,
//                         borderRadius: 2,
//                         padding: 1,
//                         marginLeft: 1,
//                         maxWidth: "80%",
//                       }}
//                     >
//                       <Typography variant="body2">{msg.text}</Typography>
//                       <Typography
//                         sx={{
//                           fontSize: "0.7rem",
//                           color:
//                             msg.senderId === userId ? "white" : theme.palette.text.secondary,
//                         }}
//                       >
//                         {msg.createdAt}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Paper>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   padding: 1,
//                   borderTop: `1px solid ${theme.palette.divider}`,
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={2}
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                 />
//                 <IconButton onClick={handleSend}>
//                   <SendIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </>
//         )}
//       </Box>

//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{
//           width: 250,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: 250,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             padding: 2,
//           }}
//         >
//           <Typography variant="h6">Instructors</Typography>
//           {filteredInstructors.map((val) => (
//             <Box
//               key={val._id}
//               onClick={() => handleSelectChat(val._id, val.firstName, val.lastName)}
//               sx={{
//                 cursor: "pointer",
//                 padding: "8px",
//                 "&:hover": {
//                   backgroundColor: theme.palette.primary.main,
//                   color: "white",
//                 },
//                 backgroundColor:
//                   receiverId === val._id ? theme.palette.primary.main : "transparent",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, '%20')}`} />
//                 <Box sx={{ marginLeft: "0.5rem" }}>
//                   <Typography
//                     sx={{
//                       color:
//                         receiverId === val._id
//                           ? "white"
//                           : theme.palette.text.primary,
//                       fontWeight:
//                         receiverId === val._id ? "bold" : "600",
//                       fontSize: "0.9rem",
//                     }}
//                   >
//                     {val.firstName} {val.lastName}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Divider />
//             </Box>
//           ))}

//           <Typography variant="h6" sx={{ marginTop: 2 }}>
//             Students
//           </Typography>
//           {filteredStudents.map((val) => (
//             <Box
//               key={val._id}
//               onClick={() => handleSelectChat(val._id, val.firstName)}
//               sx={{
//                 cursor: "pointer",
//                 padding: "8px",
//                 "&:hover": {
//                   backgroundColor: theme.palette.primary.main,
//                   color: "white",
//                 },
//                 backgroundColor:
//                   receiverId === val._id ? theme.palette.primary.main : "transparent",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Avatar src={`${base}${val?.profilePicture?.replace(/ /g, '%20')}`} />
//                 <Box sx={{ marginLeft: "0.5rem" }}>
//                   <Typography
//                     sx={{
//                       color:
//                         receiverId === val._id
//                           ? "white"
//                           : theme.palette.text.primary,
//                       fontWeight:
//                         receiverId === val._id ? "bold" : "600",
//                       fontSize: "0.9rem",
//                     }}
//                   >
//                     {val.firstName} {val.lastName}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Divider />
//             </Box>
//           ))}
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default MessageMain;
