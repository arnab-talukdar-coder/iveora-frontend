import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">Let's build something <br/><span className="text-gradient">extraordinary.</span></h2>
            <p className="contact-desc">
              Ready to elevate your digital presence? Get in touch with our team to discuss your next project.
            </p>
            <div className="contact-details">
              <p><strong>Email:</strong> hello@iveora.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Global Headquarters:</strong> San Francisco, CA</p>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper glass-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="John Doe" className="minimal-input" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="john@company.com" className="minimal-input" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." className="minimal-input"></textarea>
              </div>
              <button type="submit" className="btn-primary form-submit">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
