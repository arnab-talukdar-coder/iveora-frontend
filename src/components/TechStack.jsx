import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Server, Smartphone, Cpu, CloudLightning, MousePointer2, BrainCircuit, Triangle, Terminal, Coffee, PhoneCall, FileCode, LayoutGrid, Type, Leaf, Zap, Smile, ServerCog } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, MeshDistortMaterial, Sphere, Float, RoundedBox, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import './TechStack.css';

// Lightweight global gyro state to prevent React re-renders
export const gyroData = { x: 0, y: 0, active: false };

if (typeof window !== 'undefined') {
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma === null || e.beta === null) return;
    gyroData.active = true;
    const x = THREE.MathUtils.clamp(e.gamma / 45, -1, 1);
    const y = THREE.MathUtils.clamp((e.beta - 60) / 45, -1, 1);

    // Smooth the data into the object
    gyroData.x = THREE.MathUtils.lerp(gyroData.x, x, 0.1);
    gyroData.y = THREE.MathUtils.lerp(gyroData.y, -y, 0.1);
  }, true);
}

const techs = [
  { name: 'React', icon: Code2, delay: 0 },
  { name: 'Node.js', icon: Server, delay: 0.5 },
  { name: 'AWS', icon: CloudLightning, delay: 1 },
  { name: 'Next.js', icon: Globe, delay: 1.5 },
  { name: 'Three.js', icon: Layers, delay: 0.2 },
  { name: 'React Native', icon: Smartphone, delay: 0.7 },
  { name: 'PostgreSQL', icon: Database, delay: 1.2 },
  { name: 'AI/ML', icon: BrainCircuit, delay: 0.9 },
  { name: 'Angular', icon: Triangle, delay: 0.7 },
  { name: 'Python', icon: Terminal, delay: 1.2 },
  { name: 'Java/Spring', icon: Coffee, delay: 0.9 },
  { name: 'IVR', icon: PhoneCall, delay: 0.7 },
  { name: 'PHP', icon: FileCode, delay: 1.2 },
  { name: '.NET', icon: LayoutGrid, delay: 0.9 },
  { name: 'TypeScript', icon: Type, delay: 0.9 },
  { name: 'Vue.js', icon: Leaf, delay: 0.9 },
  { name: 'Svelte.js', icon: Zap, delay: 0.9 },
  { name: 'Hapi.js', icon: Smile, delay: 0.9 },
  { name: 'Express.js', icon: ServerCog, delay: 0.9 },
];

const CoreSphere = ({ positionX = 0, positionY = 0, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[positionX, positionY, 0]} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#9333ea" attach="material" distort={0.4}
            speed={2} roughness={0.2} metalness={0.8}
            emissive="#4c1d95" emissiveIntensity={1}
          />
          <Html center zIndexRange={[100, 0]}>
            {/* <div className="tech-center-sphere glass-panel" style={{ pointerEvents: 'none' }}> */}
            <span className="text-gradient" style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '2px' }}>IVEORA</span>
            {/* </div> */}
          </Html>
        </Sphere>
      </Float>
    </group>
  );
};

const RobotHumanoid = ({ positionX = 0, positionY = 0, scale = 1 }) => {
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (headRef.current) {
      // Calculate mouse distance relative to the Robot's actual position on screen
      const robotNormX = positionX / (viewport.width / 2);
      const robotNormY = positionY / (viewport.height / 2);

      const currentX = gyroData.active ? gyroData.x * 2 : mouse.x;
      const currentY = gyroData.active ? gyroData.y * 2 : mouse.y;

      // Calculate delta from robot center to interaction point
      const dx = currentX - robotNormX;
      const dy = currentY - robotNormY;

      // Map delta to rotation explicitly (Subtle and premium)
      const targetRotY = THREE.MathUtils.clamp(dx * 0.8, -Math.PI / 3, Math.PI / 3);
      const targetRotX = THREE.MathUtils.clamp(-dy * 0.8, -Math.PI / 4, Math.PI / 4);

      // Smoothly interpolate rotation
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.1);

      // Gentle floating animation
      headRef.current.position.y = positionY + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    const time = state.clock.elapsedTime;
    const cycle = time % 5;
    let scaleY = 1;
    if (cycle > 4.8) scaleY = 0.1;

    if (leftEyeRef.current) leftEyeRef.current.scale.y = scaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = scaleY;
  });

  return (
    <group ref={headRef} position={[positionX, positionY, 0]} scale={scale}>
      <RoundedBox args={[2.2, 2.2, 2.2]} radius={0.4} smoothness={4}>
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.3} />
      </RoundedBox>

      <RoundedBox args={[1.8, 1.2, 0.2]} radius={0.1} smoothness={4} position={[0, 0.2, 1.1]}>
        <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.1} clearcoat={1} transmission={0.2} />
      </RoundedBox>

      <group position={[0, 0.2, 1.22]}>
        <mesh ref={leftEyeRef} position={[-0.4, 0, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.2, 4, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#c084fc" emissiveIntensity={2} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.4, 0, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.2, 4, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#c084fc" emissiveIntensity={2} />
        </mesh>
      </group>

      <RoundedBox args={[0.4, 0.8, 0.8]} radius={0.2} smoothness={4} position={[-1.2, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.2} />
      </RoundedBox>
      <mesh position={[-1.41, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 0.5]} />
        <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={1} />
      </mesh>

      <RoundedBox args={[0.4, 0.8, 0.8]} radius={0.2} smoothness={4} position={[1.2, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.2} />
      </RoundedBox>
      <mesh position={[1.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 0.5]} />
        <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={1} />
      </mesh>

      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.8, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.05, 16, 32]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 32]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* <Html position={[0, -2.8, 0]} center zIndexRange={[100, 0]}>
        <div className="tech-center-sphere glass-panel" style={{ width: 'auto', height: 'auto', padding: '0.8rem 2rem', borderRadius: '30px', pointerEvents: 'none', background: 'rgba(147, 51, 234, 0.1)' }}>
          <span className="text-gradient" style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '3px' }}>AI EXPERT</span>
        </div>
      </Html> */}
    </group>
  );
};

