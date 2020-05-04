const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = normalizePort(process.env.PORT || '3001');

app.set('port', port);

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.use(function (req, res, next) {
  // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(indexRouter);

io.on('connection', (socket) => {
  /*
  socket.on('join', async room => {
    socket.join(room);
    io.emit('roomJoined', room);
  });
  */
  /*
   socket.on('message', data => {
     io.emit('newMessage', data);
   });
   */
  console.log('client connected');
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

app.listen(port, () => console.log(`server running on port ${port}`));