import React from 'react'
import { SocketContext } from '../context/SocketContext';

const SendMessage = ({username,room}) => {
  //inputText is storing the message value
  const [inputText, setInputText] = React.useState('');
  const socket=React.useContext(SocketContext);

  function SendMessage(e) {
    e.preventDefault();
    if (inputText) {
      const user = username;
      //console.log({username, room, message: inputText, createdtime: new Date().toISOString()})
      socket.emit('send_message', {user, room, message: inputText, createdtime: new Date().toLocaleTimeString()});
      setInputText('');
    }
  }
  function handleInputChange(e) {
    setInputText(e.target.value);
  }
  return (
    <div>
        <div className="chat-input">
            <input type="text" placeholder="Type a message..." onChange={handleInputChange} />
            <button onClick={SendMessage}>Send</button>
        </div>
    </div>
  )
}

export default SendMessage