const express = require('express');
const { register, login, getUserInfo } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getUserInfo); 

module.exports = router;
