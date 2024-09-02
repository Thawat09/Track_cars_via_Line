const router = require("express").Router();
const config = require("../config/app");
const passport = require('../middleware/passport');

router.get('/', (req, res) => {
    res.send('Welcome to the LINE login system');
});

router.use(`/api/v${config.apiVersion}/auth`, passport.initialize(), passport.session(), require('../routes/auth'));

module.exports = router;