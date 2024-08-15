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
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import { useSelector, useDispatch } from "react-redux";
// import { io } from "socket.io-client";
// import { getAllUsers } from "../../../store/actions/authActions";
// import { getAssignedStudents } from "../../../store/actions/courseActions";

// const MessageMain = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [message, setMessage] = useState("");
//   const [receiverId, setReceiverId] = useState("");
//   const [msgsData, setMsgsData] = useState([]);
//   const userId = useSelector((state) => state?.auth?.user?._id);
//   const socket = useMemo(
//     () => io("https://zh0k2dcj-4545.euw.devtunnels.ms"),
//     []
//   );

//   const InstructorId = useSelector((state)=>state?.auth?.user?._id)


//     const [allUsers, setAllUsers] = useState([]);

//     console.log(allUsers, 'message inst user s')
//   useEffect(() => {
//     dispatch(getAssignedStudents(InstructorId))
//       .then((users) => {
//         setAllUsers(users.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   }, [dispatch]);

//   const filteredUsers = allUsers?.filter(user => user?.role === 'user' && user?._id !== userId);

//   console.log(filteredUsers, 'ok g')
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
//       setMsgsData((prevMsgs=[]) => [...prevMsgs, msg]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("getMessage");
//     };
//   }, []);

//   const handleSend = () => {
//     if (message.trim() && receiverId) {
//       const newMessage = {
//         receiverId:receiverId,
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
//       console.log(newMessage, 'new')
//       setMsgsData((prevMsgs = []) => [...prevMsgs, newMessage]);
//       setMessage("");
//     }
//   };

//   const handleSelectChat = (id) => {
//     socket.emit("addUser", userId, id);
//     setReceiverId(id);
//   };
// console.log(msgsData, 'ffff')


// // const filteredMsgsData = msgsData.filter(
// //   (msg) => msg.senderId === receiverId || msg.receiverId === receiverId
// // );


//   return (
//     <>
//       <Box>
//         <Typography
//           sx={{
//             color: theme.palette.primary.main,
//             fontWeight: "550",
//             fontSize: isMobile ? "1.5rem" : "2rem",
//           }}
//         >
//           Messages
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "start",
//           maxWidth:'80%'
//         }}
//       >
//         <Box>
//           {allUsers.map((val) => (
//             <Box
//               key={val.studentId._id}
//               onClick={() => handleSelectChat(val.studentId._id)}
//               sx={{
//                 cursor: "pointer",
//                 padding: "8px",
//                 "&:hover": { backgroundColor: theme.palette.primary.main, color:'white' },
//                 backgroundColor:
//                   receiverId === val.studentId._id ? "transparent" : "transparent",
//               }}
//             >
//               <Box sx={{display:'flex', alignItems:'center'}}>
//                 {/* <Avatar/> */}
//                 <Box sx={{marginLeft:'0.5rem'}}>
//                   <Typography
//                     sx={{
//                       color: receiverId === val.studentId._id ? theme.palette.primary.main : "inherit",
//                       fontWeight: receiverId === val.studentId._id ? "bold" : "normal",
//                       fontSize:'0.9rem'
//                     }}
//                   >
//                     {val.studentId.firstName}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontSize:'0.8rem',
//                       color:'grey'
//                     }}
//                   >
//                     Lorem ipsum dolor sit amet.
//                   </Typography>
//                 </Box>
//               </Box>
//               <Divider/>
//             </Box>
//           ))}
//         </Box>

//         <Paper
//           sx={{
//             width: isMobile ? "100%" : "60%",
//             margin: "20px auto",
//             padding: "16px",

//             borderRadius: "8px",
//           }}
//         >
//           <Box
//             sx={{
//               borderBottom: "1px solid #e0e0e0",
//               paddingBottom: "8px",
//               marginBottom: "16px",
//             }}
//           >
//             <Typography variant="h6" align="center" color="primary">
//               Khatri Brother Academy
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               height: "40vh",
//               overflowY: "auto",
//               // marginBottom: "16px",
//               padding: "8px",
//             }}
//           >
//             {msgsData?.map((msg, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     msg.senderId === userId ? "flex-end" : "flex-start",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor:
//                       msg?.senderId === userId
//                         ? theme.palette.primary.main
//                         : "#dfb3cc",
//                     color:
//                       msg?.senderId === userId
//                         ? "white"
//                         : theme.palette.primary.main,
//                     padding: "8px 12px",
//                     borderRadius: "12px",
//                     maxWidth: "60%",
//                     wordWrap: "break-word",

//                   }}
//                 >

//                   <Typography variant="body2"



//                   >{msg?.text}</Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       textAlign: "right",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {msg?.createdAt}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//             borderTop="1px solid #e0e0e0"
//             pt={1}
//           >
//             <TextField
//               fullWidth
//               variant="outlined"
//               size="small"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               // InputProps={{
//               //   endAdornment: (
//               //     <IconButton>
//               //       <AttachFileIcon />
//               //     </IconButton>
//               //   ),
//               // }}
//             />
//             <IconButton color="primary" onClick={handleSend}>
//               <SendIcon />
//             </IconButton>
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default MessageMain;



