import React from 'react';
import { MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const JobCard = ({ job, onApply }) => {
  const getBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'remote':
        return 'badge-pill-remote';
      case 'hybrid':
        return 'badge-pill-hybrid';
      case 'on-site':
      case 'onsite':
        return 'badge-pill-onsite';
      default:
        return 'badge-pill-hybrid';
    }
  };

  return (
    <TiltCard className="job-card-premium">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div>
          {/* Header Row: Company Icon & Work Type Badge */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="job-company-avatar" style={{ color: job.companyColor || '#163333' }}>
              {job.logo || '💼'}
            </div>
            <span className={getBadgeClass(job.workType)}>
              ● {job.workType}
            </span>
          </div>

          <h3 className="job-card-role-title">{job.title}</h3>
          <p className="job-company-title">{job.company}</p>

          {/* Location & Duration Metadata */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem', marginBottom: '1.1rem', fontSize: '0.88rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
              <MapPin size={16} color="#d97706" />
              <span>{job.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
              <Clock size={16} color="#d97706" />
              <span>{job.duration}</span>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '1.4rem', lineHeight: '1.55' }}>
            {job.shortDescription}
          </p>

          {/* Skills Required Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.6rem' }}>
            {job.skills && job.skills.map((skill, idx) => (
              <span key={idx} className="skill-tag-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Stipend & Apply Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1.25rem',
          borderTop: '1px dashed var(--border-color)',
          marginTop: 'auto'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: '600', textTransform: 'uppercase' }}>
              Stipend / Salary
            </span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.15rem', fontWeight: '800', color: '#163333' }}>
              {job.stipend}
            </span>
          </div>

          <button 
            className="btn-apply-glow" 
            onClick={() => onApply(job)}
          >
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
};

export default JobCard;
