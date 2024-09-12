const router = require("express").Router();
const config = require("../config/app");

router.get(['/', `/api/${config.apiVersion}/`], (req, res) => {
    res.send('Welcome to the LINE system');
});

router.use(`/api/v${config.apiVersion}/auth`, require('../routes/auth'));

router.use(`/api/v${config.apiVersion}/user`, require('../routes/user'));

router.use(`/api/v${config.apiVersion}/crypto`, require('../routes/crypto'));

router.use(`/api/v${config.apiVersion}/test`, require('../routes/test'));

module.exports = router;