import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Portfolio.css';

const projects = [
  { id: 1, title: 'Nova Fintech App', category: 'Mobile & Banking', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, title: 'Aura E-Commerce', category: 'Web Platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
  { id: 3, title: 'Nexus Enterprise SaaS', category: 'Cloud Architecture', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop' },
  { id: 4, title: 'Echo AI Assistant', category: 'AI Integration', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop' },
];

const Portfolio = () => {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  // Scroll horizontally across the container based on scroll depth
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section className="portfolio-section" id="portfolio" ref={targetRef}>
      <div className={isMobile ? "portfolio-mobile" : "portfolio-sticky"}>
        <div className="container" style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Selected <span className="text-gradient">Work</span></h2>
            <p className="section-desc">Explore our recent digital transformations.</p>
          </motion.div>
        </div>
        
        <div className="portfolio-container">
          {isMobile ? (
            <div className="portfolio-items mobile-grid">
              {projects.map((project, i) => (
                <motion.div 
                  key={project.id} 
                  className="portfolio-card glass-panel"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="portfolio-image-wrapper">
                    <div className="portfolio-image" style={{ backgroundImage: `url(${project.image})` }} />
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category">{project.category}</span>
                    <h3 className="portfolio-title">
                      {project.title}
                      <ArrowRight className="arrow-icon" size={18} />
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div style={{ x }} className="portfolio-items desktop-scroll">
              {projects.map((project) => (
                <div key={project.id} className="portfolio-card glass-panel group">
                  <div className="portfolio-image-wrapper">
                    <div className="portfolio-image" style={{ backgroundImage: `url(${project.image})` }} />
                    <div className="portfolio-overlay">
                      <button className="btn-primary overlay-btn">View Case Study</button>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category">{project.category}</span>
                    <h3 className="portfolio-title">
                      {project.title}
                      <ArrowRight className="arrow-icon" size={20} />
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
