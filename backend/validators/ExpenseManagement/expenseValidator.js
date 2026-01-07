const { body } = require('express-validator');

exports.validateExpenseSource = [
  body('name').notEmpty().withMessage('Name is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
  body('category').notEmpty().withMessage('Category is required'),
  body('startDate').isISO8601().toDate().withMessage('Start date must be valid'),
  body('type').optional().isIn(['fixed', 'variable']),
  body('frequency').optional().isIn(['once', 'rarely', 'monthly', 'weekly', 'bi-weekly', 'quarterly']),
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
  body('frequency').optional().isIn(['once', 'rarely', 'monthly', 'weekly', 'bi-weekly', 'quarterly']),
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

exports.validateMonthlyExpense = [
  body('month')
    .notEmpty()
    .withMessage('Month is required')
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/)
    .withMessage('Month must be in YYYY-MM format'),

  body('items')
    .optional()
    .isArray()
    .withMessage('Items must be an array'),

  body('items.*.name')
    .if(body('items').exists())
    .notEmpty()
    .withMessage('Item name is required'),

  body('items.*.category')
    .if(body('items').exists())
    .notEmpty()
    .withMessage('Category is required'),

  body('items.*.actualAmount')
    .if(body('items').exists())
    .isFloat({ gt: 0 })
    .withMessage('Actual amount must be greater than 0'),

  body('items.*.type')
    .optional()
    .isIn(['fixed', 'variable'])
];


exports.validateMonthlyExpenseUpdate = [
  body('month')
    .not()
    .exists()
    .withMessage('Month cannot be updated'),

  body('totalAmount')
    .not()
    .exists()
    .withMessage('Total amount is auto-calculated'),

  body('user')
    .not()
    .exists()
    .withMessage('User cannot be changed'),

  body('items')
    .optional()
    .isArray()
    .withMessage('Items must be an array'),

  body('items.*.name')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Item name must be a non-empty string'),

  body('items.*.category')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Category must be a non-empty string'),

  body('items.*.actualAmount')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Actual amount must be greater than 0'),

  body('items.*.type')
    .optional()
    .isIn(['fixed', 'variable'])
    .withMessage('Type must be fixed or variable'),

  body('items.*.notes')
    .optional()
    .isString()
];
