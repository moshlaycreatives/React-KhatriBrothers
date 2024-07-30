import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { getAllUsers } from '../../../store/actions/authActions';

const MessageMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const [msgsData, setMsgsData] = useState([]);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const socket = useMemo(() => io("https://wv9pfwh9-4545.inc1.devtunnels.ms"), []);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers())
      .then(users => {
        setAllUsers(users.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    socket.on('getUsers', (msgs) => {
      console.log(msgs);
    });

    socket.on('userMsgs', (res) => {
      setMsgsData(res?.messages);
      console.log(res, 'res');

    });
  }, []);

  useEffect(() => {
    socket.on('getMessage', (res) => {
      console.log(res, 'get msggggg');

    });
  }, []);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
    });

    socket.on('getMessage', (msg) => {
      console.log(msg, 'msss')
      setMessage((prevMessage) => [...prevMessage, msg]);

    });

    return () => {
      socket.off('connect');
      socket.off('getMessage');
    };
  }, []);



  const handleSend = () => {
    if (message.trim() && receiverId) {
      const newMessage = {
        receiverId,
        text: message,
        senderId: userId,
        imgUrl: '',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('sendMessage', newMessage);
      setMessage((prevMessage) => [...prevMessage, newMessage]);
      setMessage('');
    }
  };



  const handleSelectChat = (id) => {
    socket.emit('addUser', userId, id);
    setReceiverId(id);
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Box>
          {allUsers.map((val) => (
            <Box
              key={val._id}
              onClick={()=>handleSelectChat(val._id)}
              sx={{
                cursor: 'pointer',
                padding: '8px',
                '&:hover': { backgroundColor: '#f0f0f0' },
                backgroundColor: receiverId === val._id ? '#f0f0f0' : 'transparent',
              }}
            >
              <Typography
                sx={{
                  color: receiverId === val._id ? 'red' : 'inherit',
                  fontWeight: receiverId === val._id ? 'bold' : 'normal',
                }}
              >
                {val.firstName}
              </Typography>
            </Box>
          ))}
        </Box>

        <Paper sx={{ width: isMobile ? '100%' : '60%', margin: '20px auto', padding: '16px', borderRadius: '8px' }}>
          <Box sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px', marginBottom: '16px' }}>
            <Typography variant="h6" align="center" color="primary">Khatri Brother Academy</Typography>
          </Box>
          <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px', padding: '8px' }}>
            {msgsData?.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === userId ? 'flex-end' : 'flex-start',
                  marginBottom: '8px'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: msg?.sender === userId ? theme.palette.primary.main : '#dfb3cc',
                    color: msg?.sender === userId ? 'white' : theme.palette.primary.main,
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '60%',
                    wordWrap: 'break-word',
                  }}
                >
                  <Typography variant="body2">{msg?.message}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: '4px' }}>
                    {msg?.createdAt}
                  </Typography>
                </Box>
              </Box>
            ))}
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
      </Box>
    </>
  );
};

export default MessageMain;