const { body, validationResult } = require("express-validator");

const validateJobAnalysis = [
    body("jobTitle")
        .trim()
        .notEmpty()
        .withMessage("Job title is required")
        .isLength({ max: 150 })
        .withMessage("Job title cannot exceed 150 characters"),

    body("companyName")
        .trim()
        .notEmpty()
        .withMessage("Company name is required")
        .isLength({ max: 150 })
        .withMessage("Company name cannot exceed 150 characters"),

    body("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job description is required")
        .isLength({ min: 20, max: 10000 })
        .withMessage("Job description must be between 20 and 10000 characters"),

    body("companyWebsite")
        .custom((value) => {
            // Website is optional
            if (!value || value.trim() === "") {
                return true;
            }

            // If provided, it must be a valid URL
            try {
                new URL(value);
                return true;
            } catch {
                throw new Error("Company website must be a valid URL");
            }
        }),

    body("salary")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Salary cannot exceed 100 characters"),

    body("location")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Location cannot exceed 150 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = {
    validateJobAnalysis
};