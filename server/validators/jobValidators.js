import { body, query } from 'express-validator';

export const createJobValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required.')
    .isLength({ min: 3, max: 120 }).withMessage('Title must be 3–120 characters.'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required.')
    .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters.'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required.'),

  body('workType')
    .notEmpty().withMessage('Work type is required.')
    .isIn(['Remote', 'Hybrid', 'On-site']).withMessage('Work type must be Remote, Hybrid, or On-site.'),

  body('deadline')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage('Deadline must be a valid ISO 8601 date.'),

  body('openings')
    .optional()
    .isInt({ min: 1 }).withMessage('Openings must be at least 1.'),

  body('salaryAmount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Salary amount must be a non-negative number.'),
];

export const updateJobValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 120 }).withMessage('Title must be 3–120 characters.'),

  body('workType')
    .optional()
    .isIn(['Remote', 'Hybrid', 'On-site']).withMessage('Work type must be Remote, Hybrid, or On-site.'),

  body('deadline')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage('Deadline must be a valid ISO 8601 date.'),

  body('openings')
    .optional()
    .isInt({ min: 1 }).withMessage('Openings must be at least 1.'),
];

export const jobQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50.'),

  query('sort')
    .optional()
    .isIn(['newest', 'oldest', 'deadline']).withMessage('Sort must be newest, oldest, or deadline.'),
];
