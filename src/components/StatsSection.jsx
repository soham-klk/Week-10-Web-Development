import React from 'react';
import { platformStats } from '../data/jobs';
import { motion } from 'framer-motion';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {platformStats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="stat-card-3d"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="stat-num">{stat.count}</div>
            <div className="stat-lbl">{stat.label}</div>
            <div className="stat-sub">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
