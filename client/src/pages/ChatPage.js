import React from 'react';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const { userName, room } = location.state || {};

  return (
    <div>
      <h1>Chat Page</h1>
      <p>User Name: {userName}</p>
      <p>Room: {room}</p>
    </div>
  );
};

export default ChatPage;
