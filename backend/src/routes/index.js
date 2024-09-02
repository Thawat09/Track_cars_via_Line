const router = require("express").Router();
const config = require("../config/app");

router.get(['/', `/api/${config.apiVersion}/`], (req, res) => {
    res.send('Welcome to the LINE system');
});

router.use(`/api/v${config.apiVersion}/auth`, require('../routes/auth'));

module.exports = router;