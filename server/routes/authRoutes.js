import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', authenticateUser, getMe);
router.post('/logout', authenticateUser, logout);

export default router;
