const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Welcome to the LINE login system');
});

router.get('/callback', passport.authenticate('line', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    req.session.destroy(err => {
      res.redirect('/');
    });
  });
});

module.exports = router;