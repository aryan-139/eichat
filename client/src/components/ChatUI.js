import React, { useEffect, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Box, Paper, Typography } from '@mui/material';
import { formatDateTime } from '../utils/formatDateTime';

const ChatUI = ({ username, room }) => {
  const socket = React.useContext(SocketContext);
  const [messageArray, setMessageArray] = React.useState([]);
  const messagesEndRef = useRef(null);
  const [dayState, setDayState] = React.useState('TODAY');

  // const sendSoundRef=useRef(null);
  // const receiveSoundRef=useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log('Received message:', data);
      // if (sendSoundRef.current) {
      //   sendSoundRef.current.play();
      // }
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [socket]);

  // Fetch last 100 messages
  useEffect(() => {
    socket.on('receive_group_chats', (chats) => {
      const formattedChats = chats.map((chat) => ({
        user: chat.from_user,
        message: chat.message,
        createdtime: chat.sent_time,
      }));
      console.log(formattedChats);
      setMessageArray(formattedChats.reverse());
    });

    return () => socket.off('receive_group_chats');
  }, [socket]);

  // Scroll to bottom when messageArray changes
  useEffect(() => {
    scrollToBottom();
  }, [messageArray]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  

  return (
    
    <Box sx={{ marginLeft:12, marginRight:12, marginBottom: 5, marginTop:5, }}>
      {/* <audio ref={sendSoundRef} src="../../public/message_sent.mp3"/>
      <audio ref={receiveSoundRef} src="../../public/message_received.mp3"/> */}
      <Typography variant="body2" sx={{padding:'2px 8px',borderRadius:'12px',fontSize:'0.9rem',color:'#4A4A4A', marginBottom: 2, justifyContent:'center',display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {dayState} </Typography>
      <Box sx={{ maxHeight: '70vh', overflowY: 'auto', marginBottom: 2, minHeight: '65vh' }}>
        {messageArray.map((message, index) => {
          const isOwnMessage = message.user === username;
          return (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', marginBottom: 1 }}>
              <Paper sx={{ padding: 1, backgroundColor: isOwnMessage ? '#cce5ff' : '#f1f1f1', maxWidth: '80%' }}>
                <Typography variant="body2">
                  <strong>{isOwnMessage ? 'You' : message.user}:</strong> {message.message}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                {formatDateTime(message.createdtime)}
                </Typography>
              </Paper>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatUI;
