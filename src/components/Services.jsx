import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, Smartphone, Cloud, Cpu, Layout, Shield } from 'lucide-react';
import './Services.css';

const TiltCard = ({ title, desc, icon: Icon, isMobile, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX - width / 2;
    const yPct = mouseY - height / 2;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="service-card glass-panel"
      >
        <div style={{ transform: "translateZ(40px)" }} className="service-icon-wrapper">
          <Icon size={28} className="service-icon" />
        </div>
        <h3 style={{ transform: "translateZ(30px)" }} className="service-title">{title}</h3>
        <p style={{ transform: "translateZ(20px)" }} className="service-desc">{desc}</p>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    { title: "Web Application", desc: "Scalable, high-performance web apps with modern React & Next.js architectures.", icon: Code },
    { title: "Mobile Development", desc: "Native-feeling cross-platform mobile experiences for iOS and Android.", icon: Smartphone },
    { title: "Cloud Architecture", desc: "Secure, highly-available cloud infrastructures on AWS and GCP.", icon: Cloud },
    { title: "AI Integration", desc: "Smart AI features and LLM integrations to give your product an edge.", icon: Cpu },
    { title: "UI/UX Design", desc: "Premium, conversion-focused interfaces that delight users.", icon: Layout },
    { title: "Cybersecurity", desc: "Enterprise-grade security audits and secure lifecycle development.", icon: Shield },
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">End-to-End <br/><span className="text-gradient">Solutions</span></h2>
          <p className="section-desc text-center mx-auto">We deliver comprehensive technology services designed for scale and performance.</p>
        </motion.div>
        
        <div className="services-grid">
          {services.map((svc, i) => (
            <TiltCard key={i} {...svc} isMobile={isMobile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
