import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Mouse Tracker ───
const useMousePosition = () => {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return mouse;
};

// ─── Animated Particle Field ───
const ParticleField = ({ count = 200, isLight }) => {
  const pointsRef = useRef();
  const mouse = useMousePosition();
  const originalPositions = useRef(null);

  const color = isLight ? "#475569" : "#ffffff";

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  // Store original positions for spring-back
  useEffect(() => {
    originalPositions.current = new Float32Array(positions);
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions.current[i3];
      const oy = originalPositions.current[i3 + 1];
      const oz = originalPositions.current[i3 + 2];

      // Ambient floating motion
      const floatX = Math.sin(t * 0.15 + i * 0.5) * 0.3;
      const floatY = Math.cos(t * 0.12 + i * 0.3) * 0.2;

      // Mouse influence — particles push away gently from cursor
      const mouseInfluenceX = mx * 0.8;
      const mouseInfluenceY = my * 0.5;

      // Lerp toward target
      const targetX = ox + floatX + mouseInfluenceX;
      const targetY = oy + floatY + mouseInfluenceY;

      posAttr.array[i3] += (targetX - posAttr.array[i3]) * 0.02;
      posAttr.array[i3 + 1] += (targetY - posAttr.array[i3 + 1]) * 0.02;
      posAttr.array[i3 + 2] = oz + Math.sin(t * 0.1 + i * 0.7) * 0.15;
    }
    posAttr.needsUpdate = true;

    // Slow global rotation
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={count} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        transparent
        opacity={isLight ? 0.2 : 0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ─── Floating Wireframe Ring ───
const FloatingRing = ({ position, radius = 1.5, isLight, speed = 1 }) => {
  const meshRef = useRef();
  const mouse = useMousePosition();

  const geo = useMemo(() => new THREE.TorusGeometry(radius, 0.02, 16, 100), [radius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.5 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = t * 0.1 * speed + mouse.current.x * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.15 * speed) * 0.3;

    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 0.3 * speed) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshBasicMaterial
        color={isLight ? "#94a3b8" : "#ffffff"}
        transparent
        opacity={isLight ? 0.04 : 0.04}
      />
    </mesh>
  );
};

// ─── Central Sphere with Distortion ───
const CentralOrb = ({ isLight }) => {
  const meshRef = useRef();
  const wireRef = useRef();
  const mouse = useMousePosition();
  const basePositions = useRef(null);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 3), []);

  // Store base positions for vertex displacement
  useEffect(() => {
    basePositions.current = new Float32Array(geo.attributes.position.array);
  }, [geo]);

  useFrame((state) => {
    if (!meshRef.current || !basePositions.current) return;
    const t = state.clock.elapsedTime;

    // Mouse-driven rotation
    meshRef.current.rotation.x += (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.01;
    meshRef.current.rotation.y += (mouse.current.x * 0.3 - meshRef.current.rotation.y) * 0.01;
    meshRef.current.rotation.z = t * 0.05;

    // Vertex displacement (breathing/wave effect)
    const posAttr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;
      const bx = basePositions.current[i3];
      const by = basePositions.current[i3 + 1];
      const bz = basePositions.current[i3 + 2];

      // Calculate displacement based on vertex normal direction
      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      // Wave displacement
      const wave = Math.sin(t * 0.5 + bx * 2 + by * 2) * 0.06
                  + Math.sin(t * 0.3 + bz * 3) * 0.04;

      // Mouse proximity influence
      const mouseDist = Math.abs(mouse.current.x - nx) + Math.abs(mouse.current.y - ny);
      const mouseWave = Math.max(0, 1 - mouseDist * 1.5) * 0.08 * Math.sin(t * 2);

      const displacement = wave + mouseWave;

      posAttr.array[i3] = bx + nx * displacement;
      posAttr.array[i3 + 1] = by + ny * displacement;
      posAttr.array[i3 + 2] = bz + nz * displacement;
    }
    posAttr.needsUpdate = true;

    // Sync wireframe
    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
      wireRef.current.geometry.attributes.position.array.set(posAttr.array);
      wireRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, -1]}>
      {/* Solid fill */}
      <mesh ref={meshRef} geometry={geo.clone()}>
        <meshBasicMaterial
          color={isLight ? "#cbd5e1" : "#0f172a"}
          transparent
          opacity={isLight ? 0.25 : 0.18}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef} geometry={geo.clone()}>
        <meshBasicMaterial
          color={isLight ? "#475569" : "#ffffff"}
          wireframe
          transparent
          opacity={isLight ? 0.06 : 0.06}
        />
      </mesh>
    </group>
  );
};

// ─── Scene Composition ───
const HeroScene = ({ isLight }) => {
  return (
    <>
      <ambientLight intensity={0.1} />

      {/* Central breathing orb */}
      <CentralOrb isLight={isLight} />

      {/* Floating rings at different angles */}
      <FloatingRing position={[0, 0, -1]} radius={2.5} isLight={isLight} speed={0.7} />
      <FloatingRing position={[0, 0, -1]} radius={3.5} isLight={isLight} speed={0.5} />
      <FloatingRing position={[0, 0, -1]} radius={4.5} isLight={isLight} speed={0.3} />

      {/* Particle field */}
      <ParticleField count={150} isLight={isLight} />
    </>
  );
};

// ─── Exported Component ───
const Hero3DBackground = ({ theme = "dark" }) => {
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, isMobile ? 6 : 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <HeroScene isLight={isLight} />
      </Canvas>
    </div>
  );
};

export default Hero3DBackground;
