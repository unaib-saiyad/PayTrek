const express = require('express');
const router = express.Router();
const createUser = require('../views/auth/createUser');
const isValidUserDetails = require('../middleware/auth/createUser');
const login = require('../views/auth/login');
const fetchUser = require('../views/auth/fetchUser');
const updateUser = require('../views/auth/updateUser');
const deleteUser = require('../views/auth/deleteUser');

const isValidLogin = require('../middleware/auth/login');
const auth = require('../middleware/auth/auth');


router.post('/createuser', isValidUserDetails, createUser);
router.post('/login', isValidLogin, login);
router.get('/fetchUser', auth, fetchUser);
router.put('/updateUser', auth, updateUser);
router.delete('/deleteUser', auth, deleteUser);

router.use('/incomeManagement', require('./incomeMan/incomeMan.js'));
router.use('/expenseManagement', require('./expenseMan/expenseMan.js'));


// Export the router
module.exports = router;
