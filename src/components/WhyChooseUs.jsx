import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
  "Industry-leading 99.99% uptime guarantees.",
  "Premium, award-winning design aesthetics.",
  "Scalable microservices architectures.",
  "Rigorous security & compliance standards.",
  "Agile delivery with transparent communication.",
  "AI-first approach to future-proof your business."
];

const WhyChooseUs = () => {
  return (
    <section className="why-section" id="why-us">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title">Why <span className="text-gradient">Choose Us</span></h2>
          <p className="section-desc">We don't just build software. We engineer digital excellence.</p>
        </motion.div>

        <div className="why-grid">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              className="why-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CheckCircle2 className="check-icon" size={24} />
              <p className="why-text">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
