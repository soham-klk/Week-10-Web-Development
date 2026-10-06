import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverMessage: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [appReferenceId, setAppReferenceId] = useState('');

  if (!job) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.resume.trim()) {
      newErrors.resume = 'Resume link or file name is required';
    }
    if (!formData.coverMessage.trim()) {
      newErrors.coverMessage = 'Please provide a short cover message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const randomRef = 'DGH-' + Math.floor(100000 + Math.random() * 900000);
      setAppReferenceId(randomRef);
      setSubmitted(true);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-dialog-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.8rem 2.2rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.2rem' }}>
              Apply for Opportunity
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#d97706', fontWeight: '700' }}>
              {job.title} • {job.company}
            </p>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close application modal"
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2.2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '76px',
                height: '76px',
                background: '#fef3c7',
                color: '#d97706',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.6rem',
                margin: '0 auto 1.5rem',
                boxShadow: '0 0 0 12px rgba(217, 119, 6, 0.15)'
              }}>
                <CheckCircle size={42} />
              </div>

              <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1.7rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.6rem' }}>
                Application Received!
              </h4>

              <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1.8rem', lineHeight: '1.65' }}>
                Thank you, <strong>{formData.fullName}</strong>! Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been logged in our system.
              </p>

              <div style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '1.2rem',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: '800', color: '#64748b', letterSpacing: '0.05em' }}>
                  Application Reference Number
                </div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', fontWeight: '800', color: '#163333', marginTop: '0.2rem' }}>
                  {appReferenceId}
                </div>
              </div>

              <button className="btn-primary-3d" onClick={onClose} style={{ width: '100%' }}>
                Done / Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="modal-fullName">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="modal-fullName"
                  name="fullName"
                  className={`input-styled ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Soham Kulkarni"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.fullName}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.4rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="modal-email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    className={`input-styled ${errors.email ? 'error' : ''}`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.email}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="modal-phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    className={`input-styled ${errors.phone ? 'error' : ''}`}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.phone}</p>}
                </div>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="modal-resume">
                  Resume / Portfolio Link *
                </label>
                <input
                  type="text"
                  id="modal-resume"
                  name="resume"
                  className={`input-styled ${errors.resume ? 'error' : ''}`}
                  placeholder="Paste Google Drive / GitHub / LinkedIn / Resume URL"
                  value={formData.resume}
                  onChange={handleChange}
                />
                {errors.resume && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.resume}</p>}
              </div>

              <div style={{ marginBottom: '1.6rem' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="modal-cover">
                  Cover Message *
                </label>
                <textarea
                  id="modal-cover"
                  name="coverMessage"
                  rows="3"
                  className={`textarea-styled ${errors.coverMessage ? 'error' : ''}`}
                  placeholder="Briefly state why you are interested in this internship opportunity..."
                  value={formData.coverMessage}
                  onChange={handleChange}
                ></textarea>
                {errors.coverMessage && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.coverMessage}</p>}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn-secondary-3d" onClick={onClose} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-3d" style={{ flex: 1 }}>
                  <Send size={16} />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationModal;
