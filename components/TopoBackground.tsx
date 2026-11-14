// biome-ignore-all lint/suspicious/noBitwiseOperators: the noise hash and the marching-squares case index are bit arithmetic.
"use client";

/**
 * @author: @dorianbaffier
 * @description: Topo Background
 * @version: 1.1.0
 * @date: 2026-10-14
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Copyright (c) 2025 kokonutUI — MIT License.
 * Portado para o site da Incargel sem Tailwind: o algoritmo (ruído de Perlin + marching squares,
 * colina sob o cursor, ondulação no clique) é o original; só o layout virou CSS (classes .topo*)
 * e os rótulos de elevação ficam desligados por padrão (o site não pode ganhar texto novo).
 * Como pano de fundo do topo, ele lembra as curvas de nível de uma jazida: "do barro".
 */

import { type ReactNode, useEffect, useRef } from "react";

export interface TopoBackgroundProps {
  className?: string;
  children?: ReactNode;
  /** Height difference between two contour lines. Lower draws more lines. */
  interval?: number;
  /** How fast the terrain drifts. 0 holds it still. */
  speed?: number;
  /** Raise a hill under the cursor and send a ripple on click. */
  interactive?: boolean;
  /** Seed for the terrain, so a page always opens on the same map. */
  seed?: number;
}

const CELL = 12;
const TERRAIN_SCALE = 360;
const INDEX_EVERY = 5;
const HILL_HEIGHT = 0.5;
const HILL_SPREAD = 120;
const HILL_FOLLOW = 9;
const HILL_RISE = 5;
const RIPPLE_MS = 1800;
const RIPPLE_SPEED = 0.24; // px per ms
const RIPPLE_WIDTH = 42;
const RIPPLE_HEIGHT = 0.2;
const RIPPLE_WAVELENGTH = 96;
const IDLE_FRAME_MS = 33;

interface Ripple { x: number; y: number; start: number }
interface Hill { x: number; y: number; targetX: number; targetY: number; amount: number; on: boolean }

/** Seeded 3D gradient noise (Ken Perlin's improved noise), about -1 to 1. */
function createNoise(seed: number) {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let state = seed >>> 0 || 1;
  const random = () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    let v = z;
    if (h < 4) v = y;
    else if (h === 12 || h === 14) v = x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    const fx = x - Math.floor(x), fy = y - Math.floor(y), fz = z - Math.floor(z);
    const u = fade(fx), v = fade(fy), w = fade(fz);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
    return lerp(
      lerp(lerp(grad(perm[AA], fx, fy, fz), grad(perm[BA], fx - 1, fy, fz), u),
        lerp(grad(perm[AB], fx, fy - 1, fz), grad(perm[BB], fx - 1, fy - 1, fz), u), v),
      lerp(lerp(grad(perm[AA + 1], fx, fy, fz - 1), grad(perm[BA + 1], fx - 1, fy, fz - 1), u),
        lerp(grad(perm[AB + 1], fx, fy - 1, fz - 1), grad(perm[BB + 1], fx - 1, fy - 1, fz - 1), u), v),
      w
    );
  };
}

/** The segment a contour draws through one grid cell (marching squares). */
function cellSegments(
  path: Path2D, index: number,
  box: { x0: number; y0: number; x1: number; y1: number },
  cross: { top: number; right: number; bottom: number; left: number }
) {
  const { x0, y0, x1, y1 } = box;
  const { top, right, bottom, left } = cross;
  const line = (ax: number, ay: number, bx: number, by: number) => { path.moveTo(ax, ay); path.lineTo(bx, by); };
  switch (index) {
    case 1: case 14: line(x0, left, bottom, y1); break;
    case 2: case 13: line(bottom, y1, x1, right); break;
    case 3: case 12: line(x0, left, x1, right); break;
    case 4: case 11: line(top, y0, x1, right); break;
    case 6: case 9: line(top, y0, bottom, y1); break;
    case 7: case 8: line(x0, left, top, y0); break;
    case 5: line(x0, left, top, y0); line(bottom, y1, x1, right); break;
    case 10: line(top, y0, x1, right); line(x0, left, bottom, y1); break;
    default: break;
  }
}

function traceContours(field: Float32Array, cols: number, rows: number, interval: number, minor: Path2D, major: Path2D) {
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = field[j * cols + i], b = field[j * cols + i + 1];
      const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
      const x0 = i * CELL, y0 = j * CELL;
      const first = Math.ceil(Math.min(a, b, c, d) / interval);
      const last = Math.floor(Math.max(a, b, c, d) / interval);
      if (first > last) continue;
      const box = { x0, y0, x1: x0 + CELL, y1: y0 + CELL };
      for (let level = first; level <= last; level++) {
        const t = level * interval;
        const index = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
        if (index === 0 || index === 15) continue;
        cellSegments(level % INDEX_EVERY === 0 ? major : minor, index, box, {
          top: x0 + CELL * ((t - a) / (b - a)),
          right: y0 + CELL * ((t - b) / (c - b)),
          bottom: x0 + CELL * ((t - d) / (c - d)),
          left: y0 + CELL * ((t - a) / (d - a)),
        });
      }
    }
  }
}

