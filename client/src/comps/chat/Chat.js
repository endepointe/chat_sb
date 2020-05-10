import React, {
  useEffect,
} from 'react';
import './Chat.css';
import io from 'socket.io-client';

/* Use when in dev, otherwise, comment out
const url = 'http://localhost:3001';
const socket = io(url);
*/

///*
const socket = io('/', {
  secure: true,
  rejectUnauthorized: false,
  path: '/socketio'
});
//*/

// name and room
const Chat = (props) => {

  useEffect(() => {
    socket.emit('join room', props.name, props.room);
    socket.on('message', (data) => {
      const el = document.getElementById('messages');
      postMessage(data.username, data.message, data.time);
      //console.log(data);
      el.scrollTop = el.scrollHeight;
    });
    socket.on('room users', ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });
  });

  const outputRoomName = (room) => {
    document.getElementById('roomName').innerText = room;
  }

  const outputUsers = (users) => {
    document.getElementById('userList').innerHTML = `
    ${users.map(user =>
      `<li>${user.username}</li>`).join('')}
    `;
  }

  const clearMessage = (e) => {
    e.target.elements.chatInput.value = '';
    e.target.elements.chatInput.focus();
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = e.target.elements.chatInput.value;

    // Emit message to server
    socket.emit('new message', msg);

    clearMessage(e);
  }

  const postMessage = (n, m, t) => {
    const msg = document.createElement('li');
    const msgs = document.getElementById('messages');
    msg.classList.add('chat-msg');
    msg.textContent = `[${t}] ${n}:  ${m}.`;
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
  }

  return (
    <div className='chat-container'>
      <h1>Room: <span id='roomName'></span></h1>
      <h2>Users: </h2>
      <ul id="userList"></ul>

      <h3>messages:</h3>
      <div id="chat-box">
        <ul id="messages"></ul>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id='chatInput'
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat;