import { body } from 'express-validator';
import { APPLICATION_STATUSES } from '../models/Application.js';

export const createApplicationValidator = [
  body('jobId')
    .notEmpty().withMessage('Job ID is required.')
    .isMongoId().withMessage('Invalid job ID format.'),

  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .isLength({ min: 8 }).withMessage('Please enter a valid phone number.'),

  body('resumeLink')
    .trim()
    .notEmpty().withMessage('Resume / portfolio link is required.'),

  body('coverMessage')
    .trim()
    .notEmpty().withMessage('Cover message is required.')
    .isLength({ max: 2000 }).withMessage('Cover message cannot exceed 2000 characters.'),
];

export const updateStatusValidator = [
  body('status')
    .notEmpty().withMessage('Status is required.')
    .isIn(APPLICATION_STATUSES)
    .withMessage(`Status must be one of: ${APPLICATION_STATUSES.join(', ')}.`),
];