function stepHill(hill: Hill, dt: number) {
  const follow = 1 - Math.exp(-HILL_FOLLOW * dt);
  hill.x += (hill.targetX - hill.x) * follow;
  hill.y += (hill.targetY - hill.y) * follow;
  const goal = hill.on ? 1 : 0;
  hill.amount += (goal - hill.amount) * (1 - Math.exp(-HILL_RISE * dt));
  return Math.abs(hill.targetX - hill.x) > 0.5 || Math.abs(hill.targetY - hill.y) > 0.5 || Math.abs(goal - hill.amount) > 0.002;
}

export default function TopoBackground({ className, children, interval = 0.07, speed = 1, interactive = true, seed = 26 }: TopoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(root && canvas && ctx)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = createNoise(seed);
    let width = 0, height = 0, cols = 0, rows = 0;
    let field = new Float32Array(0);
    let color = "";
    const hill: Hill = { x: 0, y: 0, targetX: 0, targetY: 0, amount: 0, on: false };
    const ripples: Ripple[] = [];
    let time = 0, last = 0, lastPaint = 0, raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1; rows = Math.ceil(height / CELL) + 1;
      field = new Float32Array(cols * rows);
      color = getComputedStyle(canvas).color;
    };

    const sample = (now: number) => {
      const z = time * 0.05, drift = time * 6;
      const hillOn = hill.amount > 0.001;
      const spread = 2 * HILL_SPREAD * HILL_SPREAD, ringWidth = 2 * RIPPLE_WIDTH * RIPPLE_WIDTH;
      for (let j = 0; j < rows; j++) {
        const y = j * CELL;
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          const nx = (x + drift) / TERRAIN_SCALE, ny = y / TERRAIN_SCALE;
          let v = noise(nx, ny, z) * 0.78 + noise(nx * 2.3 + 17.1, ny * 2.3 + 4.7, z * 1.4) * 0.22;
          if (hillOn) {
            const dx = x - hill.x, dy = y - hill.y;
            v += HILL_HEIGHT * hill.amount * Math.exp(-(dx * dx + dy * dy) / spread);
          }
          for (const ripple of ripples) {
            const age = now - ripple.start;
            const d = Math.hypot(x - ripple.x, y - ripple.y) - age * RIPPLE_SPEED;
            const fadeOut = 1 - age / RIPPLE_MS;
            v += RIPPLE_HEIGHT * fadeOut * fadeOut * Math.exp(-(d * d) / ringWidth) * Math.cos((d / RIPPLE_WAVELENGTH) * Math.PI * 2);
          }
          field[j * cols + i] = v;
        }
      }
    };

    const paint = (now: number) => {
      sample(now);
      const minor = new Path2D(), major = new Path2D();
      traceContours(field, cols, rows, interval, minor, major);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.16; ctx.lineWidth = 0.75; ctx.stroke(minor);
      ctx.globalAlpha = 0.34; ctx.lineWidth = 1.1; ctx.stroke(major);
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const hillMoving = stepHill(hill, dt);
      while (ripples.length > 0 && now - ripples[0].start > RIPPLE_MS) ripples.shift();
      const settling = hillMoving || ripples.length > 0;
      time += dt * speed;
      if (settling || now - lastPaint >= IDLE_FRAME_MS) { paint(now); lastPaint = now; }
      if (speed > 0 || settling) raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && visible && !reduceMotion) { last = 0; raf = requestAnimationFrame(frame); } };

    resize();
    paint(performance.now());
    canvas.style.opacity = "1";
    start();

    const resizeObserver = new ResizeObserver(() => { resize(); paint(performance.now()); });
    resizeObserver.observe(canvas);

    // para de desenhar quando sai da tela ou a aba vai para o fundo
    let onScreen = true;
    const updateVisible = () => { visible = onScreen && document.visibilityState === "visible"; if (visible) start(); };
    const intersection = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; updateVisible(); });
    intersection.observe(root);
    document.addEventListener("visibilitychange", updateVisible);

    const local = (event: PointerEvent) => { const r = canvas.getBoundingClientRect(); return { x: event.clientX - r.left, y: event.clientY - r.top }; };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return; // toque não tem "passar por cima"
      const point = local(event);
      if (!hill.on) { hill.x = point.x; hill.y = point.y; }
      hill.targetX = point.x; hill.targetY = point.y; hill.on = true;
      start();
    };
    const onLeave = () => { hill.on = false; start(); };
    const onDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a, button, input, textarea")) return; // cliques no conteúdo não são para o mapa
      ripples.push({ ...local(event), start: performance.now() });
      if (ripples.length > 4) ripples.shift();
      start();
    };
    if (interactive && !reduceMotion) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      root.addEventListener("pointerdown", onDown);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", updateVisible);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
    };
  }, [interval, speed, interactive, seed]);

  return (
    <div className={`topo${className ? ` ${className}` : ""}`} ref={rootRef}>
      {/* o mapa fica atrás, sem receber cliques; o conteúdo vem depois e fica por cima */}
      <div aria-hidden="true" className="topo-mapa">
        <canvas ref={canvasRef} />
      </div>
      {children}
    </div>
  );
}
