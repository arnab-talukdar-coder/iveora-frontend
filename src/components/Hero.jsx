import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import './Hero.css';

const Background3D = lazy(() => import('./Background3D'));

const Hero = () => {
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [gyroEnabled, setGyroEnabled] = React.useState(false);
  const [needsPermission, setNeedsPermission] = React.useState(false);

  React.useEffect(() => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setNeedsPermission(true);
    }
  }, []);

  const requestGyro = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            setGyroEnabled(true);
          }
        })
        .catch(console.error);
    }
  };

  return (
    <section className="hero-section" id="hero" onPointerDown={requestGyro}>
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
          {/* <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            A Premium IT Agency
          </motion.div> */}

          <h1 className="hero-title">
            Building Digital Experiences <br className="desktop-br" />
            <span className="hero-title">That Scale</span>
          </h1>

          <p className="hero-subtitle">
            Web &nbsp;&bull;&nbsp; Mobile &nbsp;&bull;&nbsp; Cloud &nbsp;&bull;&nbsp; AI Solutions
          </p>

          <div className="hero-cta-group">
            {/* <button className="btn-primary hero-btn">View Work</button> */}
            <button
              className="btn-secondary hero-btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </button>
            {isTouch && needsPermission && !gyroEnabled && (
              <button className="btn-primary hero-btn" onClick={requestGyro}>
                Enable 3D
              </button>
            )}
          </div>

          <motion.div
            className="interaction-hint drag-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <MousePointer2 size={16} />
            <span>
              {!isTouch
                ? 'Click & Drag background to rotate space'
                : (needsPermission && !gyroEnabled)
                  ? 'Tap "Enable 3D" to explore space'
                  : 'Tilt device to explore space'
              }
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
