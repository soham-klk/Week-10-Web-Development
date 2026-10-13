import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 60 }).withMessage('Name must be 2–60 characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),

  // Role is NOT accepted from the client for security — default is candidate.
  // Admins must be created via a seeding script or internal mechanism.
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.'),
];
