const { body } = require('express-validator');

exports.validateExpenseSource = [
  body('name').notEmpty().withMessage('Name is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
  body('category').notEmpty().withMessage('Category is required'),
  body('startDate').isISO8601().toDate().withMessage('Start date must be valid'),
  body('type').optional().isIn(['fixed', 'variable']),
  body('frequency').optional().isIn(['monthly', 'weekly', 'bi-weekly', 'quarterly']),
  body('currency').optional().isLength({ min: 3, max: 3 }),
  body('isRecurring').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
  body('notes').optional().isString()
];

exports.validateExpenseSourceUpdate = [
  body('name').optional().isString(),
  body('amount').optional().isFloat({ gt: 0 }),
  body('category').optional().isString(),
  body('startDate').optional().isISO8601().toDate(),
  body('type').optional().isIn(['fixed', 'variable']),
  body('frequency').optional().isIn(['monthly', 'weekly', 'bi-weekly', 'quarterly']),
  body('currency').optional().isLength({ min: 3, max: 3 }),
  body('isRecurring').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
  body('notes').optional().isString()
];

exports.validateExpenseHistory = [
  body('expenseSource').notEmpty().withMessage('ExpenseSource is required'),
  body('month').notEmpty().withMessage('Month is required (format: YYYY-MM)'),
  body('actualAmount').isFloat({ gt: 0 }).withMessage('Actual amount must be a number'),
  body('adjustment').optional().isNumeric(),
  body('reason').optional().isString(),
  body('notes').optional().isString()
];

exports.validateExpenseHistoryUpdate = [
  body('expenseSource').optional().isMongoId(),
  body('month').optional().isString(),
  body('actualAmount').optional().isFloat({ gt: 0 }),
  body('adjustment').optional().isNumeric(),
  body('reason').optional().isString(),
  body('notes').optional().isString()
];