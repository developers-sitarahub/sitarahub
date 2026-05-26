'use client';

import { useEffect, useRef, useState } from 'react';

// Three.js hero background
function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number;
    let renderer: import('three').WebGLRenderer;
    let scene: import('three').Scene;
    let camera: import('three').PerspectiveCamera;
    let particles: import('three').Points;

    let observer: IntersectionObserver;

    const init = async () => {
      try {
        const THREE = await import('three');

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          canvas.offsetWidth / canvas.offsetHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        // Visibility observer
        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // Reduced particle count for smooth 60fps
        const count = 800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorA = new THREE.Color('#ff6a37');
        const colorB = new THREE.Color('#ff9e70');
        const colorC = new THREE.Color('#f5f0e9');

        for (let i = 0; i < count; i++) {
          // Spherical distribution
          const radius = Math.random() * 8 + 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

          // Color mix
          const t = Math.random();
          const color = t < 0.3 ? colorA : t < 0.5 ? colorB : colorC;
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;

          sizes[i] = Math.random() * 2 + 0.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
          size: 0.03,
          vertexColors: true,
          transparent: true,
          opacity: 0.7,
          sizeAttenuation: true,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Wireframe sphere — low-poly
        const sphereGeo = new THREE.SphereGeometry(3, 12, 12);
        const sphereMat = new THREE.MeshBasicMaterial({
          color: 0xff6a37,
          wireframe: true,
          transparent: true,
          opacity: 0.035,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphere);

        // Mouse tracking
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize
        const handleResize = () => {
          if (!canvas) return;
          const w = canvas.offsetWidth;
          const h = canvas.offsetHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animate — hero runs at full 60fps (it's the main attraction)
        let time = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          if (!isVisible) return;
          time += 0.005;

          // Smooth lerp mouse — cheaper than re-reading on every frame
          lastMouseX += (mouseX - lastMouseX) * 0.04;
          lastMouseY += (mouseY - lastMouseY) * 0.04;

          particles.rotation.y = time * 0.08 + lastMouseX;
          particles.rotation.x = time * 0.04 + lastMouseY;
          sphere.rotation.y = time * 0.05;
          sphere.rotation.x = time * 0.03;

          camera.position.x += (lastMouseX * 0.5 - camera.position.x) * 0.05;
          camera.position.y += (-lastMouseY * 0.5 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.warn('Failed to initialize WebGL context:', err);
      }
    };

    const cleanup = init();

    return () => {
      cancelAnimationFrame(animationId);
      observer?.disconnect();
      cleanup.then((fn) => fn && fn());
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [activeWord, setActiveWord] = useState(0);

  const words = ['EXCELLENCE', 'INNOVATION', 'SOLUTIONS', 'RESULTS'];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((p) => (p + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        background: '#0a0a0a',
      }}
    >
      {/* Three.js canvas */}
      <ThreeBackground />

      {/* Background vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(10,10,10,0.85) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
        }}
      >
        {/* Tag */}
        <div style={reveal(0)}>
          <span className="tag">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#ff6a37',
                display: 'inline-block',
                animation: 'pulse-ring 1.5s ease-out infinite',
              }}
            />
            Est. 2025 · Premium Software Studio
          </span>
        </div>

        {/* Main heading */}
        <div style={reveal(100)}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#f5f0e9',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            BUILDING
            <br />
            DIGITAL
            <br />
            <span
              key={activeWord}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ff6a37, #ff9e70)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {words[activeWord]}
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <div
          style={{
            ...reveal(250),
            maxWidth: 560,
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(245, 240, 233, 0.55)',
            }}
          >
            Sitarahub transforms ambitious visions into exceptional digital
            experiences. Motion-driven solutions, powerful web apps, and
            enterprise systems built to propel your business.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            ...reveal(400),
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="#projects"
            className="btn-primary"
            style={{ borderRadius: 4 }}
          >
            <span>VIEW OUR WORK</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="btn-outline"
            style={{ borderRadius: 4 }}
          >
            <span>START A PROJECT</span>
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            ...reveal(550),
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            width: '100%',
            maxWidth: 500,
          }}
        >
          {[
            { value: '6', label: 'Projects Shipped' },
            { value: '3', label: 'Countries' },
            { value: '2025', label: 'Founded' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #ff6a37, #ff9e70)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,233,0.4)',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 800ms',
        }}
      >
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,233,0.3)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(255,106,55,0.6), transparent)',
            animation: 'pulse-ring 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
