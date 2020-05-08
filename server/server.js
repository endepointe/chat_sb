const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const server = require('http').Server(app);
const path = require('path');
const apiRouter = require('./api/index');
const messages = [];
let messageCount = 0;
let userCount = 0;
const bot = 'Abel';

// DEV
const io = require('socket.io')(server);
// PROD
/*
const io = require('socket.io')(server, {
  path: '/socketio'
});
*/

// PORTS for dev and prod
// dev = 3001
// prod = 3000
const port = normalizePort(process.env.PORT || 3001);
//

///* MIDDLEWARE for prod 
/*
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
*/

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', apiRouter);

io.on('connection', (socket) => {
  userCount++;
  console.log(`user count ${userCount}`);
  socket.on('message', data => {
    messages.push(data);
    io.emit('new message', data);
    //console.log(messages[messageCount]);
    messageCount++;
  });

  socket.on('disconnect', () => {
    //console.log(messages);
    userCount--;
    console.log(`user count ${userCount}`);
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