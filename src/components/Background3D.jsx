import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gyroData } from './TechStack';

// Adaptive particle count based on CPU core count
const getParticleCount = (isMobile) => {
  if (!isMobile) return 4000;
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 4) return 600;
  if (cores <= 6) return 1000;
  return 1500;
};

const ParticleField = ({ isMobile, inputRef }) => {
  const innerRef = useRef();
  const outerRef = useRef();

  const [sphere] = useState(() => {
    const count = getParticleCount(isMobile);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      const mag = Math.sqrt(x * x + y * y + z * z);
      const radius = Math.random() * (isMobile ? 1.5 : 2.5);
      array[i * 3]     = (x / mag) * radius;
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
      let targetX, targetY;

      if (gyroData?.active) {
        // Mobile gyroscope path
        targetX = gyroData.y * 2 * Math.PI / 10;
        targetY = gyroData.x * 2 * Math.PI / 10;
      } else {
        const inp = inputRef.current;
        if (inp.isDragging) {
          // While dragging: use accumulated drag offset
          targetX = inp.offsetX;
          targetY = inp.offsetY;
        } else {
          // Idle: gentle mouse-hover parallax + slow auto-rotate
          inp.autoY += delta * 0.08;
          targetX = inp.mouseY * Math.PI * 0.15;
          targetY = inp.mouseX * Math.PI * 0.15 + inp.autoY;
        }
      }

      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetX, 0.04);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetY, 0.04);
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
  const canvasWrapperRef = useRef(null);

  // Single ref holding all input state — avoids re-renders
  const inputRef = useRef({
    mouseX: 0, mouseY: 0,
    offsetX: 0, offsetY: 0,
    autoY: 0,
    isDragging: false,
    lastX: 0, lastY: 0,
  });

  useEffect(() => {
    if (isTouch) return; // gyro handles mobile

    const inp = inputRef.current;
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;

    // Mouse hover: update normalized position for parallax
    const onMouseMove = (e) => {
      inp.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      inp.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    // Drag: starts ONLY on the canvas, ends anywhere on window
    const onPointerDown = (e) => {
      inp.isDragging = true;
      inp.lastX = e.clientX;
      inp.lastY = e.clientY;
      // Snapshot current hover-based rotation as drag start point
      inp.offsetX = inp.mouseY * Math.PI * 0.15;
      inp.offsetY = inp.mouseX * Math.PI * 0.15 + inp.autoY;
    };

    const onPointerMove = (e) => {
      if (!inp.isDragging) return;
      const dx = e.clientX - inp.lastX;
      const dy = e.clientY - inp.lastY;
      inp.offsetY += dx * 0.005;
      inp.offsetX -= dy * 0.005;
      inp.lastX = e.clientX;
      inp.lastY = e.clientY;
    };

    const onPointerUp = () => {
      if (inp.isDragging) {
        // When drag ends, sync autoY so hover resumes from correct position
        inp.autoY = inp.offsetY - inp.mouseX * Math.PI * 0.15;
        inp.isDragging = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isTouch]);

  return (
    <div
      ref={canvasWrapperRef}
      className="hero-canvas-container"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, cursor: 'grab' }}
    >
      <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 1] }}>
        <ParticleField isMobile={isMobile} inputRef={inputRef} />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, width: '100%', height: '20vh',
        background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default Background3D;
