import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LAND_B64, LAND_H, LAND_W } from './landmask';

const ABIDJAN: [number, number] = [5.32, -4.03];
const TARGETS: [number, number][] = [
  [48.86, 2.35], // Paris
  [22.54, 114.06], // Shenzhen
  [14.72, -17.47], // Dakar
  [6.52, 3.38], // Lagos
  [-26.2, 28.05], // Johannesburg
  [25.2, 55.27], // Dubaï
  [40.71, -74.0], // New York
  [-23.55, -46.63], // São Paulo
  [30.04, 31.24], // Le Caire
  [51.5, -0.12], // Londres
];

function decodeLand() {
  const bin = atob(LAND_B64);
  const bits = new Uint8Array(LAND_W * LAND_H);
  for (let i = 0; i < bits.length; i++) bits[i] = (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  return (lat: number, lon: number) => {
    const y = Math.round(((89 - lat) / 178) * (LAND_H - 1));
    const x = Math.round(((lon + 179) / 358) * (LAND_W - 1));
    if (y < 0 || y >= LAND_H || x < 0 || x >= LAND_W) return false;
    return bits[y * LAND_W + x] === 1;
  };
}

function toVec(lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

/** Globe 3D en points, Abidjan au centre d'un trafic réseau surveillé. */
export default function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const globe = new THREE.Group();
    scene.add(globe);
    const R = 1.6;

    // Sphère sombre
    globe.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(R * 0.99, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x05080d, transparent: true, opacity: 0.92 })
      )
    );
    // Halo atmosphérique
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.18, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {},
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.75 - dot(vN, vec3(0.,0.,1.)), 3.0); gl_FragColor = vec4(0.0,0.83,1.0,1.0)*i; }`,
      })
    );
    scene.add(halo);

    // Continents en points (spirale de Fibonacci filtrée par le masque)
    const isLand = decodeLand();
    const N = mobile ? 9000 : 16000;
    const pos: number[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = ((((i * 137.508) % 360) + 360) % 360) - 180;
      if (isLand(lat, lon)) {
        const v = toVec(lat, lon, R);
        pos.push(v.x, v.y, v.z);
      }
    }
    const dots = new THREE.BufferGeometry();
    dots.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    globe.add(
      new THREE.Points(
        dots,
        new THREE.PointsMaterial({ color: 0x4fdcff, size: mobile ? 0.022 : 0.018, transparent: true, opacity: 0.85 })
      )
    );

    // Abidjan : point + anneau pulsant
    const home = toVec(ABIDJAN[0], ABIDJAN[1], R * 1.005);
    const homeDot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10f0a0 }));
    homeDot.position.copy(home);
    globe.add(homeDot);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.065, 48),
      new THREE.MeshBasicMaterial({ color: 0x10f0a0, transparent: true, side: THREE.DoubleSide })
    );
    ring.position.copy(home);
    ring.lookAt(home.clone().multiplyScalar(2));
    globe.add(ring);

    // Arcs et paquets
    const arcs: { curve: THREE.QuadraticBezierCurve3; pulse: THREE.Mesh; t: number; speed: number; dir: number }[] = [];
    TARGETS.forEach((t, i) => {
      const end = toVec(t[0], t[1], R);
      const mid = home.clone().add(end).multiplyScalar(0.5);
      mid.setLength(R + home.distanceTo(end) * 0.45);
      const curve = new THREE.QuadraticBezierCurve3(home, mid, end);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
        new THREE.LineBasicMaterial({ color: i % 3 === 0 ? 0x10f0a0 : 0x00d4ff, transparent: true, opacity: 0.35 })
      );
      globe.add(line);
      const endDot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), new THREE.MeshBasicMaterial({ color: 0x9feaff }));
      endDot.position.copy(end);
      globe.add(endDot);
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 8, 8),
        new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0x10f0a0 : 0xffffff })
      );
      globe.add(pulse);
      arcs.push({ curve, pulse, t: Math.random(), speed: 0.004 + Math.random() * 0.004, dir: i % 2 ? 1 : -1 });
    });

    // Orientation de départ : l'Afrique de l'Ouest face à la caméra
    globe.rotation.y = Math.atan2(-home.x, home.z) - 0.35;
    globe.rotation.x = 0.25;

    // Glisser pour faire tourner
    let dragging = false, lastX = 0, lastY = 0, velY = 0.0016, velX = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.005;
      velX = (e.clientY - lastY) * 0.003;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => (dragging = false);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0, visible = false, t0 = performance.now();
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      globe.rotation.y += reduce ? 0 : velY;
      globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + velX, -0.6, 0.8);
      if (!dragging) {
        velY += (0.0016 - velY) * 0.03;
        velX *= 0.9;
      }
      const s = 1 + ((t * 0.8) % 1) * 2.5;
      ring.scale.set(s, s, s);
      (ring.material as THREE.MeshBasicMaterial).opacity = 1 - ((t * 0.8) % 1);
      for (const a of arcs) {
        a.t += reduce ? 0 : a.speed;
        if (a.t > 1) a.t = 0;
        a.pulse.position.copy(a.curve.getPoint(a.dir > 0 ? a.t : 1 - a.t));
      }
      renderer.render(scene, camera);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        (m.material as THREE.Material | undefined)?.dispose?.();
      });
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className={`touch-pan-y cursor-grab active:cursor-grabbing ${className ?? ''}`} aria-hidden />;
}
