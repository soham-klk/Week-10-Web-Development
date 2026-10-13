import { Router } from 'express';
import { getProfile, updateProfile, deleteProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

// All user profile routes require authentication
router.use(authenticateUser);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

export default router;
