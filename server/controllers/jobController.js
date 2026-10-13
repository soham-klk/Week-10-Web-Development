import Job from '../models/Job.js';
import mongoose from 'mongoose';

/**
 * Build MongoDB query from validated query params
 */
const buildJobQuery = (queryParams) => {
  const filter = { isActive: true };

  const { search, type, location, skill, category } = queryParams;

  // Safe search using regex (NOT operator-injection-prone)
  if (search && search.trim()) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(escapedSearch, 'i');
    filter.$or = [
      { title: searchRegex },
      { company: searchRegex },
      { location: searchRegex },
      { skills: searchRegex },
      { shortDescription: searchRegex },
    ];
  }

  // Work type filter (maps to workType field)
  if (type && type !== 'all') {
    const typeMap = {
      remote: 'Remote',
      hybrid: 'Hybrid',
      'on-site': 'On-site',
      onsite: 'On-site',
    };
    const normalized = typeMap[type.toLowerCase()] || type;
    filter.workType = normalized;
  }

  // Location filter (case-insensitive)
  if (location && location !== 'all') {
    filter.location = new RegExp(location.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }

  // Skills filter
  if (skill && skill !== 'all') {
    filter.skills = new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }

  // Category filter (exact, case-insensitive via regex)
  if (category && category !== 'all') {
    filter.category = new RegExp(`^${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  }

  return filter;
};

/**
 * Build sort object from validated sort param
 */
const buildJobSort = (sort) => {
  switch (sort) {
    case 'oldest':
      return { createdAt: 1 };
    case 'deadline':
      // Jobs with null deadline sorted last
      return { deadline: 1, createdAt: -1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
};

/**
 * GET /api/jobs
 * Public — with search, filter, pagination, sorting
 */
export const getAllJobs = async (req, res, next) => {
  try {
    const {
      page = '1',
      limit = '10',
      sort = 'newest',
      search,
      type,
      location,
      skill,
      category,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const filter = buildJobQuery({ search, type, location, skill, category });
    const sortObj = buildJobSort(sort);

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .populate('recruiter', 'name email company')
        .lean(),
      Job.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/jobs/:id
 * Public
 */
export const getJobById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job ID format.' });
    }

    const job = await Job.findById(req.params.id).populate('recruiter', 'name email company');
    if (!job || !job.isActive) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Job retrieved successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/jobs
 * Protected — recruiter or admin only
 */
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiter: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/jobs/:id
 * Protected — owner recruiter or admin
 */
export const updateJob = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job ID format.' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    // Ownership check: only the recruiter who created it or an admin
    if (req.user.role !== 'admin' && job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this job.',
      });
    }

    // Prevent recruiter from changing the recruiter field
    const { recruiter, ...safeUpdates } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: safeUpdates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully.',
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/jobs/:id
 * Protected — owner recruiter or admin
 */
export const deleteJob = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid job ID format.' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    if (req.user.role !== 'admin' && job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this job.',
      });
    }

    // Soft delete — mark inactive
    await Job.findByIdAndUpdate(req.params.id, { isActive: false });

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
