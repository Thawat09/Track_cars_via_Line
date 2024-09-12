const express = require('express');
const router = express.Router();
const testController = require('../../controller/test/test.controller');

router.post('/test', testController.test);

module.exports = router;