import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Contact = () => {
  return (
    <div>
      {/* Redesigned Contact Header */}
      <div className="contact-header-section">
        <div style={{ maxCapacity: '720px', margin: '0 auto', maxWidth: '720px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(217, 119, 6, 0.2)',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '1.1rem',
              color: '#fef3c7'
            }}>
              <MessageSquare size={15} />
              <span>24/7 Student & Partner Support</span>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.8rem', fontWeight: '800', marginBottom: '0.7rem', letterSpacing: '-0.02em' }}>
              Get in Touch with DG Interns Hub
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.65' }}>
              Have questions regarding internship drives, employer onboarding, or application status? Reach out to our dedicated support team!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Two-Column Modern Layout: Left Info Card + Right Contact Form */}
      <div className="contact-layout-grid">
        {/* Left Column: Contact Info & Decorative Logo Visual */}
        <motion.div 
          className="contact-left-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.8rem' }}>
            Contact Information
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '2.2rem', lineHeight: '1.65' }}>
            Reach out via email or telephone, or visit our student career assistance center in Pune.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'var(--brand-teal-subtle)',
                color: 'var(--brand-teal-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email Address
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f2727' }}>
                  support@dginternshub.com
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'var(--brand-teal-subtle)',
                color: 'var(--brand-teal-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Telephone Support
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f2727' }}>
                  +91 98765 43210
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'var(--brand-teal-subtle)',
                color: 'var(--brand-teal-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Headquarters
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f2727' }}>
                  Tech Hub Towers, Phase 2, Pune, Maharashtra, India
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'var(--brand-teal-subtle)',
                color: 'var(--brand-teal-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Office Hours
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f2727' }}>
                  Mon - Sat: 9:00 AM - 6:30 PM IST
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Logo Badge Box */}
          <div style={{
            marginTop: '2.5rem',
            padding: '1.5rem',
            background: 'var(--bg-page)',
            borderRadius: '18px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem'
          }}>
            <img src={logoImg} alt="DG Interns Hub Logo Seal" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: '800', color: '#163333', fontSize: '0.98rem' }}>Official Verification Desk</div>
              <div style={{ fontSize: '0.84rem', color: '#64748b' }}>For urgent PPO certification queries, write to <em>verification@dginternshub.com</em></div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form Component */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
