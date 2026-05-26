'use client';

import { useEffect, useRef } from 'react';

interface ThreeVisualizerProps {
  type: 'network' | 'wave' | 'globe' | 'grid' | 'ribbon' | 'wireframe';
  color: string;
}

export function ThreeVisualizer({ type, color }: ThreeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let renderer: any;
    let scene: any;
    let camera: any;
    let onWindowResize: () => void;
    let onMouseMove: (e: MouseEvent) => void;
    let onTouchMove: (e: TouchEvent) => void;
    let observer: IntersectionObserver;

    // Interaction states
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isMounted = true;

    const init = async () => {
      try {
        const THREE = await import('three');
        if (!isMounted) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const width = container.clientWidth;
        const height = container.clientHeight || 500;

        // 1. Scene & Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 8;

        // 2. Renderer
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Visibility observer
        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // 3. Color parsing
        const themeColor = new THREE.Color(color);

        // 4. Create the specific visualizer
        let updateVisualizer: (time: number) => void = () => {};
        let visualGroup = new THREE.Group();
        scene.add(visualGroup);

        if (type === 'network') {
          // --- Network (Pulsing Network Graph) ---
          const nodeCount = 60;
          const nodes: { pos: any; vel: any; mesh: any }[] = [];
          
          const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
          const nodeMat = new THREE.MeshBasicMaterial({ color: themeColor });
          
          // Spawn nodes
          for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 6;
            const z = (Math.random() - 0.5) * 4;
            
            const mesh = new THREE.Mesh(nodeGeo, nodeMat);
            mesh.position.set(x, y, z);
            visualGroup.add(mesh);
            
            nodes.push({
              pos: mesh.position,
              vel: new THREE.Vector3(
                (Math.random() - 0.5) * 0.015,
                (Math.random() - 0.5) * 0.015,
                (Math.random() - 0.5) * 0.015
              ),
              mesh,
            });
          }

          // Lines for node connections
          const maxDist = 2.0;
          const lineMat = new THREE.LineBasicMaterial({
            color: themeColor,
            transparent: true,
            opacity: 0.15,
          });
          
          const linePositions = new Float32Array(nodeCount * nodeCount * 6);
          const lineGeo = new THREE.BufferGeometry();
          lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
          const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
          scene.add(lineSegments);

          updateVisualizer = (time: number) => {
            let lineIdx = 0;
            const posArray = lineGeo.attributes.position.array as Float32Array;

            // Update node positions
            for (let i = 0; i < nodeCount; i++) {
              const n = nodes[i];
              n.pos.add(n.vel);

              // Bounds check / bounce
              if (Math.abs(n.pos.x) > 5) n.vel.x *= -1;
              if (Math.abs(n.pos.y) > 3) n.vel.y *= -1;
              if (Math.abs(n.pos.z) > 2) n.vel.z *= -1;

              // Hover attraction / glow
              const distToMouse = n.pos.distanceTo(new THREE.Vector3(mouse.x * 5, mouse.y * 3, 0));
              if (distToMouse < 2.5) {
                const pulse = Math.sin(time * 8 + i) * 0.03 + 0.1;
                n.mesh.scale.setScalar(1 + (2.5 - distToMouse) * 1.5);
                // Gently drift towards mouse
                n.pos.lerp(new THREE.Vector3(mouse.x * 5, mouse.y * 3, n.pos.z), 0.005);
              } else {
                n.mesh.scale.setScalar(1);
              }
            }

            // Build dynamic lines
            for (let i = 0; i < nodeCount; i++) {
              for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodes[i].pos.distanceTo(nodes[j].pos);
                if (dist < maxDist) {
                  posArray[lineIdx++] = nodes[i].pos.x;
                  posArray[lineIdx++] = nodes[i].pos.y;
                  posArray[lineIdx++] = nodes[i].pos.z;
                  
                  posArray[lineIdx++] = nodes[j].pos.x;
                  posArray[lineIdx++] = nodes[j].pos.y;
                  posArray[lineIdx++] = nodes[j].pos.z;
                }
              }
            }
            
            lineGeo.attributes.position.needsUpdate = true;
            lineGeo.setDrawRange(0, lineIdx / 3);
            
            visualGroup.rotation.y = time * 0.05;
          };

        } else if (type === 'wave') {
          // --- Wave (Glowing Particle Wave) ---
          const cols = 35;
          const rows = 35;
          const count = cols * rows;
          const spacing = 0.28;
          
          const geo = new THREE.BufferGeometry();
          const positions = new Float32Array(count * 3);
          const sizes = new Float32Array(count);
          
          for (let i = 0; i < count; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            
            positions[i * 3] = (col - cols / 2) * spacing;
            positions[i * 3 + 1] = 0; // modulated in render
            positions[i * 3 + 2] = (row - rows / 2) * spacing;
            
            sizes[i] = 1.0;
          }
          
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          // Simple circle texture using canvas for glow
          const particleCanvas = document.createElement('canvas');
          particleCanvas.width = 16;
          particleCanvas.height = 16;
          const ctx = particleCanvas.getContext('2d');
          if (ctx) {
            const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 16, 16);
          }
          const texture = new THREE.CanvasTexture(particleCanvas);
          
          const mat = new THREE.PointsMaterial({
            color: themeColor,
            size: 0.18,
            map: texture,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          
          const particles = new THREE.Points(geo, mat);
          particles.rotation.x = -Math.PI / 6;
          visualGroup.add(particles);

          updateVisualizer = (time: number) => {
            const pos = geo.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
              const col = i % cols;
              const row = Math.floor(i / cols);
              
              // Mathematical waves
              const x = (col - cols / 2) * spacing;
              const z = (row - rows / 2) * spacing;
              
              // Hover ripple factor
              const distToMouse = Math.sqrt(Math.pow(x - mouse.x * 5, 2) + Math.pow(z - mouse.y * 3, 2));
              const ripple = distToMouse < 2.0 ? Math.sin(distToMouse * 5 - time * 10) * 0.4 * (2.0 - distToMouse) : 0;
              
              pos[i * 3 + 1] = Math.sin(col * 0.2 + time * 2) * 0.35 + Math.cos(row * 0.2 + time * 1.5) * 0.35 + ripple;
            }
            geo.attributes.position.needsUpdate = true;
            visualGroup.rotation.y = time * 0.08;
          };

        } else if (type === 'globe') {
          // --- Globe (Interactive Connected Planet) ---
          const sphereGeo = new THREE.IcosahedronGeometry(2.5, 2);
          const wireframeMat = new THREE.MeshBasicMaterial({
            color: themeColor,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
          });
          const baseGlobe = new THREE.Mesh(sphereGeo, wireframeMat);
          visualGroup.add(baseGlobe);

          // Nodes on the globe
          const posAttr = sphereGeo.attributes.position;
          const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);
          const nodeMat = new THREE.MeshBasicMaterial({ color: themeColor });
          const nodesGroup = new THREE.Group();
          
          const vertexCount = posAttr.count;
          const nodePositions: any[] = [];
          
          for (let i = 0; i < vertexCount; i++) {
            // Sparse nodes to keep it elegant
            if (i % 3 === 0) {
              const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
              const x = posAttr.getX(i);
              const y = posAttr.getY(i);
              const z = posAttr.getZ(i);
              nodeMesh.position.set(x, y, z);
              nodesGroup.add(nodeMesh);
              nodePositions.push(nodeMesh.position);
            }
          }
          visualGroup.add(nodesGroup);

          // Connect nodes with light lines
          const linesGeo = new THREE.BufferGeometry();
          const lineCount = 45;
          const linePoints: number[] = [];
          
          for (let k = 0; k < lineCount; k++) {
            const p1 = nodePositions[Math.floor(Math.random() * nodePositions.length)];
            const p2 = nodePositions[Math.floor(Math.random() * nodePositions.length)];
            if (p1 && p2 && p1 !== p2) {
              linePoints.push(p1.x, p1.y, p1.z);
              linePoints.push(p2.x, p2.y, p2.z);
            }
          }
          
          linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
          const linesMat = new THREE.LineBasicMaterial({
            color: themeColor,
            transparent: true,
            opacity: 0.35,
          });
          const globeLines = new THREE.LineSegments(linesGeo, linesMat);
          visualGroup.add(globeLines);

          updateVisualizer = (time: number) => {
            visualGroup.rotation.y = time * 0.12;
            visualGroup.rotation.x = Math.sin(time * 0.2) * 0.15;
            
            // Hover response (interactive tilt)
            visualGroup.position.x += (mouse.x * 1.5 - visualGroup.position.x) * 0.05;
            visualGroup.position.y += (mouse.y * 1.0 - visualGroup.position.y) * 0.05;
          };

        } else if (type === 'grid') {
          // --- Grid (3D Trade Matrix Cubes) ---
          const gridSize = 6;
          const cubes: any[] = [];
          const cubeSize = 0.45;
          const spacing = 0.8;
          
          const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          
          for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
              const mat = new THREE.MeshBasicMaterial({
                color: themeColor,
                wireframe: true,
                transparent: true,
                opacity: 0.2,
              });
              const cube = new THREE.Mesh(cubeGeo, mat);
              
              const px = (x - (gridSize - 1) / 2) * spacing;
              const pz = (z - (gridSize - 1) / 2) * spacing;
              cube.position.set(px, 0, pz);
              visualGroup.add(cube);
              
              cubes.push({ mesh: cube, origX: px, origZ: pz });
            }
          }
          
          visualGroup.rotation.x = Math.PI / 5;

          updateVisualizer = (time: number) => {
            cubes.forEach((c, idx) => {
              // Hover check
              const worldPos = new THREE.Vector3();
              c.mesh.getWorldPosition(worldPos);
              
              const dist = worldPos.distanceTo(new THREE.Vector3(mouse.x * 6, mouse.y * 4, 0));
              const hoverInfluence = dist < 3.0 ? (3.0 - dist) * 0.5 : 0;
              
              // Dynamic wave height
              const wave = Math.sin(time * 2.5 + c.origX * 0.8 + c.origZ * 0.8) * 0.5;
              
              c.mesh.position.y = wave + hoverInfluence;
              c.mesh.rotation.y = time * 0.2 + idx * 0.02;
              c.mesh.rotation.x = hoverInfluence * 0.5;
              
              // Modulate opacity
              c.mesh.material.opacity = 0.15 + (hoverInfluence * 0.2);
            });
            visualGroup.rotation.y = time * 0.06;
          };

        } else if (type === 'ribbon') {
          // --- Ribbon (Undulating Fabric Plane) ---
          const planeGeo = new THREE.PlaneGeometry(6, 4, 25, 25);
          const planeMat = new THREE.MeshBasicMaterial({
            color: themeColor,
            wireframe: true,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.25,
          });
          const ribbon = new THREE.Mesh(planeGeo, planeMat);
          visualGroup.add(ribbon);

          updateVisualizer = (time: number) => {
            const pos = planeGeo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
              const x = pos.getX(i);
              const y = pos.getY(i);
              
              // Fabric ripples using layered sines
              const z = Math.sin(x * 1.2 + time * 2.5) * 0.35 + 
                        Math.cos(y * 1.5 - time * 1.8) * 0.25 + 
                        Math.sin((x + y) * 0.5 + time) * 0.15;
              
              // Mouse interaction push
              const cursorDist = Math.sqrt(Math.pow(x - mouse.x * 4, 2) + Math.pow(y - mouse.y * 2, 2));
              const push = cursorDist < 2.0 ? Math.sin(cursorDist * Math.PI) * 0.3 * (2.0 - cursorDist) : 0;

              pos.setZ(i, z + push);
            }
            pos.needsUpdate = true;
            
            visualGroup.rotation.y = Math.sin(time * 0.15) * 0.2;
            visualGroup.rotation.x = Math.cos(time * 0.1) * 0.1;
          };

        } else if (type === 'wireframe') {
          // --- Wireframe (Architectural Building Outline) ---
          const towerGroup = new THREE.Group();
          
          // Stack cylinder segments
          const segments = [
            { r: 1.5, h: 2.2, y: -1.2 },
            { r: 1.1, h: 1.8, y: 0.8 },
            { r: 0.7, h: 1.4, y: 2.4 }
          ];
          
          segments.forEach((seg, idx) => {
            const cylGeo = new THREE.CylinderGeometry(seg.r, seg.r * 1.1, seg.h, 6, 4);
            const cylMat = new THREE.MeshBasicMaterial({
              color: themeColor,
              wireframe: true,
              transparent: true,
              opacity: 0.18,
            });
            const cylinder = new THREE.Mesh(cylGeo, cylMat);
            cylinder.position.y = seg.y;
            towerGroup.add(cylinder);
          });

          // Joint points
          const jointsGroup = new THREE.Group();
          const jointGeo = new THREE.SphereGeometry(0.04, 6, 6);
          const jointMat = new THREE.MeshBasicMaterial({ color: themeColor });

          towerGroup.children.forEach((mesh: any) => {
            const positions = mesh.geometry.attributes.position;
            for (let i = 0; i < positions.count; i += 4) {
              const joint = new THREE.Mesh(jointGeo, jointMat);
              joint.position.set(positions.getX(i), positions.getY(i) + mesh.position.y, positions.getZ(i));
              jointsGroup.add(joint);
            }
          });
          towerGroup.add(jointsGroup);
          visualGroup.add(towerGroup);

          updateVisualizer = (time: number) => {
            visualGroup.rotation.y = time * 0.15;
            
            // Tilt towards mouse position
            towerGroup.rotation.x = mouse.y * 0.35;
            towerGroup.rotation.z = -mouse.x * 0.35;
            
            // Subtle compression
            const mouseMag = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
            towerGroup.scale.y = 1 - (mouseMag * 0.08);
          };
        }

        // 5. Mouse Event Listeners
        onMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          mouse.targetX = x;
          mouse.targetY = y;
        };

        onTouchMove = (e: TouchEvent) => {
          if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
            mouse.targetX = x;
            mouse.targetY = y;
          }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });

        // 6. Resize Handler
        onWindowResize = () => {
          if (!container || !canvas) return;
          const w = container.clientWidth;
          const h = container.clientHeight || 500;
          
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          
          renderer.setSize(w, h);
        };
        window.addEventListener('resize', onWindowResize, { passive: true });

        // 7. Render Loop with basic throttled frame rate for background stability
        let lastFrameTime = 0;
        const render = (time: number) => {
          if (!isMounted) return;
          animId = requestAnimationFrame(render);
          if (!isVisible) return;

          // Limit loop frame rate to target 45fps (approx 22ms per frame) to prevent client heating
          if (time - lastFrameTime < 22) return;
          lastFrameTime = time;

          const delta = time * 0.001;

          // Smooth mouse dampening lerp
          mouse.x += (mouse.targetX - mouse.x) * 0.06;
          mouse.y += (mouse.targetY - mouse.y) * 0.06;

          updateVisualizer(delta);
          renderer.render(scene, camera);
        };

        render(0);
      } catch (err) {
        console.warn('Failed to initialize WebGL context:', err);
      }
    };

    init();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      observer?.disconnect();

      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);

      if (renderer) {
        renderer.dispose();
      }
      
      // Clean up Three.js objects
      if (scene) {
        scene.traverse((object: any) => {
          if (!object.isMesh && !object.isLine && !object.isPoints) return;
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => mat.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        });
      }
    };
  }, [type, color]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
