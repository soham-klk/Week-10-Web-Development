import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2, ExternalLink } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-inner-container">
        {/* Brand Column with Exact Attached Logo Seal */}
        <div>
          <div className="footer-brand-title">
            <img src={logoImg} alt="DG Interns Hub Seal" className="footer-brand-logo" />
            <span>DG Interns Hub</span>
          </div>
          <p style={{ fontSize: '0.94rem', lineHeight: '1.65', color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '340px' }}>
            DG Interns Hub is a premier early-career portal connecting students with high-impact internships, hands-on industry mentorship, and verified placement pathways.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a href="#portal" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e4d4d', color: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Global Portal">
              <Globe size={18} />
            </a>
            <a href="#share" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e4d4d', color: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Share Portal">
              <Share2 size={18} />
            </a>
            <a href="#network" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e4d4d', color: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Career Network">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#ffffff', fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.2rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Home</Link></li>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Jobs</Link></li>
            <li><Link to="/contact" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Contact</Link></li>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Featured Drives</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ color: '#ffffff', fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.2rem' }}>
            Popular Domains
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>React JS Internships</Link></li>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Web Development</Link></li>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>Python & Django</Link></li>
            <li><Link to="/jobs" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 style={{ color: '#ffffff', fontFamily: 'Space Grotesk', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.2rem' }}>
            Headquarters
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <MapPin size={18} color="#d97706" />
              <span>Tech Hub Towers, Pune, MH, India</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <Mail size={18} color="#d97706" />
              <span>support@dginternshub.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <Phone size={18} color="#d97706" />
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory Copyright Notice */}
      <div className="footer-bottom-bar">
        <p className="copyright-text-mandatory">
          © Soham Kulkarni - Web Development Intern
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <a href="#privacy" style={{ color: '#94a3b8' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: '#94a3b8' }}>Terms of Service</a>
          <a href="#security" style={{ color: '#94a3b8' }}>Security Portal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
