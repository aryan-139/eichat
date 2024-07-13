import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'

const ChatUI = ({username, room}) => {
  const socket = React.useContext(SocketContext);
  const [messageArray, setMessageArray]=React.useState([]);

  useEffect(()=>{
    socket.on('receive_message', (data) => {
      setMessageArray([...messageArray, data]);
    });
    return () => socket.off('receive_message');
  })
  return (
    <div>
      <Box>
      {messageArray.map((message, index) => {
          const userName = message.user === username ? 'You' : message.user;
          return (
            <div key={index}>
              <p>{userName} : {message.message}</p>
              <p>{message.createdtime}</p>
            </div>
          );
        })}
      </Box> 
    </div>
  )
}

export default ChatUI