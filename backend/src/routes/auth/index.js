const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth/auth.controller');

router.post('/login', authController.login);

module.exports = router;