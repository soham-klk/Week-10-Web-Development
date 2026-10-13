import React, { useState, useEffect, useCallback } from 'react';
import JobList from '../components/JobList';
import { sampleJobs } from '../data/jobs';
import { jobsAPI } from '../services/api';
import { Search, Briefcase, RefreshCw } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 9;

const Jobs = ({ onApplyJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingBackend, setUsingBackend] = useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedWorkType, selectedCategory, sortOrder]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: debouncedSearch || undefined,
        type: selectedWorkType !== 'All' ? selectedWorkType : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        sort: sortOrder,
        page,
        limit: ITEMS_PER_PAGE,
      };
      const res = await jobsAPI.getAll(params);
      setJobs(res.data || []);
      setTotalPages(res.totalPages || 1);
      setTotal(res.total || 0);
      setUsingBackend(true);
    } catch {
      // Backend unavailable — fall back to static data with client-side filtering
      setUsingBackend(false);
      const filtered = sampleJobs.filter((job) => {
        const q = debouncedSearch.toLowerCase();
        const matchesSearch =
          !q ||
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)) ||
          job.location.toLowerCase().includes(q);
        const matchesType =
          selectedWorkType === 'All' ||
          job.workType.toLowerCase() === selectedWorkType.toLowerCase();
        const matchesCat =
          selectedCategory === 'All' ||
          job.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesType && matchesCat;
      });
      const start = (page - 1) * ITEMS_PER_PAGE;
      setJobs(filtered.slice(start, start + ITEMS_PER_PAGE));
      setTotal(filtered.length);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedWorkType, selectedCategory, sortOrder, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedWorkType('All');
    setSelectedCategory('All');
    setSortOrder('newest');
    setPage(1);
  };

  const hasActiveFilters =
    searchTerm || selectedWorkType !== 'All' || selectedCategory !== 'All' || sortOrder !== 'newest';

  return (
    <div>
      {/* Jobs Hero Banner */}
      <div className="jobs-hero-banner">
        <img src={logoImg} alt="" className="jobs-watermark-bg" aria-hidden="true" />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(217, 119, 6, 0.2)', padding: '0.35rem 0.9rem',
              borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700',
              marginBottom: '1.1rem', color: '#fef3c7'
            }}>
              <Briefcase size={15} />
              <span>Official DG Interns Hub Catalog</span>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.8rem', fontWeight: '800', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
              Explore Internships &amp; Career Drives
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.4rem', maxWidth: '680px' }}>
              Search verified openings, filter by domain, and submit your application directly to tech recruiters.
            </p>
          </motion.div>

          {/* Search & Filter Control Bar */}
          <div className="filter-bar-container">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ position: 'absolute', left: '1.1rem', color: '#94a3b8' }} size={20} />
              <input
                type="text"
                id="job-search-input"
                className="search-input-field"
                placeholder="Search by role title, skill (e.g. React), or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search jobs"
              />
            </div>

            <select
              id="work-type-filter"
              style={{ padding: '0.9rem 1rem', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', color: '#0f2727', fontWeight: '600', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
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
              id="category-filter"
              style={{ padding: '0.9rem 1rem', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', color: '#0f2727', fontWeight: '600', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
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

            <select
              id="sort-filter"
              style={{ padding: '0.9rem 1rem', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', color: '#0f2727', fontWeight: '600', outline: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort jobs"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="deadline">By Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Jobs Listing Content */}
      <section className="section-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: '800', color: '#0f2727' }}>
              {loading ? 'Loading...' : `Available Opportunities (${total})`}
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              {usingBackend
                ? `Page ${page} of ${totalPages} · ${total} total active internship drives`
                : `Showing local data · ${total} matching opportunities`}
            </p>
          </div>

          {hasActiveFilters && (
            <button
              id="reset-filters-btn"
              onClick={resetFilters}
              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.5rem 1.2rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', color: '#163333', cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem 1.4rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b', fontWeight: '600' }}>
            <RefreshCw size={36} style={{ margin: '0 auto 1rem', display: 'block', animation: 'spin 1s linear infinite' }} />
            Loading opportunities...
          </div>
        ) : (
          <>
            <JobList jobs={jobs} onApply={onApplyJob} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                <button
                  id="prev-page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: page === 1 ? '#f8fafc' : '#163333', color: page === 1 ? '#94a3b8' : '#fff', fontWeight: '700', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .map((p, idx, arr) => (
                    <React.Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span style={{ padding: '0.6rem 0.4rem', color: '#94a3b8' }}>…</span>
                      )}
                      <button
                        id={`page-${p}-btn`}
                        onClick={() => setPage(p)}
                        style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: p === page ? 'var(--brand-amber)' : '#ffffff', color: p === page ? '#fff' : '#163333', fontWeight: '700', cursor: 'pointer' }}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  id="next-page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: page === totalPages ? '#f8fafc' : '#163333', color: page === totalPages ? '#94a3b8' : '#fff', fontWeight: '700', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Jobs;
