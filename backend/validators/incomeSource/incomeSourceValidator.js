const { body } = require("express-validator");

exports.validateIncomeSource = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a number greater than 0"),

  body("startDate")
    .optional({ checkFalsy: true }) 
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .optional({ checkFalsy: true }) // skip validation if empty, null, undefined
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date"),

  body("type")
    .optional()
    .isIn(["fixed", "variable"])
    .withMessage("Type must be fixed or variable"),

  body("frequency")
    .optional()
    .isIn(["monthly", "weekly", "bi-weekly", "quarterly"])
    .withMessage("Invalid frequency"),

  body("currency")
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be 3-letter code"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  body("taxable")
    .optional()
    .isBoolean()
    .withMessage("taxable must be a boolean"),

  body("notes")
    .optional()
    .isString()
];


exports.validateIncomeSourceUpdate = [
  body('name').optional().isString(),
  body('amount').optional().isFloat({ gt: 0 }).withMessage("Amount must be a number > 0"),
  body('category').optional().isString(),
  body('startDate').optional().isISO8601().toDate().withMessage("Start date must be a valid date"),
  body('type').optional().isIn(['fixed', 'variable']),
  body('frequency').optional().isIn(['monthly', 'weekly', 'bi-weekly', 'quarterly']),
  body('currency').optional().isLength({ min: 3, max: 3 }),
  body('isActive').optional().isBoolean(),
  body('taxable').optional().isBoolean(),
  body('notes').optional().isString()
];
