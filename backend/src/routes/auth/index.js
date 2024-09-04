const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Welcome to the LINE login system');
});

module.exports = router;