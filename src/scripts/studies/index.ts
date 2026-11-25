// Creative-coding studies. Each one is a small, self-contained canvas program that starts when visible.
export interface Study {
  start(): void;
  stop(): void;
  reset(): void;
}

const PAL = { night: '#0a0a1c', phosphor: '#35f58a', violet: '#7b5cff', magenta: '#ff4fa3', cyan: '#3fe6d6', blue: '#3d86ff', orange: '#ff6a3d', acid: '#f2e23a', trace: '#2a2a63', silk: '#ecebff' };
const PAINT = [PAL.magenta, PAL.orange, PAL.acid, PAL.cyan, PAL.violet, PAL.blue];

function fit(canvas: HTMLCanvasElement) {
  const dpr = Math.min(devicePixelRatio, 2);
  const r = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(r.width * dpr));
  canvas.height = Math.max(1, Math.round(r.height * dpr));
  const g = canvas.getContext('2d')!;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { g, w: r.width, h: r.height, dpr };
}

function loop(step: (t: number, dt: number) => void, reduced: boolean): Study & { _t: number } {
  let raf = 0;
  let last = 0;
  const s = {
    _t: 0,
    start() {
      if (raf) return;
      last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        s._t += dt;
        step(s._t, dt);
        raf = reduced ? 0 : requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
    reset() {},
  };
  return s;
}

export async function mount(id: string, canvas: HTMLCanvasElement, opts: { reduced: boolean }): Promise<Study> {
  switch (id) {
    case 'soft-time':
      return softTime(canvas, opts.reduced);
    case 'perceptron':
      return perceptron(canvas, opts.reduced);
    case 'mirrors':
      return mirrors(canvas, opts.reduced);
    case 'swarm':
      return swarm(canvas, opts.reduced);
    case 'glyphs':
      return glyphs(canvas, opts.reduced);
  }
  return { start() {}, stop() {}, reset() {} };
}

/* ---------- Soft Time: the timeline's spine. The present is lit; the past melts into paint. ---------- */
function softTime(canvas: HTMLCanvasElement, reduced: boolean) {
  let { g, w, h } = fit(canvas);
  new ResizeObserver(() => ({ g, w, h } = fit(canvas))).observe(canvas);
  interface Drip {
    y: number;
    len: number;
    speed: number;
    color: string;
    x: number;
    r: number;
  }
  let drips: Drip[] = [];
  const spawn = (): Drip => ({ y: h * (0.12 + Math.random() * 0.85), len: 8 + Math.random() * 30, speed: 6 + Math.random() * 14, color: PAINT[(Math.random() * PAINT.length) | 0], x: (Math.random() - 0.5) * 6, r: 1.5 + Math.random() * 2.5 });
  const s = loop((t, dt) => {
    g.clearRect(0, 0, w, h);
    const cx = Math.min(w / 2, 24);
    // the trace: phosphor at the top (now), violet below (past)
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, PAL.phosphor);
    grad.addColorStop(0.1, PAL.phosphor);
    grad.addColorStop(0.18, PAL.violet);
    grad.addColorStop(1, '#3a2a8a');
    g.fillStyle = grad;
    g.fillRect(cx - 1.5, 0, 3, h);
    // the present: a pulsing pad
    const pulse = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * 2.2);
    g.fillStyle = PAL.phosphor;
    g.shadowColor = PAL.phosphor;
    g.shadowBlur = 16 * pulse;
    g.beginPath();
    g.arc(cx, 10, 6, 0, Math.PI * 2);
    g.fill();
    g.shadowBlur = 0;
    // drips of paint from the past
    if (drips.length < Math.max(10, h / 45) && Math.random() < dt * 6) drips.push(spawn());
    for (const d of drips) {
      d.len += d.speed * dt * (reduced ? 0 : 1);
      const x = cx + d.x * 0.2;
      g.strokeStyle = d.color;
      g.lineWidth = d.r * 1.2;
      g.lineCap = 'round';
      g.globalAlpha = Math.max(0, 1 - d.len / 120);
      g.beginPath();
      g.moveTo(x, d.y);
      g.lineTo(x + d.x * 0.6, d.y + d.len);
      g.stroke();
      g.fillStyle = d.color;
      g.beginPath();
      g.arc(x + d.x * 0.6, d.y + d.len, d.r * 1.3, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
    }
    drips = drips.filter((d) => d.len < 120);
  }, reduced);
  s.reset = () => (drips = []);
  return s;
}

