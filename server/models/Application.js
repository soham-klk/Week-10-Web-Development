import mongoose from 'mongoose';

const VALID_STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'];

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: VALID_STATUSES,
      default: 'pending',
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    resumeLink: {
      type: String,
      required: [true, 'Resume / portfolio link is required'],
      trim: true,
    },
    coverMessage: {
      type: String,
      required: [true, 'Cover message is required'],
      trim: true,
      maxlength: [2000, 'Cover message cannot exceed 2000 characters'],
    },
    referenceId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications: one candidate per job
applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

// Indexes for fast retrieval
applicationSchema.index({ candidate: 1 });
applicationSchema.index({ job: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

// Generate reference ID before saving
applicationSchema.pre('save', function (next) {
  if (!this.referenceId) {
    this.referenceId = 'DGH-' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

export const APPLICATION_STATUSES = VALID_STATUSES;

const Application = mongoose.model('Application', applicationSchema);
export default Application;
