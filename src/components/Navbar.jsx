import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" style={{
      boxShadow: scrolled ? '0 10px 30px -10px rgba(15, 39, 39, 0.12)' : 'none',
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)'
    }}>
      <div className="navbar-inner">
        {/* Exact Attached Brand Seal Logo & Title */}
        <Link to="/" className="brand-logo-link" onClick={closeMobileMenu}>
          <img src={logoImg} alt="DG Interns Hub Official Seal" className="brand-logo-img" />
          <span>
            DG <span className="brand-text-highlight">Interns Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'} 
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/jobs" 
                className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'}
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/jobs" className="nav-cta-btn">
            <Briefcase size={16} />
            <span>Explore Jobs</span>
          </Link>

          {/* Mobile Drawer Trigger */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer open">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'} 
            onClick={closeMobileMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/jobs" 
            className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'} 
            onClick={closeMobileMenu}
          >
            Jobs & Opportunities
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'nav-link-item active' : 'nav-link-item'} 
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          <Link 
            to="/jobs" 
            className="btn-primary-3d" 
            onClick={closeMobileMenu}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <span>Explore Jobs</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
