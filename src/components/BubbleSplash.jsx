import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BubbleSplash.css';

const ParticleExplosion = ({ isPopped }) => {
  if (!isPopped) return null;
  
  const particles = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = 100 + Math.random() * Math.max(window.innerWidth, window.innerHeight); 
      const size = Math.random() * 8 + 2; 
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size,
        duration: 1.0 + Math.random() * 1.5,
        delay: Math.random() * 0.1,
      };
    });
  }, []);

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 100, pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: [0, 1, 0], opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(192, 132, 252, 0.9)', 
            boxShadow: '0 0 15px rgba(192, 132, 252, 0.6)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

const BubbleSplash = ({ onComplete }) => {
  const [popped, setPopped] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Prevent background scrolling while splash is active
  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top on load
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePop = () => {
    if (popped) return;
    setPopped(true);
    
    // Trigger the parent's completion callback after explosion expands
    setTimeout(() => {
      setIsRemoving(true);
      if (onComplete) onComplete();
    }, 1200); // Slower removal so we can admire the explosion
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div 
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="splash-bg-stars" />
          
          {/* Inject the particle explosion right behind the bubble */}
          <ParticleExplosion isPopped={popped} />

          <div className="splash-content">
            <motion.div 
              className="bubble-container"
              onClick={handlePop}
              initial={{ scale: 0, opacity: 0 }}
              animate={popped ? { pointerEvents: 'none' } : { scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <motion.div
                className="bubble"
                animate={
                  popped 
                    ? { scale: [1, 0.5, 0], opacity: [1, 0, 0], filter: 'blur(5px)' } 
                    : { y: [-15, 15, -15], scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }
                }
                transition={
                  popped 
                    ? { duration: 0.3, ease: "easeIn" } 
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <div className="bubble-glare" />
                <div className="bubble-inner-glow" />
                <div className="bubble-logo">
                  <span className="text-gradient">IVE</span>ORA
                </div>
              </motion.div>
            </motion.div>

            <motion.h2 
              className="splash-text"
              animate={popped ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Tap to enter 
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BubbleSplash;
