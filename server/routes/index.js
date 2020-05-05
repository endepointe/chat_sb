const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router.get('/', (req, res) => {
  const data = { name: "dataname", value: "datavalue" }
  res.send(data);
});

router.get('/chat', (req, res) => {
  res.send('chat');
});


module.exports = router;