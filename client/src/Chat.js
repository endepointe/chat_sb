import React, {
  useState,
  useEffect,
} from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:3001';
const socket = io(url);

const Chat = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessage();
  })

  const getMessage = () => {
    socket.on('connection', () => {
      socket.emit('message', message);
    })
    console.log(message);
  }

  return (
    <form>
      <input type="text" />
      <button onClick={setMessage}>Send</button>
    </form>
  )
}

export default Chat;