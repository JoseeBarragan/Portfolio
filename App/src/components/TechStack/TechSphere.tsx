import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const TECHS = [
  { name: "Node.js",     color: "#68a063" },
  { name: "NestJS",      color: "#e0234e" },
  { name: "Prisma",      color: "#5a67d8" },
  { name: "PostgreSQL",  color: "#336791" },
  { name: "MySQL",       color: "#4479a1" },
  { name: "TypeScript",  color: "#3178c6" },
  { name: "Astro",       color: "#ff5d01" },
  { name: "Tailwind",    color: "#38bdf8" },
  { name: "CSS",         color: "#264de4" },
  { name: "Redis",       color: "#dc382d" },
  { name: "React",       color: "#61dafb" },
  { name: "Docker",      color: "#2496ed" },
  { name: "Git",         color: "#f05032" },
  { name: "Express",     color: "#ffffff" },
  { name: "REST API",    color: "#6366f1" },
  { name: "Linux",       color: "#fcc624" },
  { name: "JWT",         color: "#d63aff" },
  { name: "redux",       color: "#764abc" },
  { name: "Vite",        color: "#646cff" },
  { name: "Swagger",     color: "#85ea2d" },
  { name: "pnpm",        color: "#f69220" },
  { name: "WebSockets",  color: "#010101" },
  { name: "Nginx",       color: "#009639" },
];

function fibonacciSphere(n: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
  }
  return points;
}

export default function TechSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.3, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const labelsRef = useRef<{ mesh: THREE.Mesh; name: string; color: string }[]>([]);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const el = mountRef.current;
    console.log("mount el:", el, el?.clientWidth, el?.clientHeight);
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 3.2;
    cameraRef.current = camera;

    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    const positions = fibonacciSphere(TECHS.length);
    // justo después de const positions = fibonacciSphere(TECHS.length);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.2,
    });

    positions.forEach((posA, i) => {
      positions.forEach((posB, j) => {
        if (j <= i) return;
        const dist = posA.distanceTo(posB);
        if (dist < 1.2) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            posA.clone().multiplyScalar(1.5),
            posB.clone().multiplyScalar(1.5),
          ]);
          const line = new THREE.Line(geo, lineMat);
          group.add(line);
        }
      });
    });

    const labels: { mesh: THREE.Mesh; name: string; color: string }[] = [];

    positions.forEach((pos, i) => {
      const tech = TECHS[i];
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 80;
      const ctx = canvas.getContext("2d")!;

      const drawLabel = (glowing: boolean) => {
        ctx.clearRect(0, 0, 256, 80);
        if (glowing) {
          ctx.shadowColor = tech.color;
          ctx.shadowBlur = 18;
        }
        ctx.fillStyle = glowing ? "#ffffff" : "rgba(255,255,255,0.75)";
        ctx.font = glowing ? "bold 28px monospace" : "22px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tech.name, 128, 40);

        if (glowing) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = tech.color;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(8, 12, 240, 56);
        }
      };

      drawLabel(false);

      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const geo = new THREE.PlaneGeometry(0.55, 0.17);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos.clone().multiplyScalar(1.5));
      mesh.userData = { index: i, canvas, ctx, drawLabel, texture, tech };
      group.add(mesh);
      labels.push({ mesh, name: tech.name, color: tech.color });
    });

    labelsRef.current = labels;

    // raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(labels.map((l) => l.mesh));

      const name = hits.length > 0 ? hits[0].object.userData.tech.name : null;    
      if (name !== hoveredRef.current) {
        hoveredRef.current = name;
        setHovered(name);
        labels.forEach(({ mesh }) => {
          const d = mesh.userData;
          const isHit = d.tech.name === name;
          d.drawLabel(isHit);
          d.texture.needsUpdate = true;
        });
      }

      if (isDragging.current) {
        const deltaX = e.clientX - prevMouse.current.x;
        const deltaY = e.clientY - prevMouse.current.y;

        // Ajusta el factor de rotación (0.005 es un buen punto de partida)
        rotation.current.y += deltaX * 0.005;
        rotation.current.x += deltaY * 0.005;

        prevMouse.current = { x: e.clientX, y: e.clientY };
      }   
    };

    const canvasElement = renderer.domElement

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
    };

    const onMouseUp = () => { isDragging.current = false; };

    el.addEventListener("mousemove", onMouseMove);
    canvasElement.addEventListener("mousedown", onMouseDown)
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!isDragging.current) {
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
        rotation.current.x += velocity.current.x;
        rotation.current.y += velocity.current.y + 0.0015;
        // Suavizado opcional: aplica la rotación calculada
        group.rotation.y = rotation.current.y;
        group.rotation.x = rotation.current.x;
      }else {
        // Cuando arrastramos, aplicamos la rotación directamente
        group.rotation.y = rotation.current.y;
        group.rotation.x = rotation.current.x;
      }

      // billboard: cada label mira a la cámara
      labels.forEach(({ mesh }) => {
        mesh.lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvasElement.removeEventListener("mousedown", onMouseDown);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full z-900 py-16">
      <h2 className="text-[10px] font-mono tracking-widest text-purple-400 uppercase mb-2">
        Tech Stack
      </h2>
      <p className="text-2xl font-bold text-white mb-10">
        Tools I build with
      </p>  
      <div
        ref={mountRef}
        className="w-full max-w-full flex justify-center cursor-grab active:cursor-grabbing"
        style={{ height: "600px", touchAction: "none" }}
      />
      <div className="h-8 mt-4 flex items-center justify-center">
        {hovered && (
          <span
            className="text-sm font-mono tracking-wider px-4 py-1 rounded-full border"
            style={{
              color: TECHS.find((t) => t.name === hovered)?.color ?? "#fff",
              borderColor: TECHS.find((t) => t.name === hovered)?.color ?? "#fff",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            {hovered}
          </span>
        )}
      </div>
    </div>
  );
}
