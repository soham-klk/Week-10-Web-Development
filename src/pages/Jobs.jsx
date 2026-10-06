import React, { useState, useMemo } from 'react';
import JobList from '../components/JobList';
import { sampleJobs } from '../data/jobs';
import { Search, Briefcase } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { motion } from 'framer-motion';

const Jobs = ({ onApplyJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredJobs = useMemo(() => {
    return sampleJobs.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesWorkType = 
        selectedWorkType === 'All' || 
        job.workType.toLowerCase() === selectedWorkType.toLowerCase();

      const matchesCategory = 
        selectedCategory === 'All' || 
        job.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesWorkType && matchesCategory;
    });
  }, [searchTerm, selectedWorkType, selectedCategory]);

  return (
    <div>
      {/* Redesigned Jobs Hero Banner */}
      <div className="jobs-hero-banner">
        <img src={logoImg} alt="" className="jobs-watermark-bg" aria-hidden="true" />
        <div style={{ maxCapacity: '1280px', margin: '0 auto', maxWidth: '1280px' }}>
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
              <Briefcase size={15} />
              <span>Official DG Interns Hub Catalog</span>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.8rem', fontWeight: '800', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
              Explore Internships & Career Drives
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.4rem', maxWidth: '680px' }}>
              Search verified openings, filter by domain, and submit your application directly to tech recruiters.
            </p>
          </motion.div>

          {/* Search & Filtering Control Bar */}
          <div className="filter-bar-container">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ position: 'absolute', left: '1.1rem', color: '#94a3b8' }} size={20} />
              <input
                type="text"
                className="search-input-field"
                placeholder="Search by role title, skill (e.g. React), or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              style={{
                padding: '0.9rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                fontSize: '0.95rem',
                color: '#0f2727',
                fontWeight: '600',
                outline: 'none',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              aria-label="Filter by Work Type"
            >
              <option value="All">All Work Types</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <select
              style={{
                padding: '0.9rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                fontSize: '0.95rem',
                color: '#0f2727',
                fontWeight: '600',
                outline: 'none',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
            >
              <option value="All">All Domains</option>
              <option value="Web Development">Web Development</option>
              <option value="Python">Python</option>
              <option value="Design">UI/UX Design</option>
              <option value="Java">Java</option>
              <option value="Fullstack">Full Stack</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Jobs Listing Content */}
      <section className="section-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: '800', color: '#0f2727' }}>
              Available Opportunities ({filteredJobs.length})
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Showing {filteredJobs.length} of {sampleJobs.length} total active internship drives
            </p>
          </div>

          {(searchTerm || selectedWorkType !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedWorkType('All');
                setSelectedCategory('All');
              }}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '0.5rem 1.2rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: '700',
                color: '#163333',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 3D JobList Component */}
        <JobList jobs={filteredJobs} onApply={onApplyJob} />
      </section>
    </div>
  );
};

export default Jobs;
