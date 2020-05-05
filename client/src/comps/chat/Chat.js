import React, {
  useState,
  useEffect,
} from 'react';
import './Chat.css';
import io from 'socket.io-client';

const url = 'http://localhost:3001';
const socket = io(url);

const Chat = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('new message', (data) => {
      postMessage(data);
    });
  });

  const handleChange = (e) => {
  }

  const clearMessage = () => {
    document.getElementById('chat-input').value = '';
    setMessage('');
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = document.getElementById('chat-input').value;
    setMessage(msg);
    socket.emit('message', msg);
    //postMessage(msg);
    clearMessage();
  }

  const postMessage = (m) => {
    let msg = document.createElement('li');
    msg.textContent = m;
    document.getElementById('messages').appendChild(msg);
  }

  return (
    <div className='chat-container'>
      <div id="chat-box">
        <ul id="messages"></ul>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id='chat-input'
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat;