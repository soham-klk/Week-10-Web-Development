import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import JobList from '../components/JobList';
import { sampleJobs } from '../data/jobs';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = ({ onApplyJob }) => {
  const featuredJobs = sampleJobs.slice(0, 3);

  return (
    <div>
      {/* 1. Redesigned 3D Hero Section */}
      <Hero />

      {/* 2. Platform Metrics Section */}
      <StatsSection />

      {/* 3. 3D Tilt Why Choose Us Section */}
      <WhyChooseUs />

      {/* 4. Featured Internships Section */}
      <section className="section-container">
        <motion.div 
          className="section-head"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Handpicked Opportunities</div>
          <h2 className="section-main-title">Explore Trending Internships</h2>
          <p className="section-lead-text">
            High-impact roles with competitive stipends, real-world tech stacks, and fast-track placement opportunities.
          </p>
        </motion.div>

        <JobList jobs={featuredJobs} onApply={onApplyJob} />

        <div style={{ textAlign: 'center', marginTop: '3.8rem' }}>
          <Link to="/jobs" className="btn-primary-3d" style={{ padding: '1.1rem 2.8rem' }}>
            <span>Explore All Opportunities</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 5. Sleek CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--brand-teal-main) 0%, var(--brand-teal-dark) 100%)',
        color: '#ffffff',
        padding: '4.5rem 1.8rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(217, 119, 6, 0.2)',
            border: '1px solid rgba(217, 119, 6, 0.4)',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            fontSize: '0.88rem',
            fontWeight: '700',
            marginBottom: '1.2rem',
            color: '#fef3c7'
          }}>
            <Sparkles size={16} />
            <span>Accelerate Your Career Today</span>
          </div>

          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2.6rem', fontWeight: '800', marginBottom: '1.1rem', letterSpacing: '-0.02em' }}>
            Ready to Launch Your Career with DG Interns Hub?
          </h2>

          <p style={{ fontSize: '1.12rem', color: '#cbd5e1', marginBottom: '2.2rem', lineHeight: '1.7' }}>
            Join 12,000+ students gaining real industry experience, certified stipends, and PPO offers.
          </p>

          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn-primary-3d" style={{ background: 'var(--brand-amber)', borderColor: 'var(--brand-amber)' }}>
              Browse Internship Roles
            </Link>
            <Link to="/contact" className="btn-secondary-3d" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}>
              Contact Student Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
