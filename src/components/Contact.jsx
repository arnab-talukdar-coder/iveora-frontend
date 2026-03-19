import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_gg2azyv',     // 🔑 replace
        'template_9gkhr9u',    // 🔑 replace
        formRef.current,
        '0UwwSPy0rY8mJM1p2'      // 🔑 replace
      )
      .then(() => {
        setStatus('We got your message. Expect a reply soon ⚡');
        setLoading(false);
        formRef.current.reset();
      })
      .catch((error) => {
        console.log('FAILED...', error);
        setStatus('Something went wrong. Try again.');
        setLoading(false);
      });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">

          {/* LEFT SIDE */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">
              Let's build something <br />
              <span className="text-gradient">extraordinary.</span>
            </h2>
            <p className="contact-desc">
              Ready to elevate your digital presence? Get in touch with our team to discuss your next project.
            </p>
            <div className="contact-details">
              <p><strong>Email:</strong> office@iveora.com</p>
              <p><strong>Phone:</strong> +91 9903727500</p>
              <p><strong>Location:</strong> Kolkata, West Bengal, India</p>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="contact-form-wrapper glass-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <form ref={formRef} className="contact-form" onSubmit={sendEmail}>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="What should we call you?"
                  className="minimal-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email — we’ll reply here"
                  className="minimal-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your phone number"
                  className="minimal-input"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Tell us what you're building..."
                  className="minimal-input"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit" disabled={loading}>
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <Send size={18} />
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;