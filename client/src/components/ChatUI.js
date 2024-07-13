import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'

const ChatUI = () => {
  const socket = React.useContext(SocketContext);
  useEffect(()=>{
    socket.on('receive_message', (data) => {
      console.log(data);
    });
    return () => socket.off('receive_message');
  })
  return (
    <div>
       
    </div>
  )
}

export default ChatUI