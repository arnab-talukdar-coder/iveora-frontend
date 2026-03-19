import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './About.css';

const Counter = ({ from, to, duration, suffix = '' }) => {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(0) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, suffix]);

  return <span ref={nodeRef} className="counter-value">{from}</span>;
};

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Redefining Digital <br /><span className="text-gradient">Possibilities</span></h2>
          <p className="about-desc">
            We are a premium technology agency specializing in building scalable web applications,
            cutting-edge mobile experiences, and AI-driven solutions for ambitious brands worldwide.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stat-card glass-panel">
            <Counter from={0} to={100} duration={2} suffix="+" />
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-card glass-panel">
            <Counter from={0} to={99} duration={2.5} suffix="%" />
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-card glass-panel">
            <Counter from={0} to={24} duration={1.5} suffix="/7" />
            <span className="stat-label">System Uptime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
