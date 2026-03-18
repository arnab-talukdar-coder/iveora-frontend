import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Background3D = lazy(() => import('./Background3D'));

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <Suspense fallback={<div className="canvas-fallback" />}>
        <Background3D />
      </Suspense>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            A Premium IT Agency
          </motion.div>

          <h1 className="hero-title">
            Building Digital Experiences <br className="desktop-br" />
            <span className="hero-title">That Scale</span>
          </h1>

          <p className="hero-subtitle">
            Web &nbsp;&bull;&nbsp; Mobile &nbsp;&bull;&nbsp; Cloud &nbsp;&bull;&nbsp; AI Solutions
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary hero-btn">View Work</button>
            <button className="btn-secondary hero-btn">Get in Touch</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
