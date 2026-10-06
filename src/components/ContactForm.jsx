import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="contact-right-card">
      <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.4rem' }}>
        Send Us a Message
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '2.2rem' }}>
        Fill out the inquiry form below and our career assistance team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '2.5rem 1rem' }}
        >
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
            boxShadow: '0 0 0 10px rgba(217, 119, 6, 0.15)'
          }}>
            <CheckCircle size={40} />
          </div>
          <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.6rem' }}>
            Message Sent Successfully!
          </h4>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.65' }}>
            Thank you, <strong>{formData.name}</strong>! Your inquiry regarding <strong>"{formData.subject}"</strong> has been received. Our team will send a reply to <em>{formData.email}</em> shortly.
          </p>
          <button className="btn-secondary-3d" onClick={resetForm}>
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="cnt-name">
              Full Name *
            </label>
            <input
              type="text"
              id="cnt-name"
              name="name"
              className={`input-styled ${errors.name ? 'error' : ''}`}
              placeholder="e.g. Ananya Patel"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="cnt-email">
              Email Address *
            </label>
            <input
              type="email"
              id="cnt-email"
              name="email"
              className={`input-styled ${errors.email ? 'error' : ''}`}
              placeholder="ananya@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="cnt-subject">
              Subject *
            </label>
            <input
              type="text"
              id="cnt-subject"
              name="subject"
              className={`input-styled ${errors.subject ? 'error' : ''}`}
              placeholder="e.g. Inquiry regarding Web Development Internship Drive"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.subject}</p>}
          </div>

          <div style={{ marginBottom: '1.6rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#0f2727', marginBottom: '0.45rem' }} htmlFor="cnt-message">
              Your Message *
            </label>
            <textarea
              id="cnt-message"
              name="message"
              rows="4"
              className={`textarea-styled ${errors.message ? 'error' : ''}`}
              placeholder="How can DG Interns Hub assist you today?"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p style={{ fontSize: '0.82rem', color: '#ef4444', marginTop: '0.35rem', fontWeight: '600' }}>{errors.message}</p>}
          </div>

          <button type="submit" className="btn-primary-3d" style={{ width: '100%' }}>
            <Send size={18} />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
