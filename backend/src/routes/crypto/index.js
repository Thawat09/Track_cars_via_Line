const express = require('express');
const router = express.Router();
const cryptoController = require('../../controller/crypto/crypto.controller');

router.post('/encrypted-data', cryptoController.encryptedData);
router.post('/decrypted-data', cryptoController.decryptedData);

module.exports = router;