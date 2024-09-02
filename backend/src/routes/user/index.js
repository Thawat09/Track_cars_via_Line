const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../../controller/user/user.controller');

router.post('/create-user', userController.createUser);

module.exports = router;