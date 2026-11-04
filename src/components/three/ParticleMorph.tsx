import { MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SHIELD =
  'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z';

/** Échantillonne N points dans une forme dessinée sur un canvas 2D. */
function sample(draw: (ctx: CanvasRenderingContext2D, s: number) => void, n: number): Float32Array {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  draw(ctx, S);
  const data = ctx.getImageData(0, 0, S, S).data;
  const filled: number[] = [];
  for (let y = 0; y < S; y += 1) for (let x = 0; x < S; x += 1) if (data[(y * S + x) * 4 + 3] > 128) filled.push(x, y);
  const out = new Float32Array(n * 3);
  const count = filled.length / 2;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * count) * 2;
    out[i * 3] = ((filled[k] + Math.random()) / S - 0.5) * 3.2;
    out[i * 3 + 1] = -((filled[k + 1] + Math.random()) / S - 0.5) * 3.2;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

const shapes = (n: number) => [
  sample((ctx, s) => {
    ctx.save();
    ctx.translate(s * 0.08, s * 0.06);
    ctx.scale((s * 0.84) / 24, (s * 0.84) / 24);
    ctx.lineWidth = 2.4;
    ctx.stroke(new Path2D(SHIELD));
    ctx.fill(new Path2D('M9 12l2 2 4-4'));
    ctx.lineWidth = 2;
    ctx.stroke(new Path2D('M9 12l2 2 4-4'));
    ctx.restore();
  }, n),
  sample((ctx, s) => {
    ctx.lineWidth = s * 0.07;
    ctx.beginPath();
    ctx.arc(s / 2, s * 0.42, s * 0.2, Math.PI, 0);
    ctx.lineTo(s * 0.7, s * 0.5);
    ctx.moveTo(s * 0.3, s * 0.5);
    ctx.lineTo(s * 0.3, s * 0.42);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(s * 0.18, s * 0.48, s * 0.64, s * 0.42, s * 0.06);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(s / 2, s * 0.65, s * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(s * 0.48, s * 0.66, s * 0.04, s * 0.13);
  }, n),
  sample((ctx, s) => {
    ctx.font = `bold ${s * 0.5}px "Space Grotesk", Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AY', s / 2, s * 0.52);
  }, n),
];

/** Nuage de particules 3D qui passe d'un bouclier à un cadenas puis aux initiales « AY ». */
export default function ParticleMorph({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const N = mobile ? 5000 : 11000;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.6;

    const [a, b, c] = shapes(N);
    const rnd = new Float32Array(N * 3);
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random() * 2 - 1;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(a, 3));
    geo.setAttribute('aB', new THREE.BufferAttribute(b, 3));
    geo.setAttribute('aC', new THREE.BufferAttribute(c, 3));
    geo.setAttribute('aR', new THREE.BufferAttribute(rnd, 3));

    const uniforms = {
      uP: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uSize: { value: (mobile ? 2.6 : 2.2) * renderer.getPixelRatio() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aB; attribute vec3 aC; attribute vec3 aR;
        uniform float uP; uniform float uTime; uniform vec3 uMouse; uniform float uSize;
        varying float vMix; varying float vGlow;
        void main(){
          float p1 = clamp(uP, 0.0, 1.0);
          float p2 = clamp(uP - 1.0, 0.0, 1.0);
          float e1 = smoothstep(0.0, 1.0, p1);
          float e2 = smoothstep(0.0, 1.0, p2);
          vec3 pos = mix(mix(position, aB, e1), aC, e2);
          // explosion au milieu de chaque transition
          float burst = sin(p1 * 3.14159) + sin(p2 * 3.14159);
          pos += aR * burst * 0.9;
          // respiration
          pos += aR * 0.025 * sin(uTime * 1.5 + aR.x * 6.0);
          // répulsion du curseur
          vec3 d = pos - uMouse;
          float dist = length(d.xy);
          float f = smoothstep(0.9, 0.0, dist);
          pos.xy += normalize(d.xy + 0.0001) * f * 0.55;
          vGlow = f;
          vMix = e1 + e2;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = uSize * (1.0 + f * 1.5) * (4.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vMix; varying float vGlow;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.0, length(c));
          vec3 cyan = vec3(0.0, 0.83, 1.0);
          vec3 green = vec3(0.06, 0.94, 0.63);
          vec3 col = mix(cyan, green, clamp(vMix - 0.5, 0.0, 1.0));
          col = mix(col, vec3(1.0), vGlow * 0.6);
          gl_FragColor = vec4(col, a * 0.85);
        }`,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit);
    };
    const onLeave = () => uniforms.uMouse.value.set(99, 99, 0);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerup', onLeave);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.z = w < h ? 6.2 : 4.6;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0, visible = false, target = 0;
    const loop = (t: number) => {
      target = progress.get() * 2;
      uniforms.uP.value += (target - uniforms.uP.value) * 0.08;
      uniforms.uTime.value = t / 1000;
      points.rotation.y = Math.sin(t / 4000) * 0.25 + (uniforms.uP.value % 1) * 0.6;
      points.rotation.x = Math.sin(t / 5000) * 0.08;
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
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerup', onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [progress]);

  return <div ref={ref} className={`touch-pan-y ${className ?? ''}`} aria-hidden />;
}
