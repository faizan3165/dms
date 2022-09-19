import { check } from 'express-validator';

export const validateRegister = [
    check('email')
        .exists()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Invalid email format')
        .trim(),

	check('password')
		.exists()
		.withMessage('Password cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Password must be at least 3 characters long'),

    check('confirmPassword')
        .exists()
        .withMessage('Passwords do not match.')
        .custom((value, { req }) => {
		    return value === req.body.confirmPassword;
	})
];
