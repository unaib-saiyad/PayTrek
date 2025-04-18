const express = require('express');
const router = express.Router();
const createUser = require('../views/auth/createUser');
const isValidUserDetails = require('../middleware/auth/createUser');
const login = require('../views/auth/login');
const isValidLogin = require('../middleware/auth/login');


router.post('/createuser', isValidUserDetails, createUser);
router.post('/login', isValidLogin, login);

router.use('/incomeManagement', require('./incomeMan/incomeMan.js'));
router.use('/expenseManagement', require('./expenseMan/expenseMan.js'));


// Export the router
module.exports = router;
