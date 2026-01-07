const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');
const validateRequest = require('../../middleware/validationHandler');

// Controllers
const createExpenseSource = require('../../views/expenseMan/expenseSource/create');
const getExpenseSources = require('../../views/expenseMan/expenseSource/get');
const updateExpenseSource = require('../../views/expenseMan/expenseSource/update');
const deleteExpenseSource = require('../../views/expenseMan/expenseSource/delete');
const createExpenseHistory = require('../../views/expenseMan/expenseHistory/create');
const getExpenseHistory = require('../../views/expenseMan/expenseHistory/get');
const updateExpenseHistory = require('../../views/expenseMan/expenseHistory/update');
const deleteExpenseHistory = require('../../views/expenseMan/expenseHistory/delete');
const createMonthlyExpense = require('../../views/expenseMan/monthlyExpense/create');
// Validators
const {
  validateExpenseSource,
  validateExpenseSourceUpdate,
  validateExpenseHistory,
  validateExpenseHistoryUpdate,
  validateMonthlyExpense,
  validateMonthlyExpenseUpdate
} = require('../../validators/ExpenseManagement/expenseValidator');

// Expense Source Routes
router.post('/createExpenseSource', auth, validateExpenseSource, validateRequest, createExpenseSource);
router.get('/getExpenseSources', auth, getExpenseSources);
router.put('/updateExpenseSource/:id', auth, validateExpenseSourceUpdate, validateRequest, updateExpenseSource);
router.delete('/deleteExpenseSource/:id', auth, deleteExpenseSource);

// Expense History Routes
router.post('/createExpenseHistory', auth, validateExpenseHistory, validateRequest, createExpenseHistory);
router.get('/getExpenseHistory/:expenseSource', auth, getExpenseHistory);
router.put('/updateExpenseHistory/:id', auth, validateExpenseHistoryUpdate, validateRequest, updateExpenseHistory);
router.delete('/deleteExpenseHistory/:id', auth, deleteExpenseHistory);

router.post('/createMonthlyExpense', auth, validateMonthlyExpense, validateRequest, createMonthlyExpense);

module.exports = router;