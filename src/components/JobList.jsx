import React from 'react';
import JobCard from './JobCard';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const JobList = ({ jobs, onApply }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          textAlign: 'center',
          padding: '4.5rem 1.8rem',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          margin: '2rem 0',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <SearchX size={52} color="#d97706" style={{ marginBottom: '1.2rem' }} />
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: '800', color: '#0f2727', marginBottom: '0.5rem' }}>
          No Matching Opportunities Found
        </h3>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          Try clearing your search terms or adjusting the category filters to discover active internship drives.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="jobs-grid-layout">
      {jobs.map((job, idx) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
        >
          <JobCard job={job} onApply={onApply} />
        </motion.div>
      ))}
    </div>
  );
};

export default JobList;
