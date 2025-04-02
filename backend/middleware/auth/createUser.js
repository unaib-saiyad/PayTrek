const { body, validationResult } = require("express-validator");


const isValidUserDetails = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("tag").notEmpty().withMessage("Tag is required"),
    body("profileImage")
        .isURL()
        .withMessage("Profile image must be a valid URL"), // Profile image must be a URL
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = isValidUserDetails;
