import React from 'react';
import { whyChooseUsData } from '../data/jobs';
import { ShieldCheck, Zap, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  BookOpen: BookOpen,
  Award: Award
};

const WhyChooseUs = () => {
  return (
    <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-container">
        <motion.div 
          className="section-head"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Why Choose DG Interns Hub</div>
          <h2 className="section-main-title">Designed to Elevate Your Professional Journey</h2>
          <p className="section-lead-text">
            We connect ambitious students with leading tech organizations through verified listings, skill mentorship, and streamlined hiring workflows.
          </p>
        </motion.div>

        <div className="why-3d-grid">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <TiltCard className="why-3d-card" style={{ height: '100%' }}>
                  <div className="why-icon-badge">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="why-card-heading">{item.title}</h3>
                  <p className="why-card-text">{item.description}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
