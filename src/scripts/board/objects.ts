import * as THREE from 'three';
import { C } from './textures';
import { rng } from './traces';

/** Paint on chrome: the material of everything dreamed rather than built. */
export function iridescent(tint = '#ffffff', rough = 0.16) {
  return new THREE.MeshPhysicalMaterial({
    color: tint,
    metalness: 0.92,
    roughness: rough,
    iridescence: 1,
    iridescenceIOR: 1.7,
    iridescenceThicknessRange: [180, 980],
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.6,
  });
}

export const matte = () => new THREE.MeshStandardMaterial({ color: '#0d0d24', roughness: 0.55, metalness: 0.25 });
export const goldMat = () => new THREE.MeshStandardMaterial({ color: C.gold, metalness: 1, roughness: 0.28, envMapIntensity: 1.2 });

function shadow<T extends THREE.Object3D>(o: T, cast = true, receive = false) {
  o.traverse((m) => {
    if ((m as THREE.Mesh).isMesh) {
      m.castShadow = cast;
      m.receiveShadow = receive;
    }
  });
  return o;
}

/* ---------- Chip: a project as an integrated circuit ---------- */
export function chip(w: number, d: number, lid: THREE.Texture, opts: { h?: number; lidAspect?: number } = {}) {
  const h = opts.h ?? 0.7;
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matte());
  body.position.y = h / 2 + 0.15;
  g.add(body);
  // lid art, inset
  const lidW = w * 0.9;
  const lidD = d * 0.86;
  lid.wrapS = lid.wrapT = THREE.ClampToEdgeWrapping;
  // cover-fit the art into the lid
  const img = lid.image as { width?: number; height?: number } | undefined;
  const aspect = img?.width && img?.height ? img.width / img.height : opts.lidAspect ?? 1.6;
  const lidAspect = lidW / lidD;
  if (aspect > lidAspect) {
    lid.repeat.set(lidAspect / aspect, 1);
    lid.offset.set((1 - lid.repeat.x) / 2, 0);
  } else {
    lid.repeat.set(1, aspect / lidAspect);
    lid.offset.set(0, (1 - lid.repeat.y) / 2);
  }
  const top = new THREE.Mesh(new THREE.PlaneGeometry(lidW, lidD), new THREE.MeshBasicMaterial({ map: lid, toneMapped: false }));
  top.rotation.x = -Math.PI / 2;
  top.position.y = h + 0.152;
  g.add(top);
  // gold pins along the long sides
  const pinCount = Math.max(6, Math.round(w / 0.55));
  const pinGeo = new THREE.BoxGeometry(0.22, 0.12, 0.5);
  const pins = new THREE.InstancedMesh(pinGeo, goldMat(), pinCount * 2);
  const m = new THREE.Matrix4();
  for (let i = 0; i < pinCount; i++) {
    const x = -w / 2 + (w / pinCount) * (i + 0.5);
    m.makeTranslation(x, 0.12, d / 2 + 0.22);
    pins.setMatrixAt(i, m);
    m.makeTranslation(x, 0.12, -d / 2 - 0.22);
    pins.setMatrixAt(pinCount + i, m);
  }
  g.add(pins);
  shadow(g);
  top.castShadow = false;
  return { group: g, top, height: h + 0.15 };
}

/* ---------- Knight: chess, the patient game ---------- */
export function knight() {
  const S = 0.045;
  const X = (x: number) => (x - 60) * S;
  const Y = (y: number) => (170 - y) * S;
  const body = new THREE.Shape();
  body.moveTo(X(34), Y(148));
  body.bezierCurveTo(X(34), Y(114), X(64), Y(108), X(60), Y(82));
  body.bezierCurveTo(X(46), Y(90), X(34), Y(98), X(22), Y(94));
  body.lineTo(X(14), Y(82));
  body.lineTo(X(40), Y(52));
  body.lineTo(X(46), Y(30));
  body.lineTo(X(60), Y(42));
  body.bezierCurveTo(X(86), Y(48), X(104), Y(72), X(104), Y(104));
  body.bezierCurveTo(X(104), Y(124), X(98), Y(138), X(94), Y(148));
  body.closePath();
  const geo = new THREE.ExtrudeGeometry(body, { depth: 1.4, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.14, bevelSegments: 4, curveSegments: 24 });
  geo.translate(0, 0, -0.7);
  const g = new THREE.Group();
  const k = new THREE.Mesh(geo, iridescent('#ffe9f6', 0.14));
  g.add(k);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.9, 48), iridescent('#e9e4ff', 0.2));
  base.position.y = 0.45;
  g.add(base);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 2.0, 0.35, 48), iridescent('#ffffff', 0.12));
  collar.position.y = 1.05;
  g.add(collar);
  k.position.y = 0.4;
  return shadow(g);
}

