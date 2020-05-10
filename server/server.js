const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const server = require('http').Server(app);
const path = require('path');
const apiRouter = require('./api/index');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave
} = require('./utils/users');

const messages = [];
let messageCount = 0;
let userCount = 0;
const bot = 'Abel';

// DEV
//const io = require('socket.io')(server);
// PROD
///*
const io = require('socket.io')(server, {
  path: '/socketio'
});
//*/

// PORTS for dev and prod
// dev = 3001
// prod = 3000
const port = normalizePort(process.env.PORT || 3000);
//

/// MIDDLEWARE for prod 
///*
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
//*/

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', apiRouter);

io.on('connection', (socket) => {

  socket.on('join room', (username, room) => {
    const user = userJoin(socket.id, username, room);

    //console.log(socket.id, user.username, room);

    socket.join(user.room);

    // Emit message connecting user
    socket.emit('message', formatMessage(bot, 'Welcome to the chat.'));

    // Emit message to all users
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(bot, `${user.username} has joined ${user.room}`));

    io.to(user.room).emit('room users', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  /* Listen for a message
  socket.on('message', data => {
    // Send the message to all users
    console.log(`data ${data}`);
    io.emit('message', data);
  });
  */
  socket.on('new message', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(bot, `${user.username} has left`)
      );
      io.to(user.room).emit('room users', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

server.listen(port, () => console.log(`server running on port ${port}`));