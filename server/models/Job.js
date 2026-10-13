import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    logo: {
      type: String,
      default: '💼',
    },
    companyColor: {
      type: String,
      default: '#163333',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    workType: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      required: [true, 'Work type is required'],
    },
    duration: {
      type: String,
      trim: true,
      default: '',
    },
    stipend: {
      type: String,
      trim: true,
      default: '',
    },
    salaryAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      default: 'Web Development',
    },
    deadline: {
      type: Date,
    },
    openings: {
      type: Number,
      min: 1,
      default: 1,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
      default: '',
    },
    fullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    perks: {
      type: [String],
      default: [],
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for full-text search
jobSchema.index({ title: 'text', company: 'text', skills: 'text', location: 'text', shortDescription: 'text' });

// Individual indexes for filtering
jobSchema.index({ workType: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ recruiter: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ isActive: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;
