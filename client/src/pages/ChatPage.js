import React from 'react';
import { useLocation } from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';
import { useState, useEffect } from 'react';

const ChatPage = () => {
  const location = useLocation();
  const { userName, room } = location.state || {};
  const socket=React.useContext(SocketContext);
  const [messagesReceived, setMessagesReceived] = useState([]);
  console.log('Socket:', socket);

 // Runs whenever a socket event is received from the server
 useEffect(() => {
  socket.on('receive_message', (data) => {
    console.log(data);
    setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  });

  // Remove event listener on component unmount
  return () => socket.off('receive_message');
}, [socket]);


  return (
    <div>
      <h1>Chat Page</h1>
      {messagesReceived.map((msg, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{msg.username}</span>
            
          </div>
          <p>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
