const { body, validationResult } = require("express-validator");


const isValidLogin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be empty!...').exists(),
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = isValidLogin;
