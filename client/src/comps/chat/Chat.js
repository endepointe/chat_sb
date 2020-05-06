import React, {
  useEffect,
} from 'react';
import './Chat.css';
import io from 'socket.io-client';

//const url = 'http://localhost:3001';

const socket = io('/', {
  secure: true,
  rejectUnauthorized: false,
  path: '/chat'
});

const Chat = () => {

  useEffect(() => {
    socket.on('new message', (data) => {
      postMessage(data);
    });
  });

  const clearMessage = () => {
    document.getElementById('chat-input').value = '';
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = document.getElementById('chat-input').value;
    socket.emit('message', msg);
    console.log(msg);
    clearMessage();
  }

  const postMessage = (m) => {
    const msg = document.createElement('li');
    msg.textContent = m;
    document.getElementById('messages').appendChild(msg);
  }

  return (
    <div className='chat-container'>
      <h1>Anon Chat</h1>
      <h3>messages:</h3>
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