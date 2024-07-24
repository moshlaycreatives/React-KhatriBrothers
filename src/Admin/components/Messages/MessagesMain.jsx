import React, { useState } from 'react';
import { Box, Avatar, Typography, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const messagesData = [
  { id: 1, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:1000000 pm', sender: 'M', senderColor: '#000000', backgroundColor: '#e57373', isMine: false },
  { id: 2, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#ad1457', isMine: true },


  { id: 3, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#e57373', isMine: false },
  { id: 4, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#ad1457', isMine: true },
  { id: 1, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#e57373', isMine: false },
  { id: 2, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#ad1457', isMine: true },
  { id: 1, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#e57373', isMine: false },
  { id: 2, text: 'Lorem ipsum dolor sit amet, cons ectetur adipiscing elit', time: '6:10 pm', sender: 'M', senderColor: '#FFFFFF', backgroundColor: '#ad1457', isMine: true },


];

const MessageMain = () => {
  const [messages, setMessages] = useState(messagesData);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'M',
        senderColor: '#FFFFFF',
        backgroundColor: '#ad1457',
        isMine: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Paper  sx={{ width: '60%', margin: '20px auto', padding: '16px', borderRadius: '8px' }}>
      <Box sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px', marginBottom: '16px' }}>
        <Typography variant="h6" align="center" color="primary">Khatri Brother Academy</Typography>
      </Box>
      <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
        <Typography align="center" color="textSecondary" variant="body2">12/02/2024</Typography>
        {messages.map((msg) => (
          <Box key={msg.id} display="flex" flexDirection={msg.isMine ? 'row-reverse' : 'row'} alignItems="center" my={1}>
            <Avatar sx={{ bgcolor: msg.isMine ? '#ffb74d' : '#e57373', color: msg.senderColor }}>{msg.sender}</Avatar>
            <Box mx={1} p={1.5} borderRadius="8px" sx={{ bgcolor: msg.backgroundColor, maxWidth: '70%' }}>
              <Typography color="textPrimary">{msg.text}</Typography>
              <Typography color="textSecondary" variant="caption" display="block" textAlign={msg.isMine ? 'right' : 'left'}>{msg.time}</Typography>
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
  );
};

export default MessageMain;
