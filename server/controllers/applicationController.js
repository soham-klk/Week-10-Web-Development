import Application from '../models/Application.js';
import Job from '../models/Job.js';
import mongoose from 'mongoose';

/**
 * POST /api/applications
 * Protected — candidate only
 */
export const createApplication = async (req, res, next) => {
  try {
    const { jobId, fullName, email, phone, resumeLink, coverMessage } = req.body;

    // Verify job exists and is active
    const job = await Job.findOne({ _id: jobId, isActive: true });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found or is no longer active.' });
    }

    // Check for existing application (duplicate guard, also enforced by DB index)
    const existing = await Application.findOne({ candidate: req.user._id, job: jobId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this internship.',
      });
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
      fullName,
      email,
      phone,
      resumeLink,
      coverMessage,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        referenceId: application.referenceId,
        application,
      },
    });
  } catch (error) {
    // Handle compound unique index violation
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this internship.',
      });
    }
    next(error);
  }
};

/**
 * GET /api/applications/my
 * Protected — returns own applications (candidate)
 */
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate('job', 'title company location workType stipend logo companyColor')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: 'Your applications retrieved successfully.',
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/applications/:id
 * Protected — candidate (own), recruiter (their job), admin (any)
 */
export const getApplicationById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID format.' });
    }

    const application = await Application.findById(req.params.id)
      .populate('job', 'title company location workType stipend recruiter')
      .populate('candidate', 'name email');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const isCandidate = application.candidate._id.toString() === req.user._id.toString();
    const isJobRecruiter =
      application.job.recruiter &&
      application.job.recruiter.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCandidate && !isJobRecruiter && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this application.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application retrieved successfully.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/applications/:id/status
 * Protected — recruiter (own job) or admin only
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID format.' });
    }

    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate('job', 'recruiter');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const isJobRecruiter =
      application.job.recruiter &&
      application.job.recruiter.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isJobRecruiter && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only the job recruiter or an admin can update application status.',
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: `Application status updated to '${status}'.`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/applications/:id
 * Protected — candidate (own) or admin
 */
export const deleteApplication = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID format.' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const isOwner = application.candidate.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this application.',
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
