import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

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
    
    if (outerRef.current && !isMobile && mouseRef?.current) {
        const targetX = (mouseRef.current.y * Math.PI) / 10;
        const targetY = (mouseRef.current.x * Math.PI) / 10;
        
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
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField isMobile={isMobile} mouseRef={mouseRef} />
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
