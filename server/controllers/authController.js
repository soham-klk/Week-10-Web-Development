import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Generate signed JWT for a user
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * POST /api/auth/register
 * Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Role is always set to 'candidate' on self-registration — never trust client
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const user = await User.create({ name, email, password, role: 'candidate' });
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Welcome to DG Interns Hub!',
      data: {
        token,
        user: user.toSafeObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Explicitly select password for comparison
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      // Generic message to prevent user enumeration
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: user.toSafeObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Protected
 */
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Authenticated user retrieved.',
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Protected
 * Strategy: Stateless JWT — client discards token. Server acknowledges.
 * For revocation, a token blacklist (Redis) would be needed.
 */
export const logout = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message:
        'Logged out successfully. Please remove the token from your client storage. ' +
        '(Stateless JWT: token will expire automatically at its expiry time.)',
    });
  } catch (error) {
    next(error);
  }
};
