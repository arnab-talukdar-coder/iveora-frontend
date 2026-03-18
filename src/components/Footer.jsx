import React from 'react';
import './Footer.css';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="text-gradient">IVE</span>ORA
            </a>
            <p className="footer-desc">
              Building Digital Experiences That Scale. <br/>
              Web • Mobile • Cloud • AI Solutions.
            </p>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-title">Company</h4>
              <a href="#about" className="footer-link">About</a>
              <a href="#careers" className="footer-link">Careers</a>
              <a href="#blog" className="footer-link">Blog</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-title">Services</h4>
              <a href="#services" className="footer-link">Design</a>
              <a href="#services" className="footer-link">Development</a>
              <a href="#services" className="footer-link">Cloud</a>
              <a href="#services" className="footer-link">AI Integration</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} IVEORA. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
            <a href="#" className="social-icon"><Github size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
