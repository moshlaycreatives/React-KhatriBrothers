

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Avatar, Typography, TextField, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSelector, useDispatch } from 'react-redux';

// import { io } from 'socket.io-client';

const MessageMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [message, setMessage] = useState('');
  const userId = useSelector((state) => state?.auth?.user._id);
  console.log(userId, 'id')

//   const socket = useMemo(() => io("https://wv9pfwh9-4545.inc1.devtunnels.ms"), []);

//   useEffect(() => {
//     // On connection
//     socket.on('connect', () => {
//       console.log('Connected with socket ID:', socket.id);
//        // Set the user ID in Redux
//     });

//     // On receiving a message
//     socket.on('newMessage', (msg) => {
//       console.log('Received message:', msg);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('connect');
//       socket.off('newMessage');
//     };
//   }, [dispatch, socket]);

//   const handleSend = () => {
//     if (message.trim()) {
//       const newMessage = {
//         receiverId: '66a2cbd72114bafd1068cd68', // Use the user ID from Redux as the message ID
//         text: message,
//         senderId : '66a41561036df3a086f4ffe2',

// imgUrl :'',
//         createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       socket.emit('sendMessage', newMessage); // Send message to the server
//       console.log('Sent message:', newMessage);
//       setMessage('');
//     }
//   };


  const handleSend = () => {
 
  };

  return (
    <>
      <Box>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: isMobile ? '1.5rem' : "2rem",
          }}
        >
          Messages
        </Typography>
      </Box>
      <Paper sx={{ width: isMobile ? '100%' : '60%', margin: '20px auto', padding: '16px', borderRadius: '8px' }}>
        <Box sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px', marginBottom: '16px' }}>
          <Typography variant="h6" align="center" color="primary">Khatri Brother Academy</Typography>
        </Box>
        <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
          {/* Chat messages display */}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" borderTop="1px solid #e0e0e0" pt={1}>
          <TextField
            fullWidth
            variant="outlined"
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
  );
};

export default MessageMain;


// ---------------------defaukt-------




// import React, { useEffect, useMemo, useState } from 'react';
// import { Box, Avatar, Typography, TextField, IconButton, Paper } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { io } from 'socket.io-client';

// const MessageMain = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [file, setFile] = useState(null);
//   const [socketId, setSocketId] = useState(null);

//   const socket = useMemo(() => io('http://localhost:5000', { withCredentials: true }), []);

//   useEffect(() => {
//     socket.on('connect', () => {
//       setSocketId(socket.id);
//       console.log('connected', socket.id);
//     });

//     socket.on('disconnect', () => {
//       console.log('disconnected');
//     });

//     socket.on('receive-message', (data) => {
//       console.log(data);
//       setMessages((messages) => [...messages, data]);
//     });

//     socket.on('welcome', (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const handleSend = () => {
//     if (message.trim() || file) {
//       const newMessage = {
//         id: messages.length + 1,
//         text: message,
//         file: file ? file.name : null,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         sender: 'M',
//         senderColor: '#FFFFFF',
//         backgroundColor: '#ad1457',
//         isMine: true,
//       };
//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);
//         // Example of sending file to server, replace with your endpoint
//         fetch('http://localhost:5000/upload', {
//           method: 'POST',
//           body: formData,
//         })
//           .then(response => response.json())
//           .then(data => {
//             console.log('File upload success:', data);
//             socket.emit('message', { ...newMessage, file: data.fileName });
//             setMessages([...messages, { ...newMessage, file: data.fileName }]);
//           })
//           .catch(error => {
//             console.error('File upload error:', error);
//           });
//       } else {
//         socket.emit('message', newMessage);
//         setMessages([...messages, newMessage]);
//       }
//       setMessage('');
//       setFile(null);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const isImage = (fileName) => {
//     const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
//     const fileExtension = fileName.split('.').pop().toLowerCase();
//     return imageExtensions.includes(fileExtension);
//   };

//   return (
//     <Paper sx={{ width: '60%', margin: '20px auto', padding: '16px', borderRadius: '8px' }}>
//       <Box sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px', marginBottom: '16px' }}>
//         <Typography variant="h6" align="center" color="primary">Khatri Brother Academy</Typography>
//       </Box>
//       <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
//         <Typography align="center" color="textSecondary" variant="body2">12/02/2024</Typography>
//         {messages.map((msg) => (
//           <Box key={msg.id} display="flex" flexDirection={msg.isMine ? 'row-reverse' : 'row'} alignItems="center" my={1}>
//             <Avatar sx={{ bgcolor: msg.isMine ? '#ffb74d' : '#e57373', color: msg.senderColor }}>{msg.sender}</Avatar>
//             <Box mx={1} p={1.5} borderRadius="8px" sx={{ bgcolor: msg.backgroundColor, maxWidth: '70%' }}>
//               <Typography color="textPrimary">{msg.text}</Typography>
//               {msg.file && isImage(msg.file) && (
//                 <Box mt={1}>
//                   <img
//                     src={`http://localhost:5000/files/${msg.file}`}
//                     alt={msg.file}
//                     style={{ maxWidth: '100%', borderRadius: '8px' }}
//                   />
//                 </Box>
//               )}
//               {msg.file && !isImage(msg.file) && (
//                 <Typography color="textPrimary">
//                   <a href={`http://localhost:5000/files/${msg.file}`} target="_blank" rel="noopener noreferrer">{msg.file}</a>
//                 </Typography>
//               )}
//               <Typography color="textSecondary" variant="caption" display="block" textAlign={msg.isMine ? 'right' : 'left'}>{msg.time}</Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//       <Box display="flex" alignItems="center" justifyContent="space-between" borderTop="1px solid #e0e0e0" pt={1}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <>
//                 <input
//                   type="file"
//                   style={{ display: 'none' }}
//                   id="file-upload"
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="file-upload">
//                   <IconButton component="span">
//                     <AttachFileIcon />
//                   </IconButton>
//                 </label>
//               </>
//             ),
//           }}
//         />
//         <IconButton color="primary" onClick={handleSend}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// };

// export default MessageMain;



// import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";
// import {
//   Box,
//   Button,
//   Container,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// const MessagesMain = () => {
//   const socket = useMemo(
//     () =>
//       io("http://localhost:3000", {
//         withCredentials: true,
//       }),
//     []
//   );

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [room, setRoom] = useState("");
//   const [socketID, setSocketId] = useState("");
//   const [roomName, setRoomName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("message", { message, room });
//     setMessage("");
//   };


//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("connected", socket.id);
//     });

//     socket.on("receive-message", (data) => {
//       console.log(data);
//       setMessages((messages) => [...messages, data]);
//     });

//     socket.on("welcome", (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <Container maxWidth="sm">
//       <Box />
//       <Typography variant="h6" component="div" gutterBottom>
//         {socketID}
//       </Typography>



//       <form onSubmit={handleSubmit}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           id="outlined-basic"
//           label="Message"
//           variant="outlined"
//         />
//         {/* <TextField
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           id="outlined-basic"
//           label="Room"
//           variant="outlined"
//         /> */}
//         <Button type="submit" variant="contained" color="primary">
//           Send
//         </Button>
//       </form>

//       <Stack>
//         {messages.map((m, i) => (
//           <Typography key={i} variant="h6" component="div" gutterBottom>
//             {m}
//           </Typography>
//         ))}
//       </Stack>
//     </Container>
//   );
// };

// export default MessagesMain;