/* ---------- Perceptron: a 2-16-1 network trained live with SGD ---------- */
function perceptron(canvas: HTMLCanvasElement, reduced: boolean) {
  let { g, w, h } = fit(canvas);
  new ResizeObserver(() => ({ g, w, h } = fit(canvas))).observe(canvas);
  const H = 16;
  let W1: number[][], b1: number[], W2: number[], b2: number;
  const init = () => {
    W1 = Array.from({ length: H }, () => [Math.random() * 2 - 1, Math.random() * 2 - 1].map((v) => v * 1.5));
    b1 = Array.from({ length: H }, () => Math.random() - 0.5);
    W2 = Array.from({ length: H }, () => (Math.random() * 2 - 1) * 0.5);
    b2 = 0;
  };
  init();
  let pts: { x: number; y: number; c: number }[] = [];
  const seed = () => {
    pts = [];
    // two interleaved moons: not linearly separable, so the hidden layer has to earn it
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI;
      const n = () => (Math.random() - 0.5) * 0.22;
      pts.push({ x: Math.cos(a) * 0.55 - 0.25 + n(), y: Math.sin(a) * 0.55 - 0.15 + n(), c: 1 });
      pts.push({ x: -Math.cos(a) * 0.55 + 0.25 + n(), y: -Math.sin(a) * 0.55 + 0.25 + n(), c: 0 });
    }
  };
  seed();
  const hid = new Array(H).fill(0);
  const fwd = (x: number, y: number) => {
    let o = b2;
    for (let j = 0; j < H; j++) {
      hid[j] = Math.tanh(W1[j][0] * x + W1[j][1] * y + b1[j]);
      o += W2[j] * hid[j];
    }
    return 1 / (1 + Math.exp(-o));
  };
  const train = (lr: number) => {
    for (let k = 0; k < 60; k++) {
      const p = pts[(Math.random() * pts.length) | 0];
      const out = fwd(p.x, p.y);
      const dOut = out - p.c;
      for (let j = 0; j < H; j++) {
        const dH = dOut * W2[j] * (1 - hid[j] * hid[j]);
        W2[j] -= lr * dOut * hid[j];
        W1[j][0] -= lr * dH * p.x;
        W1[j][1] -= lr * dH * p.y;
        b1[j] -= lr * dH;
      }
      b2 -= lr * dOut;
    }
  };
  let epoch = 0;
  const cols = 48;
  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    pts.push({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -(((e.clientY - r.top) / r.height) * 2 - 1), c: e.shiftKey || e.button === 2 ? 0 : 1 });
  });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  const s = loop(() => {
    train(0.08);
    epoch++;
    const rows = Math.round((cols * h) / w);
    const cw = w / cols;
    const ch = h / rows;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const o = fwd((i / cols) * 2 - 1, -((j / rows) * 2 - 1));
        // magenta ↔ cyan, the boundary lit in phosphor
        const edge = Math.exp(-Math.pow((o - 0.5) * 14, 2));
        const r = Math.round(255 * (1 - o) * 0.35 + 63 * o * 0.35 + 53 * edge);
        const gg = Math.round(79 * (1 - o) * 0.35 + 230 * o * 0.35 + 245 * edge * 0.8);
        const b = Math.round(163 * (1 - o) * 0.35 + 214 * o * 0.35 + 138 * edge * 0.6);
        g.fillStyle = `rgb(${r},${gg},${b})`;
        g.fillRect(i * cw, j * ch, cw + 1, ch + 1);
      }
    for (const p of pts) {
      g.fillStyle = p.c ? PAL.cyan : PAL.magenta;
      g.strokeStyle = PAL.night;
      g.lineWidth = 1.5;
      g.beginPath();
      g.arc(((p.x + 1) / 2) * w, ((1 - p.y) / 2) * h, 3.6, 0, Math.PI * 2);
      g.fill();
      g.stroke();
    }
    let correct = 0;
    for (const p of pts) correct += (fwd(p.x, p.y) > 0.5 ? 1 : 0) === p.c ? 1 : 0;
    g.fillStyle = PAL.silk;
    g.font = '600 10px "Martian Mono", monospace';
    g.fillText(`EPOCH ${String(epoch).padStart(5, '0')}   ACC ${((correct / pts.length) * 100).toFixed(1)}%`, 12, 20);
  }, reduced);
  s.reset = () => {
    init();
    seed();
    epoch = 0;
  };
  return s;
}

