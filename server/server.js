const express = require('express');
const app = express();
const server = require('http').Server(app);
//const io = require('socket.io')(server);
///*
const io = require('socket.io')(server, {
  path: '/chat'
});
//*/
const path = require('path');
const cors = require('cors');
const messages = [];
let messageCount = 0;
const bot = 'Abel';

// Use this when in prod
const port = normalizePort(process.env.PORT || '3000');
//

// Use this when in dev 
//const port = normalizePort(process.env.PORT || '3001');
//

//const indexRouter = require('./routes/index');

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//app.use(indexRouter);

io.on('connection', (socket) => {
  console.log('client connected');

  socket.on('message', data => {
    messages.push(data);
    io.emit('new message', data);
    console.log(messages[messageCount]);
    messageCount++;
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
    console.log(messages);
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