/* ---------- Door: an upright frame onto another sky ---------- */
export function door() {
  const g = new THREE.Group();
  const mat = iridescent('#f4f0ff', 0.12);
  const w = 5.2;
  const h = 9;
  const t = 0.55;
  const postGeo = new THREE.BoxGeometry(t, h, t);
  const l = new THREE.Mesh(postGeo, mat);
  l.position.set(-w / 2, h / 2, 0);
  const r = l.clone();
  r.position.x = w / 2;
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(w + t, t, t), mat);
  lintel.position.y = h;
  g.add(l, r, lintel);
  const sky = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5); }
      float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
      void main(){
        vec3 top = vec3(0.10, 0.35, 0.95), mid = vec3(0.20, 0.85, 0.85), low = vec3(0.96, 0.89, 0.30);
        float y = vUv.y;
        vec3 col = mix(low, mid, smoothstep(0.0, 0.45, y));
        col = mix(col, top, smoothstep(0.45, 1.0, y));
        float n = noise(vec2(vUv.x * 3.0 + uTime * 0.03, vUv.y * 6.0)) * 0.6 + noise(vec2(vUv.x * 7.0 - uTime * 0.05, vUv.y * 12.0)) * 0.4;
        float cloud = smoothstep(0.55, 0.85, n) * smoothstep(0.25, 0.7, y);
        col = mix(col, vec3(1.0), cloud * 0.85);
        gl_FragColor = vec4(col * 1.35, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(w - t, h - t / 2), sky);
  pane.position.y = (h - t / 2) / 2;
  g.add(pane);
  const back = pane.clone();
  back.rotation.y = Math.PI;
  g.add(back);
  shadow(g);
  pane.castShadow = back.castShadow = true;
  return { group: g, sky };
}

/* ---------- Melting trace: time going soft over the edge of a block ---------- */
export function meltingBlock() {
  const g = new THREE.Group();
  const block = new THREE.Mesh(new THREE.BoxGeometry(7, 4.2, 4.2), new THREE.MeshStandardMaterial({ color: '#16163c', roughness: 0.7, metalness: 0.2 }));
  block.position.y = 2.1;
  g.add(block);
  // silkscreen grid on the block top
  const lit = new THREE.MeshStandardMaterial({ color: C.phosphor, emissive: C.phosphor, emissiveIntensity: 1.4, roughness: 0.4 });
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.6, 4.24, 0.4),
    new THREE.Vector3(0.6, 4.24, 0.4),
    new THREE.Vector3(2.9, 4.2, 0.4),
    new THREE.Vector3(3.55, 3.9, 0.4),
    new THREE.Vector3(3.72, 3.0, 0.45),
    new THREE.Vector3(3.78, 1.9, 0.5),
    new THREE.Vector3(3.8, 1.1, 0.55),
  ]);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.16, 12, false), lit);
  tube.scale.z = 1;
  g.add(tube);
  // the pad at the end of the trace, sagging like a soft clock
  const padGeo = new THREE.SphereGeometry(0.55, 32, 16);
  padGeo.scale(1, 1.8, 0.5);
  const pad = new THREE.Mesh(padGeo, iridescent('#ffd88a', 0.12));
  pad.position.set(3.82, 0.95, 0.55);
  g.add(pad);
  // drips: paint, hanging and stretching
  const paint = [C.magenta, C.orange, C.acid, C.cyan, C.violet, C.blue];
  const drips: THREE.Mesh[] = [];
  const r = rng(11);
  for (let i = 0; i < 9; i++) {
    const len = 0.6 + r() * 1.8;
    const geo = new THREE.CapsuleGeometry(0.08 + r() * 0.1, len, 6, 12);
    geo.translate(0, -len / 2, 0);
    const m = new THREE.Mesh(geo, iridescent(paint[i % paint.length], 0.1));
    const side = r();
    // hang from the block's front and right edges
    if (side < 0.55) m.position.set(-3 + r() * 6.2, 4.2, 2.12);
    else m.position.set(3.52, 4.2, -1.8 + r() * 3.4);
    m.userData = { len, phase: r() * Math.PI * 2, speed: 0.2 + r() * 0.35 };
    drips.push(m);
    g.add(m);
  }
  // puddle
  const puddle = new THREE.Mesh(new THREE.CircleGeometry(1.6, 48), iridescent('#ff9ad1', 0.05));
  puddle.rotation.x = -Math.PI / 2;
  puddle.scale.set(1.4, 0.8, 1);
  puddle.position.set(4.4, 0.03, 1.4);
  g.add(puddle);
  shadow(g, true, true);
  puddle.castShadow = false;
  return {
    group: g,
    update(t: number) {
      for (const d of drips) {
        const u = d.userData as { len: number; phase: number; speed: number };
        d.scale.y = 1 + 0.35 * Math.sin(t * u.speed + u.phase);
      }
    },
  };
}

