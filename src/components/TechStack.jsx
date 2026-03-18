import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Server, Smartphone, Cpu, CloudLightning } from 'lucide-react';
import './TechStack.css';

const techs = [
  { name: 'React', icon: Code2, x: -30, y: -20, delay: 0 },
  { name: 'Node.js', icon: Server, x: 25, y: -30, delay: 0.5 },
  { name: 'AWS', icon: CloudLightning, x: -35, y: 25, delay: 1 },
  { name: 'Next.js', icon: Globe, x: 30, y: 25, delay: 1.5 },
  { name: 'Three.js', icon: Layers, x: 0, y: -40, delay: 0.2 },
  { name: 'React Native', icon: Smartphone, x: 0, y: 40, delay: 0.7 },
  { name: 'PostgreSQL', icon: Database, x: -15, y: 0, delay: 1.2 },
  { name: 'AI/ML', icon: Cpu, x: 15, y: 0, delay: 0.9 },
];

const TechStack = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="tech-section" id="tech">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title text-center">Powered By <br/><span className="text-gradient">Modern Tech</span></h2>
          <p className="section-desc text-center mx-auto">We use the best tools to build fast, scalable, and secure digital products.</p>
        </motion.div>

        {isMobile ? (
          <div className="tech-grid-mobile">
            {techs.map((tech, i) => (
              <motion.div 
                key={i} 
                className="tech-item-mobile glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <tech.icon size={28} className="tech-icon" />
                <span className="tech-label">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="tech-orbit-container">
            <div className="tech-center-sphere glass-panel">
              <span className="text-gradient" style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '2px' }}>IVEORA</span>
            </div>
            {techs.map((tech, i) => (
              <motion.div
                key={i}
                className="tech-floating-wrapper"
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x: `${tech.x}vw`, y: `${tech.y}vh` }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  opacity: { duration: 0.8, delay: i * 0.1 },
                  x: { duration: 1.5, type: "spring", bounce: 0.4 },
                  y: { duration: 1.5, type: "spring", bounce: 0.4 }
                }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: tech.delay
                  }}
                  className="tech-floating-item glass-panel"
                >
                  <tech.icon size={32} className="tech-icon" />
                  <span className="tech-floating-label">{tech.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
