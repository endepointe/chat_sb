const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Ende', message: 'Ende' });
});

router.get('/chat', (req, res) => {
  res.send('chat');
  console.log('chat');
});


module.exports = router;