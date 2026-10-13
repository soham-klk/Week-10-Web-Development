import User from '../models/User.js';
import Application from '../models/Application.js';

/**
 * GET /api/users/profile
 * Protected — own profile only
 */
export const getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully.',
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/profile
 * Protected — own profile only
 * Does NOT allow changing role, email, or password here
 */
export const updateProfile = async (req, res, next) => {
  try {
    // Whitelist updatable fields to prevent mass assignment
    const ALLOWED_FIELDS = ['name', 'company'];
    const ALLOWED_PROFILE_FIELDS = ['phone', 'bio', 'location', 'resumeLink', 'linkedin', 'github'];

    const updates = {};

    for (const field of ALLOWED_FIELDS) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (req.body.profile && typeof req.body.profile === 'object') {
      updates.profile = {};
      for (const field of ALLOWED_PROFILE_FIELDS) {
        if (req.body.profile[field] !== undefined) {
          updates.profile[field] = req.body.profile[field];
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/profile
 * Protected — own profile only
 * Removes the user and their applications
 */
export const deleteProfile = async (req, res, next) => {
  try {
    // Delete associated applications
    await Application.deleteMany({ candidate: req.user._id });

    // Delete user
    await User.findByIdAndDelete(req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Your account and all associated applications have been permanently deleted.',
    });
  } catch (error) {
    next(error);
  }
};