/* ---------- Hall of Mirrors: video feedback, as in live-coding sessions with Hydra ---------- */
function mirrors(canvas: HTMLCanvasElement, reduced: boolean) {
  let { g, w, h, dpr } = fit(canvas);
  const buf = document.createElement('canvas');
  const bg = buf.getContext('2d')!;
  const sizeBuf = () => {
    buf.width = canvas.width;
    buf.height = canvas.height;
  };
  sizeBuf();
  new ResizeObserver(() => {
    ({ g, w, h, dpr } = fit(canvas));
    sizeBuf();
  }).observe(canvas);
  let px = 0.5;
  let py = 0.5;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    px = (e.clientX - r.left) / r.width;
    py = (e.clientY - r.top) / r.height;
  });
  const hasFilter = 'filter' in g;
  const clear = () => {
    g.fillStyle = PAL.night;
    g.fillRect(0, 0, w, h);
  };
  clear();
  const s = loop((t) => {
    // copy the frame, then draw it back slightly zoomed, rotated and hue-shifted
    bg.setTransform(1, 0, 0, 1, 0, 0);
    bg.clearRect(0, 0, buf.width, buf.height);
    bg.drawImage(canvas, 0, 0);
    g.save();
    g.fillStyle = 'rgba(10,10,28,0.06)';
    g.fillRect(0, 0, w, h);
    g.translate(w * px, h * py);
    g.rotate(0.012 + (px - 0.5) * 0.04);
    const z = 1.018 + (0.5 - py) * 0.02;
    g.scale(z, z);
    g.translate(-w * px, -h * py);
    if (hasFilter) g.filter = 'hue-rotate(9deg) saturate(1.05)';
    g.globalAlpha = 0.965;
    g.drawImage(buf, 0, 0, w, h);
    g.restore();
    if (hasFilter) g.filter = 'none';
    // the seed: a rotating ring of phosphor and paint
    const cx = w / 2;
    const cy = h / 2;
    const n = 6;
    for (let i = 0; i < n; i++) {
      const a = t * 0.6 + (i / n) * Math.PI * 2;
      const rad = Math.min(w, h) * (0.12 + 0.05 * Math.sin(t * 0.9 + i));
      g.strokeStyle = i % 2 ? PAL.phosphor : PAINT[i % PAINT.length];
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
      g.lineTo(cx + Math.cos(a + 0.9) * rad * 1.15, cy + Math.sin(a + 0.9) * rad * 1.15);
      g.stroke();
    }
    void dpr;
  }, reduced);
  s.reset = clear;
  return s;
}

