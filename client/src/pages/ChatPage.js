import React from 'react';
import { useLocation } from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';
import { useState, useEffect } from 'react';
import ChatDrawer from '../components/ChatDrawer';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  const location = useLocation();
  const { userName, room } = location.state || {};
  const socket=React.useContext(SocketContext);
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

 //receives message from the sockets
 useEffect(() => {
  socket.on('receive_message', (data) => {
    setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  });
  return () => socket.off('receive_message');
}, [socket]);

//total chatroom users
useEffect(() => {
  socket.on('chatroom_users', (data) => {
    setRoomUsers(data);
  });

  return () => socket.off('chatroom_users');
}, [socket]);

  return (
    <div>
      <ChatDrawer roomUsers={roomUsers}/>
      <ChatBox roomName={"TEST ROOM"} messagesReceived={messagesReceived}/>
      {/* {messagesReceived.map((msg, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{msg.username}</span>
            
          </div>
          <p>{msg.message}</p>
          <br />
        </div>
      ))} */}
    </div>
  );
};

export default ChatPage;
