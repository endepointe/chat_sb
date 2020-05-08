const express = require('express');
const router = express.Router();

/*
router.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})
*/

router.get('/login', (req, res) => {
  res.send(req.path);
});

router.get('/users', (req, res) => {
  const data = { route: req.path, ip: req.ip, time: Date.now() }
  res.send(data);
  //console.log(req);
});

module.exports = router;