/* ---------- Swarm: genetic agents learn the route to the flower ---------- */
function swarm(canvas: HTMLCanvasElement, reduced: boolean) {
  let { g, w, h } = fit(canvas);
  new ResizeObserver(() => ({ g, w, h } = fit(canvas))).observe(canvas);
  const N = 90;
  const LIFE = 260;
  let flower = { x: 0.82, y: 0.25 };
  const wall = { x1: 0.3, x2: 0.68, y: 0.52 };
  type Agent = { genes: [number, number][]; x: number; y: number; vx: number; vy: number; done: number; dead: boolean; trail: number[] };
  const rnd = (): [number, number] => {
    const a = Math.random() * Math.PI * 2;
    return [Math.cos(a), Math.sin(a)];
  };
  const make = (genes?: [number, number][]): Agent => ({ genes: genes ?? Array.from({ length: LIFE }, rnd), x: 0.15, y: 0.85, vx: 0, vy: 0, done: 0, dead: false, trail: [] });
  let pop = Array.from({ length: N }, () => make());
  let step = 0;
  let gen = 1;
  let best = 0;
  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    flower = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  });
  const evolve = () => {
    const fit = pop.map((a) => {
      const d = Math.hypot(a.x - flower.x, a.y - flower.y);
      let f = 1 / (d * d + 0.002);
      if (a.done) f *= 8 * (LIFE / a.done);
      if (a.dead) f *= 0.1;
      return f;
    });
    const total = fit.reduce((s, v) => s + v, 0);
    const pick = () => {
      let r = Math.random() * total;
      for (let i = 0; i < pop.length; i++) if ((r -= fit[i]) <= 0) return pop[i];
      return pop[0];
    };
    best = pop.filter((a) => a.done).length;
    pop = pop.map(() => {
      const a = pick();
      const b = pick();
      const cut = (Math.random() * LIFE) | 0;
      const genes = a.genes.map((gene, i) => (Math.random() < 0.012 ? rnd() : i < cut ? gene : b.genes[i]));
      return make(genes);
    });
    step = 0;
    gen++;
  };
  const s = loop(() => {
    const steps = reduced ? 1 : 2;
    for (let k = 0; k < steps; k++) {
      for (const a of pop) {
        if (a.done || a.dead) continue;
        const [gx, gy] = a.genes[step];
        a.vx = (a.vx + gx * 0.0009) * 0.985;
        a.vy = (a.vy + gy * 0.0009) * 0.985;
        a.x += a.vx;
        a.y += a.vy;
        if (step % 6 === 0) a.trail.push(a.x, a.y);
        if (Math.hypot(a.x - flower.x, a.y - flower.y) < 0.035) a.done = step || 1;
        if (a.x < 0 || a.x > 1 || a.y < 0 || a.y > 1 || (a.y > wall.y - 0.01 && a.y < wall.y + 0.01 && a.x > wall.x1 && a.x < wall.x2)) a.dead = true;
      }
      step++;
      if (step >= LIFE) evolve();
    }
    g.fillStyle = PAL.night;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = PAL.trace;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(wall.x1 * w, wall.y * h);
    g.lineTo(wall.x2 * w, wall.y * h);
    g.stroke();
    for (const a of pop) {
      g.strokeStyle = a.done ? 'rgba(53,245,138,0.5)' : 'rgba(123,92,255,0.18)';
      g.lineWidth = 1;
      g.beginPath();
      for (let i = 0; i < a.trail.length; i += 2) (i ? g.lineTo : g.moveTo).call(g, a.trail[i] * w, a.trail[i + 1] * h);
      g.stroke();
      g.fillStyle = a.dead ? '#3a3a6a' : a.done ? PAL.phosphor : PAL.acid;
      g.fillRect(a.x * w - 1.5, a.y * h - 1.5, 3, 3);
    }
    // the flower
    const fx = flower.x * w;
    const fy = flower.y * h;
    for (let i = 0; i < 6; i++) {
      const an = (i / 6) * Math.PI * 2;
      g.fillStyle = PAINT[i];
      g.beginPath();
      g.arc(fx + Math.cos(an) * 6, fy + Math.sin(an) * 6, 4.5, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = PAL.silk;
    g.font = '600 10px "Martian Mono", monospace';
    g.fillText(`GEN ${String(gen).padStart(3, '0')}   ARRIVED ${best}/${N}`, 12, 20);
  }, reduced);
  s.reset = () => {
    pop = Array.from({ length: N }, () => make());
    step = 0;
    gen = 1;
    best = 0;
  };
  return s;
}

/* ---------- Glyph rain: columns of the languages I write, falling behind a quote ---------- */
function glyphs(canvas: HTMLCanvasElement, reduced: boolean) {
  let { g, w, h } = fit(canvas);
  const TOKENS = ['Verse', ':=', '<decides>', '<transacts>', 'spawn', 'race', 'sync', 'vec3', 'uniform', '#include', 'float', '0x1F', '{ }', '[ ]', '?', 'set', 'var', 'if', '01', '10', 'λ', '∆'];
  const size = 15;
  let cols = 0;
  let drops: { y: number; v: number; t: string }[] = [];
  const seed = () => {
    cols = Math.ceil(w / (size * 3.2));
    drops = Array.from({ length: cols }, () => ({ y: Math.random() * h, v: 18 + Math.random() * 40, t: TOKENS[(Math.random() * TOKENS.length) | 0] }));
    g.fillStyle = PAL.night;
    g.fillRect(0, 0, w, h);
  };
  seed();
  new ResizeObserver(() => {
    ({ g, w, h } = fit(canvas));
    seed();
  }).observe(canvas);
  const s = loop((_t, dt) => {
    g.fillStyle = 'rgba(10,10,28,0.09)';
    g.fillRect(0, 0, w, h);
    g.font = `600 ${size}px "Martian Mono", monospace`;
    drops.forEach((d, i) => {
      d.y += d.v * dt;
      if (Math.floor(d.y / size) !== Math.floor((d.y - d.v * dt) / size)) {
        g.fillStyle = Math.random() > 0.93 ? PAL.silk : i % 9 === 0 ? PAL.magenta : PAL.phosphor;
        g.globalAlpha = 0.35 + Math.random() * 0.5;
        g.fillText(d.t, i * size * 3.2, Math.floor(d.y / size) * size);
        g.globalAlpha = 1;
      }
      if (d.y > h + 20) {
        d.y = -20;
        d.t = TOKENS[(Math.random() * TOKENS.length) | 0];
      }
    });
  }, reduced);
  s.reset = seed;
  return s;
}
