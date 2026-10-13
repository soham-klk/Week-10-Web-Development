import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';
import {
  createJobValidator,
  updateJobValidator,
  jobQueryValidator,
} from '../validators/jobValidators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();

// Public routes
router.get('/', jobQueryValidator, validate, getAllJobs);
router.get('/:id', getJobById);

// Protected routes
router.post(
  '/',
  authenticateUser,
  authorizeRole('recruiter', 'admin'),
  createJobValidator,
  validate,
  createJob
);

router.put(
  '/:id',
  authenticateUser,
  authorizeRole('recruiter', 'admin'),
  updateJobValidator,
  validate,
  updateJob
);

router.delete(
  '/:id',
  authenticateUser,
  authorizeRole('recruiter', 'admin'),
  deleteJob
);

export default router;
