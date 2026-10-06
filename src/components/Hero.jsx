import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Sparkles, CheckCircle2, Building2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Large subtle low-opacity attached logo watermark background */}
      <img src={logoImg} alt="" className="hero-logo-watermark" aria-hidden="true" />
      <div className="hero-glow-glow" aria-hidden="true"></div>

      <div className="hero-container">
        {/* Left Column Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Required Small Badge */}
          <div className="hero-pill-badge">
            <span role="img" aria-label="rocket">🚀</span>
            <span>Opportunities for the Next Generation</span>
          </div>

          {/* Required Large Headline */}
          <h1 className="hero-heading">
            Find Your Opportunity. <br />
            <span className="hero-heading-gradient">Build Your Future.</span>
          </h1>

          {/* Required Supporting Text */}
          <p className="hero-lead-text">
            Discover internships and early-career opportunities designed to help you gain real-world experience and grow your skills.
          </p>

          {/* Required CTA Buttons */}
          <div className="hero-cta-group">
            <Link to="/jobs" className="btn-primary-3d">
              <span>Explore Internships</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link to="/contact" className="btn-secondary-3d">
              <Mail size={18} color="#d97706" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div style={{ display: 'flex', gap: '1.8rem', marginTop: '2.8rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '700', color: '#163333' }}>
              <CheckCircle2 size={18} color="#d97706" />
              <span>Verified Tech Employers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '700', color: '#163333' }}>
              <CheckCircle2 size={18} color="#d97706" />
              <span>Direct PPO Fast-Track</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Floating Composition with Exact Attached Logo */}
        <motion.div
          className="hero-3d-wrapper"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Floating Chip 1 */}
          <div className="hero-floating-chip chip-top-left">
            <div style={{ background: '#fef3c7', padding: '0.4rem', borderRadius: '8px', color: '#d97706' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Certificate & PPO</div>
              <div style={{ color: '#0f2727' }}>Guaranteed Perks</div>
            </div>
          </div>

          {/* Floating Chip 2 */}
          <div className="hero-floating-chip chip-bottom-right">
            <div style={{ background: '#e6f0f0', padding: '0.4rem', borderRadius: '8px', color: '#163333' }}>
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>150+ Top Startups</div>
              <div style={{ color: '#0f2727' }}>Hiring Right Now</div>
            </div>
          </div>

          {/* 3D Glass Showcase Card */}
          <div className="hero-3d-card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(217, 119, 6, 0.1)',
                border: '1px solid rgba(217, 119, 6, 0.3)',
                color: '#d97706',
                padding: '0.3rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: '700'
              }}>
                ● Live Internship Drive 2026
              </span>
            </div>

            {/* Exact Attached Seal Logo Image as Visual Centerpiece */}
            <img 
              src={logoImg} 
              alt="DG Interns Hub Seal" 
              className="hero-logo-centerpiece" 
            />

            <h3 style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.4rem', 
              fontWeight: '800', 
              color: '#0f2727', 
              textAlign: 'center',
              marginBottom: '0.3rem' 
            }}>
              DG Interns Hub
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center', marginBottom: '1.6rem' }}>
              Discover Opportunities. Build Your Career.
            </p>

            <div style={{ 
              background: '#f8fafc', 
              borderRadius: '16px', 
              padding: '1.1rem', 
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: '800', color: '#163333', fontSize: '1.2rem' }}>500+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Active Roles</div>
              </div>
              <div style={{ width: '1px', height: '28px', background: '#cbd5e1' }}></div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: '800', color: '#d97706', fontSize: '1.2rem' }}>98%</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Placement</div>
              </div>
              <div style={{ width: '1px', height: '28px', background: '#cbd5e1' }}></div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: '800', color: '#0ea5e9', fontSize: '1.2rem' }}>4.9★</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Student Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
