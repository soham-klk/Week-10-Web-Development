import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned by default
    },
    role: {
      type: String,
      enum: ['candidate', 'recruiter', 'admin'],
      default: 'candidate',
    },
    profile: {
      phone: { type: String, trim: true, default: '' },
      bio: { type: String, maxlength: [500, 'Bio cannot exceed 500 characters'], default: '' },
      location: { type: String, trim: true, default: '' },
      resumeLink: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
      github: { type: String, trim: true, default: '' },
    },
    company: {
      // For recruiters
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for email lookups
userSchema.index({ email: 1 });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare plain password to hashed
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Safe user object (no password)
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
