const express = require('express');
const router = express.Router();
const createUser = require('../views/auth/createUser');
const isValidUserDetails = require('../middleware/auth/createUser');
const login = require('../views/auth/login');
const fetchUser = require('../views/auth/fetchUser');


const isValidLogin = require('../middleware/auth/login');
const auth = require('../middleware/auth/auth');


router.post('/createuser', isValidUserDetails, createUser);
router.post('/login', isValidLogin, login);
router.get('/fetchUser', auth, fetchUser);

router.use('/incomeManagement', require('./incomeMan/incomeMan.js'));
router.use('/expenseManagement', require('./expenseMan/expenseMan.js'));


// Export the router
module.exports = router;