const OrbitingNodes = ({ positionX = 0, positionY = 0, scale = 1 }) => {
  const groupRef = useRef();
  const { mouse, viewport } = useThree(); // ADDED VIEWPORT BACK!

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;

    // Relative tracking for the orbit as well
    const nodeNormX = positionX / (viewport.width / 2);
    const nodeNormY = positionY / (viewport.height / 2);

    const currentX = gyroData.active ? gyroData.x * 2 : mouse.x;
    const currentY = gyroData.active ? gyroData.y * 2 : mouse.y;

    const dx = currentX - nodeNormX;
    const dy = currentY - nodeNormY;

    const targetX = dy * 0.5;
    const targetZ = -dx * 0.5;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.05);
  });

  return (
    <group ref={groupRef} position={[positionX, positionY, 0]} scale={scale}>
      {techs.map((tech, i) => {
        const isMobile = viewport.width < viewport.height || viewport.width < 10;
        const maxRx = isMobile ? (viewport.width * 0.45) : 7.5; 
        const rx = Math.min(viewport.width * (isMobile ? 0.45 : 0.28), maxRx); 
        const rz = rx * 0.65;
        const angle = (i / techs.length) * Math.PI * 2;
        const x = Math.sin(angle) * rx;
        const z = Math.sin(angle * 2) * rz; // Perfect infinite figure-8
        const y = Math.cos(angle) * (isMobile ? 1.0 : 1.5);

        return (
          <group key={i} position={[x, y, z]}>
            <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
              <Html center zIndexRange={[100, 0]}>
                <div className="tech-floating-item glass-panel" style={{ width: isMobile ? '60px' : '90px', height: isMobile ? '60px' : '90px' }}>
                  <tech.icon size={isMobile ? 18 : 28} className="tech-icon" style={{ color: 'var(--acc-primary-start)' }} />
                  <span className="tech-floating-label" style={{ marginTop: '0.2rem', fontSize: isMobile ? '0.5rem' : '0.65rem' }}>{tech.name}</span>
                </div>
              </Html>
            </Float>
          </group>
        );
      })}
    </group>
  );
};

const SplitLayout = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < viewport.height || viewport.width < 10;

  if (isMobile) {
    const offsetY = Math.min(viewport.height / 5, 2.0); // Reduced gap to pull Robot and orbit closer together
    return (
      <group>
        <RobotHumanoid positionX={0} positionY={offsetY + 0.5} scale={0.95} />
        <CoreSphere positionX={0} positionY={-offsetY} scale={0.65} />
        <OrbitingNodes positionX={0} positionY={-offsetY} scale={0.65} />
      </group>
    );
  }

  const robotOffset = viewport.width * 0.30; // Push robot reasonably left
  const coreOffset = viewport.width * 0.05; // Keep core more center, shifting it physically left relative to viewport.width/4 (which is 0.25)

  return (
    <group>
      <RobotHumanoid positionX={-robotOffset} positionY={0} scale={1.3} />
      <CoreSphere positionX={coreOffset} positionY={0} scale={1} />
      <OrbitingNodes positionX={coreOffset} positionY={0} scale={1} />
    </group>
  );
};

const TechScene = () => {
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <div className="tech-canvas-container">
      <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 11], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#9333ea" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.3} color="#c084fc" />

        <SplitLayout />
        {!isTouch && <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />}
      </Canvas>
    </div>
  );
};

const TechStack = () => {
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const requestGyro = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(console.error);
    }
  };

  return (
    <section className="tech-section" id="tech" onPointerDown={requestGyro}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="interactive-badge-container">
            <div className="interactive-badge">
              <span className="pulse-dot-wrapper">
                <span className="pulse-dot-anim"></span>
                <span className="pulse-dot-core"></span>
              </span>
              Interactive 3D
            </div>
          </div>

          <h2 className="section-title text-center">Powered By <br /><span className="text-gradient">Modern Tech</span></h2>
          <p className="section-desc text-center mx-auto">We use the best tools to build fast, scalable, and secure digital products.</p>

          <div className="interaction-hint drag-hint">
            <MousePointer2 size={16} />
            <span>{isTouch ? 'Tilt device to explore' : 'Click & Drag to rotate the space'}</span>
          </div>
        </motion.div>
      </div>

      {/* 3D Scene rendered OUTSIDE the .container to span full 100vw */}
      <TechScene />

    </section>
  );
};

export default TechStack;
