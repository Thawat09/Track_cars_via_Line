const express = require('express');
const router = express.Router();
const userController = require('../../controller/user/user.controller');

router.post('/create-user', userController.createUser);
router.get('/get-user-all', userController.getAllUsers);
router.get('/get-user-one', userController.getOneUsers);

module.exports = router;