const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const validateRequest = require('../../middleware/validationHandler');

// validators
const {
    validateIncomeSource,
    validateIncomeSourceUpdate
  } = require('../../validators/incomeSource/incomeSourceValidator');

const { 
    validateIncomeHistory, 
    validateIncomeHistoryUpdate
  } = require('../../validators/incomeSource/incomeHistoryValidator');

// IncomeSource Controllers
const createIncomeSource = require('../../views/incomeMan/createIncomeSource');
const getIncomeSources = require('../../views/incomeMan/getIncomeSources');
const updateIncomeSource = require('../../views/incomeMan/updateIncomeSource');
const deleteIncomeSource = require('../../views/incomeMan/deleteIncomeSource');

// IncomeHistory Controllers
const createIncomeHistory = require('../../views/incomeMan/createIncomeHistory');
const getIncomeHistory = require('../../views/incomeMan/getIncomeHistory');
const updateIncomeHistory = require('../../views/incomeMan/updateIncomeHistory');
const deleteIncomeHistory = require('../../views/incomeMan/deleteIncomeHistory');

// Routes
router.post('/createIncomeSource', auth, validateIncomeSource, validateRequest, createIncomeSource);
router.get('/getIncomeSources', auth, getIncomeSources);
router.put('/updateIncomeSource/:id', auth, validateIncomeSourceUpdate, validateRequest, updateIncomeSource);
router.delete('/deleteIncomeSource/:id', auth, deleteIncomeSource);
 
router.post('/createIncomeHistory', auth, validateIncomeHistory, validateRequest, createIncomeHistory);
router.get('/getIncomeHistory/:incomeId', auth, getIncomeHistory);
router.put('/updateIncomeHistory/:id', auth, validateIncomeHistoryUpdate, validateRequest, updateIncomeHistory);
router.delete('/deleteIncomeHistory/:id', auth, deleteIncomeHistory);


module.exports = router;
