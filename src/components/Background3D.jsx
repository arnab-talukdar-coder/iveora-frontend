import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gyroData } from './TechStack';

const ParticleField = ({ isMobile, mouseRef }) => {
  const innerRef = useRef();
  const outerRef = useRef();
  
  const [sphere] = useState(() => {
    const count = isMobile ? 1500 : 4000;
    const array = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        const mag = Math.sqrt(x*x + y*y + z*z);
        const radius = Math.random() * (isMobile ? 1.5 : 2.5);
        array[i * 3] = (x / mag) * radius;
        array[i * 3 + 1] = (y / mag) * radius;
        array[i * 3 + 2] = (z / mag) * radius;
    }
    return array;
  });

  useFrame((state, delta) => {
    if (innerRef.current) {
        innerRef.current.rotation.x -= delta / 20;
        innerRef.current.rotation.y -= delta / 30;
    }
    
    if (outerRef.current) {
        const currentX = gyroData?.active ? gyroData.x * 2 : (mouseRef?.current?.x || 0);
        const currentY = gyroData?.active ? gyroData.y * 2 : (mouseRef?.current?.y || 0);

        const targetX = (currentY * Math.PI) / 10;
        const targetY = (currentX * Math.PI) / 10;
        
        outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetX, 0.05);
        outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef} rotation={[0, 0, Math.PI / 4]}>
        <Points positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#9333ea"
            size={isMobile ? 0.02 : 0.015}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.5}
          />
        </Points>
      </group>
    </group>
  );
};

const Background3D = () => {
  const isMobile = window.innerWidth < 768;
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);
  
  return (
    <div className="hero-canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, cursor: 'grab' }}>
      <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 1] }}>
        <ParticleField isMobile={isMobile} mouseRef={mouseRef} />
        {!isTouch && <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />}
      </Canvas>
      <div style={{
          position: 'absolute',
          bottom: 0, left: 0, width: '100%', height: '20vh',
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
          pointerEvents: 'none'
      }}></div>
    </div>
  );
};

export default Background3D;
