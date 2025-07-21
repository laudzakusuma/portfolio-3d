import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import CodeRain from './CodeRain';
import * as THREE from 'three';

const FloatingGeometry = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
    if (materialRef.current) {
      materialRef.current.distort = Math.sin(state.clock.elapsedTime * speed) * 0.1 + 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef();
  
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const WaveGeometry = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + time) * 0.1;
      pos.z += sin(pos.y * 3.0 + time) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec3 color1 = vec3(0.0, 0.83, 1.0);
      vec3 color2 = vec3(1.0, 0.42, 0.21);
      
      float mixValue = sin(vPosition.x * 2.0 + time) * 0.5 + 0.5;
      vec3 color = mix(color1, color2, mixValue);
      
      float alpha = sin(vUv.x * 3.14) * sin(vUv.y * 3.14) * 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[8, 8, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
      <directionalLight position={[0, 5, 5]} intensity={0.5} castShadow />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <CodeRain />

      <FloatingGeometry position={[-2, 1, 0]} color="#00d4ff" speed={1} />
      <FloatingGeometry position={[2, -1, 1]} color="#ff6b35" speed={0.8} />
      <FloatingGeometry position={[0, 2, -1]} color="#ff0080" speed={1.2} />

      <WaveGeometry />
      <ParticleField />

      <fog attach="fog" args={['#0a0a0a', 5, 25]} />
    </>
  );
};

export default Scene3D;