import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Cube() {
  const meshRef = React.useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#4a90e2"
        transparent
        opacity={0.7}
        metalness={0.5}
        roughness={0.1}
        emissive="#4a90e2"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function ThreeCube() {
  return (
    <div style={{ height: '400px', width: '100%', maxWidth: '600px', margin: '2rem auto' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Cube />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}