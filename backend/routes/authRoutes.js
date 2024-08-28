const express = require('express');
const { register, login, getUserInfo, updatePassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getUserInfo);
router.post('/update-password', updatePassword); 

module.exports = router;
