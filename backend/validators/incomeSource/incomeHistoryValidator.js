const { body } = require('express-validator');

exports.validateIncomeHistory = [
  body('incomeSource').notEmpty().withMessage('incomeSource is required'),
  body('month').notEmpty().withMessage('Month is required (format: YYYY-MM)'),
  body('adjustment').optional().isNumeric().withMessage('Adjustment must be a number'),
  body('reason').optional().isString(),
  body('inHandAmount').optional().isNumeric().withMessage('In-hand amount must be a number'),
];

exports.validateIncomeHistoryUpdate = [
  body('incomeSource').optional().isMongoId().withMessage('Invalid incomeSource ID'),
  body('month').optional().isString().withMessage('Month must be a string (format: YYYY-MM)'),
  body('adjustment').optional().isNumeric().withMessage('Adjustment must be a number'),
  body('reason').optional().isString(),
  body('inHandAmount').optional().isNumeric().withMessage('In-hand amount must be a number'),
];