import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  useMediaQuery,
  CircularProgress,
  useTheme,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { getAssignedStudents } from "../../../store/actions/courseActions";
import { getAllUsers } from "../../../store/actions/authActions";

const MessageMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [msgsData, setMsgsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [adminUsers, setAdminUser] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedUserName, setSelectedUserName] = useState(""); // New state for selected user's name
  const userId = useSelector((state) => state?.auth?.user?._id);
  const socket = useMemo(
    () => io("https://zh0k2dcj-4545.euw.devtunnels.ms"),
    []
  );

  console.log(allUsers, 'message users ')
  const InstructorId = useSelector((state) => state?.auth?.user?._id);

  useEffect(() => {
    dispatch(getAssignedStudents(InstructorId))
      .then((users) => {
        setAllUsers(users.data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false)
      });
  }, [dispatch, InstructorId]);



  useEffect(() => {
    dispatch(getAllUsers())
      .then((res) => {
        setAdminUser(res.data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false)
      });
  }, []);



  const filteredUsers = adminUsers?.filter(user => user?.role === 'admin' && user?._id !== userId);

  useEffect(() => {
    socket.on("getUsers", (msgs) => {
      console.log(msgs);
    });

    socket.on("userMsgs", (res) => {
      setMsgsData(res?.messages);
      console.log(res, "res");
    });

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
  }, [socket]);

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
      console.log(newMessage, 'new');
      setMsgsData((prevMsgs = []) => [...prevMsgs, newMessage]);
      setMessage("");
    }
  };

  const handleSelectChat = (id, firstName) => {
    socket.emit("addUser", userId, id);
    setReceiverId(id);
    setSelectedUserName(firstName); // Update the selected user's name
  };



  if(loading){
    return(
      <>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
        <CircularProgress/>

        </Box>
      </>
    )
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
          maxWidth: '80%'
        }}
      >
       <Box>
       <br/>
       <Typography sx={{fontSize:'1.2rem', color:theme.palette.primary.main, fontWeight:600}}>Admin</Typography>
       <Box>

          {filteredUsers.map((val) => (
            <Box

              key={val._id}
              onClick={() => handleSelectChat(val._id, val.firstName)}
              sx={{
                cursor: "pointer",

                padding: "8px",
                "&:hover": { backgroundColor: theme.palette.primary.main, color: 'white' },
                backgroundColor:
                  receiverId === val._id ? "transparent" : "transparent",
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Avatar /> */}
                <Box sx={{ marginLeft: '0.5rem' }}>
                  <Typography
                    sx={{
                      color: receiverId === val._id ? theme.palette.primary.main : "inherit",
                      fontWeight: receiverId === val._id ? "bold" : "bold",
                      fontSize: '1.1rem'
                    }}
                  >
                    {val.firstName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: 'grey'
                    }}
                  >
                    Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>



        <br/>
<Divider/>

        <br/>

        <Typography sx={{fontSize:'1.2rem', color:theme.palette.primary.main, fontWeight:600}}>Students</Typography>

        <Box>
          {allUsers.map((val) => (
            <Box
              key={val.studentId._id}
              onClick={() => handleSelectChat(val.studentId._id, val.studentId.firstName)}
              sx={{
                cursor: "pointer",
                padding: "8px",
                "&:hover": { backgroundColor: theme.palette.primary.main, color: 'white' },
                backgroundColor:
                  receiverId === val.studentId._id ? "transparent" : "transparent",
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Avatar /> */}
                <Box sx={{ marginLeft: '0.5rem' }}>
                  <Typography
                    sx={{
                      color: receiverId === val.studentId._id ? theme.palette.primary.main : "inherit",
                      fontWeight: receiverId === val.studentId._id ? "bold" : "normal",
                      fontSize: '0.9rem'
                    }}
                  >
                    {val.studentId.firstName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: 'grey'
                    }}
                  >
                    Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
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
              {selectedUserName || "Select a Student"} {/* Display the selected user's name */}
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
                      msg?.senderId === userId
                        ? theme.palette.primary.main
                        : "#dfb3cc",
                    color:
                      msg?.senderId === userId
                        ? "white"
                        : theme.palette.primary.main,
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "60%",
                    wordWrap: "break-word",
                  }}
                >
                  <Typography variant="body2">
                    {msg?.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "right",
                      marginTop: "4px",
                    }}
                  >
                    {msg?.createdAt}
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

          <Typography sx={{color:theme.palette.primary.main, mt:1, fontSize:'0.8rem', textAlign:'center'}}>Disclaimer : Your chat is not private, Admin can view your chat</Typography>
        </Paper>
      </Box>
    </>
  );
};

export default MessageMain;
