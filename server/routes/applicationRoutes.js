import { Router } from 'express';
import {
  createApplication,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';
import {
  createApplicationValidator,
  updateStatusValidator,
} from '../validators/applicationValidators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();

// All application routes require authentication
router.use(authenticateUser);

// Candidate applies for a job
router.post('/', authorizeRole('candidate'), createApplicationValidator, validate, createApplication);

// Candidate views own applications
router.get('/my', getMyApplications);

// View specific application (access controlled inside controller)
router.get('/:id', getApplicationById);

// Update application status — recruiter or admin only
router.put('/:id/status', authorizeRole('recruiter', 'admin'), updateStatusValidator, validate, updateApplicationStatus);

// Delete application — candidate (own) or admin
router.delete('/:id', deleteApplication);

export default router;