/* ---------- Lens: concentric rings that turn toward whoever looks ---------- */
export function lens() {
  const g = new THREE.Group();
  const rings: THREE.Mesh[] = [];
  [2.6, 1.95, 1.3].forEach((rad, i) => {
    // Less chrome than the other objects: a perfect mirror of the sky would vanish into it.
    const mat = iridescent(['#c9fff6', '#ffd6ee', '#fff2b8'][i], 0.28);
    mat.metalness = 0.55;
    mat.emissive = new THREE.Color([C.cyan, C.magenta, C.acid][i]);
    mat.emissiveIntensity = 0.22;
    const m = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.26 - i * 0.04, 32, 160), mat);
    rings.push(m);
    g.add(m);
  });
  const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 48, 24),
    new THREE.MeshPhysicalMaterial({ color: '#0b1d2a', metalness: 0.2, roughness: 0.05, emissive: C.cyan, emissiveIntensity: 0.9, clearcoat: 1, clearcoatRoughness: 0 }),
  );
  g.add(eye);
  shadow(g);
  return {
    group: g,
    update(t: number, target: THREE.Vector3) {
      rings[0].rotation.set(t * 0.21, t * 0.13, 0);
      rings[1].rotation.set(-t * 0.17, 0, t * 0.11);
      rings[2].rotation.set(0, -t * 0.25, t * 0.07);
      const look = target.clone();
      g.parent && g.parent.worldToLocal(look);
      const q = g.quaternion.clone();
      g.lookAt(target);
      g.quaternion.slerp(q, 0.9);
    },
  };
}

/* ---------- Gold solder joints: one per recognition ---------- */
export function goldJoints(n = 5) {
  const g = new THREE.Group();
  const mat = goldMat();
  for (let i = 0; i < n; i++) {
    const a = (i / (n - 1) - 0.5) * 1.6;
    const x = Math.sin(a) * 9;
    const z = -Math.cos(a) * 9 + 9;
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.18, 48), mat);
    pad.position.set(x, 0.09, z);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: '#ffe7a6', metalness: 1, roughness: 0.12, clearcoat: 1, envMapIntensity: 1.6 }));
    bead.scale.y = 0.75 + i * 0.12;
    bead.position.set(x, 0.18, z);
    g.add(pad, bead);
  }
  return shadow(g, true, true);
}

/* ---------- Passive components: the dense part of the board ---------- */
export function componentField(cx: number, cz: number, w: number, d: number, count = 260) {
  const r = rng(23);
  const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
  const bodies = new THREE.InstancedMesh(bodyGeo, new THREE.MeshStandardMaterial({ color: '#1a1a3e', roughness: 0.5, metalness: 0.2 }), count);
  const caps = new THREE.InstancedMesh(bodyGeo, new THREE.MeshStandardMaterial({ color: '#c9cbe0', roughness: 0.3, metalness: 1 }), count * 2);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const x = cx + (r() - 0.5) * w;
    const z = cz + (r() - 0.5) * d;
    const big = r() > 0.85;
    const L = big ? 1.6 : 0.7;
    const H = big ? 0.8 : 0.32;
    const W = big ? 1.0 : 0.38;
    const rot = r() > 0.5 ? 0 : Math.PI / 2;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot);
    m.compose(p.set(x, H / 2, z), q, s.set(L * 0.7, H, W));
    bodies.setMatrixAt(i, m);
    const off = new THREE.Vector3(L * 0.42, 0, 0).applyQuaternion(q);
    m.compose(p.set(x + off.x, H / 2, z + off.z), q, s.set(L * 0.16, H * 1.02, W * 1.02));
    caps.setMatrixAt(i * 2, m);
    m.compose(p.set(x - off.x, H / 2, z - off.z), q, s.set(L * 0.16, H * 1.02, W * 1.02));
    caps.setMatrixAt(i * 2 + 1, m);
  }
  const g = new THREE.Group();
  g.add(bodies, caps);
  bodies.castShadow = caps.castShadow = true;
  return g;
}

