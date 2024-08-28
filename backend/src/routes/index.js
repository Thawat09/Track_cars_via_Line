const router = require("express").Router();
const config = require("../config/app");

router.use(`/api/v${config.apiVersion}/auth`, require('../routes/auth'));

router.get('/', (req, res) => {
    res.send('Welcome to the LINE login system');
});

module.exports = router;