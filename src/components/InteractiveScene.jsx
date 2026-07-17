import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

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

const GeometricShape = ({ geometry, position, color, wireframeColor, speed = 1, distort = 0.3, mouseInfluence = 0.3, isLight = false }) => {
  const meshRef = useRef();
  const wireRef = useRef();
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    targetRotation.current.x = mouse.current.y * mouseInfluence;
    targetRotation.current.y = mouse.current.x * mouseInfluence;

    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.02;

    meshRef.current.rotation.z += delta * 0.1 * speed;

    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        
        <mesh ref={meshRef} geometry={geometry}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={isLight ? 0.18 : 0.08}
            distort={distort}
            speed={2 * speed}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        <mesh ref={wireRef} geometry={geometry} scale={1.01}>
          <meshBasicMaterial
            color={wireframeColor}
            wireframe
            transparent
            opacity={isLight ? 0.35 : 0.15}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Particles = ({ count = 80, color = "#ffffff" }) => {
  const pointsRef = useRef();
  const mouse = useMousePosition();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += mouse.current.y * 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ConnectionLines = ({ color = "#ffffff" }) => {
  const lineRef = useRef();
  const mouse = useMousePosition();

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;

    const positions = lineRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const baseY = (i - (positions.count - 1) / 2) * 1.5;
      positions.setY(i, baseY + Math.sin(t * 0.5 + i * 0.8) * 0.3);
      positions.setX(i, Math.cos(t * 0.3 + i * 1.2) * 0.2 + mouse.current.x * 0.5);
    }
    positions.needsUpdate = true;
  });

  const linePositions = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      pts.push(new THREE.Vector3(0, (i - 3.5) * 1.5, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <line ref={lineRef} geometry={linePositions}>
      <lineBasicMaterial color={color} transparent opacity={0.1} />
    </line>
  );
};

const Scene = ({ isLight }) => {
  const colors = isLight
    ? { primary: "#334155", secondary: "#1e293b", accent: "#334155", wireframe: "#334155", particles: "#475569" }
    : { primary: "#ffffff", secondary: "#aaaaaa", accent: "#888888", wireframe: "#ffffff", particles: "#ffffff" };

  const torusKnotGeo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.35, 128, 32), []);
  const icosahedronGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const octahedronGeo = useMemo(() => new THREE.OctahedronGeometry(0.9, 0), []);

  return (
    <>
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.2} color={colors.primary} />

      <GeometricShape
        geometry={torusKnotGeo}
        position={[-3.5, 0.5, 0]}
        color={colors.primary}
        wireframeColor={colors.wireframe}
        speed={0.8}
        distort={0.25}
        mouseInfluence={0.5}
        isLight={isLight}
      />

      <GeometricShape
        geometry={icosahedronGeo}
        position={[0, -0.3, 1]}
        color={colors.secondary}
        wireframeColor={colors.wireframe}
        speed={1.2}
        distort={0.4}
        mouseInfluence={0.7}
        isLight={isLight}
      />

      <GeometricShape
        geometry={octahedronGeo}
        position={[3.5, 0.8, -0.5]}
        color={colors.accent}
        wireframeColor={colors.wireframe}
        speed={1}
        distort={0.2}
        mouseInfluence={0.4}
        isLight={isLight}
      />

      <Particles count={60} color={colors.particles} />

      <ConnectionLines color={colors.wireframe} />

      {!isLight && (
        <Stars radius={50} depth={30} count={300} factor={2} saturation={0} fade speed={0.5} />
      )}
    </>
  );
};

const InteractiveScene = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden font-sans"
      style={{
        height: isMobile ? "70vh" : "85vh",
        marginTop: isMobile ? "-3rem" : "-5rem",
      }}
    >
      
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, isMobile ? 8 : 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene isLight={isLight} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
        <div className="text-center space-y-4">
          
          <p
            className={`text-xs sm:text-sm uppercase tracking-[0.3em] font-medium ${
              isLight ? "text-gray-400" : "text-gray-500"
            }`}
          >
            — Explore —
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading ${
              isLight
                ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent"
            }`}
          >
            Crafting Digital
            <br />
            Experiences
          </h2>

          <p
            className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed ${
              isLight ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Mengubah ide menjadi karya digital yang interaktif, elegan, dan berkesan.
          </p>

          <div
            className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border text-xs font-medium backdrop-blur-sm ${
              isLight
                ? "border-gray-200/50 text-gray-400 bg-white/30"
                : "border-white/10 text-gray-500 bg-white/5"
            }`}
          >
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            Move your cursor to interact
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveScene;