/* ---------- Monoliths: metaphysical towers on the horizon ---------- */
export function monolith(h: number, w = 3, d = 3) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: '#111130', roughness: 0.8, metalness: 0.1 }));
  body.position.y = h / 2;
  g.add(body);
  // arcade of lit windows, De Chirico style
  const winMat = new THREE.MeshBasicMaterial({ color: '#ffb36b', toneMapped: false });
  const rows = Math.floor(h / 3);
  for (let i = 0; i < rows; i++) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.3, 1.1), winMat);
    win.position.set(0, 2 + i * 3, d / 2 + 0.01);
    g.add(win);
  }
  return shadow(g);
}

/* ---------- Mirror: polished copper at the end of the signal ---------- */
export function mirror() {
  const g = new THREE.Group();
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(6, 9.5, 0.35),
    new THREE.MeshPhysicalMaterial({ color: '#e8a27c', metalness: 1, roughness: 0.035, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.9 }),
  );
  slab.position.y = 4.95;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.4, 1.4), goldMat());
  frame.position.y = 0.2;
  g.add(slab, frame);
  return shadow(g);
}

/* ---------- Portrait: the self-portrait assembled from paint particles ---------- */
export function portrait() {
  const geo = new THREE.BufferGeometry();
  const uniforms = { uAssemble: { value: 0 }, uTime: { value: 0 }, uSize: { value: 2.2 * Math.min(devicePixelRatio, 2) } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      attribute vec3 aScatter; attribute vec3 aColor; attribute float aRand;
      uniform float uAssemble; uniform float uTime; uniform float uSize;
      varying vec3 vColor; varying float vA;
      void main(){
        float k = clamp(uAssemble * 1.35 - aRand * 0.35, 0.0, 1.0);
        k = 1.0 - pow(1.0 - k, 3.0);
        vec3 p = mix(aScatter, position, k);
        p.z += sin(uTime * 0.8 + aRand * 20.0) * 0.06 * k;
        vColor = aColor; vA = 0.25 + 0.75 * k;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * (30.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor; varying float vA;
      void main(){
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        gl_FragColor = vec4(vColor, vA);
        #include <colorspace_fragment>
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;

  async function load(src: string, maxPts = 16000) {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    await img.decode().catch(() => {});
    if (!img.width) return;
    const H = 9;
    const aspect = img.width / img.height;
    const cols = Math.round(Math.sqrt(maxPts * aspect));
    const rows = Math.round(cols / aspect);
    const c = Object.assign(document.createElement('canvas'), { width: cols, height: rows });
    const g = c.getContext('2d', { willReadFrequently: true })!;
    g.drawImage(img, 0, 0, cols, rows);
    const data = g.getImageData(0, 0, cols, rows).data;
    const pos: number[] = [];
    const col: number[] = [];
    const sc: number[] = [];
    const rnd: number[] = [];
    const r = rng(5);
    const tmp = new THREE.Color();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const R = data[i] / 255;
        const G = data[i + 1] / 255;
        const B = data[i + 2] / 255;
        const max = Math.max(R, G, B);
        const min = Math.min(R, G, B);
        // drop paper-white background and near-black
        if ((max > 0.9 && max - min < 0.12) || max < 0.06) continue;
        const px = (x / cols - 0.5) * H * aspect;
        const py = (1 - y / rows) * H;
        pos.push(px, py, (r() - 0.5) * 0.2);
        tmp.setRGB(R, G, B, THREE.SRGBColorSpace);
        col.push(tmp.r, tmp.g, tmp.b);
        const a = r() * Math.PI * 2;
        const rad = 6 + r() * 14;
        sc.push(Math.cos(a) * rad, py + (r() - 0.3) * 10, Math.sin(a) * rad * 0.6 - 4);
        rnd.push(r());
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
    geo.setAttribute('aScatter', new THREE.Float32BufferAttribute(sc, 3));
    geo.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1));
    geo.computeBoundingSphere();
  }
  return { points, uniforms, load };
}
