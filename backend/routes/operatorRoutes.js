const express = require('express');
const { operatorLogin, updateOperatorCode } = require('../controllers/operatorController');
const router = express.Router();

router.post('/login', operatorLogin);
router.post('/update-code', updateOperatorCode);

module.exports = router;
