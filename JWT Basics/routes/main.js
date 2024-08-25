const express = require('express');
const router = express.Router();
const { login, dashboard, signup } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authMiddleware,dashboard)
router.route('/login').post(login)
router.route('/signup').put(signup)

module.exports = router;