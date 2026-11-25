import * as THREE from 'three';
import { gsap } from 'gsap';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { C, boardTile, silkTexture, lidTexture, loadTex, fontsReady } from './textures';
import { buildTraces, route, rng, type P } from './traces';
import { chip, knight, door, meltingBlock, lens, goldJoints, componentField, monolith, mirror, portrait, iridescent } from './objects';

type V3 = [number, number, number];
interface Station {
  cam: V3;
  look: V3;
  ground: P; // where the main signal trace passes
}

// The signal path: one station per chapter, receding toward the horizon.
const STATIONS: Record<string, Station> = {
  boot: { cam: [-2.2, 4.4, 15], look: [-2.8, 3.0, -4], ground: [-8, 6] },
  simulacra: { cam: [9, 9, 0], look: [24, 0.6, -20], ground: [14, -8] },
  recognition: { cam: [30, 5.5, -26], look: [36, 0.8, -44], ground: [30, -36] },
  capabilities: { cam: [-42, 19, -8], look: [-60, 0, -31], ground: [-40, -14] },
  virtual: { cam: [16, 6, -48], look: [5, 4.2, -66], ground: [10, -58] },
  time: { cam: [-6, 6.2, -71], look: [-17, 2.6, -84], ground: [-12, -76] },
  seeing: { cam: [-2, 6.5, -96], look: [10, 5, -118], ground: [2, -108] },
  becoming: { cam: [33, 6.5, -140], look: [46, 4.6, -158], ground: [38, -148] },
  mirror: { cam: [44, 4.6, -168], look: [50, 4.8, -186], ground: [50, -176] },
};

export async function createBoard(canvas: HTMLCanvasElement, opts: { reduced: boolean; sections: HTMLElement[] }) {
  const coarse = matchMedia('(pointer: coarse)').matches || innerWidth < 900;
  const high = !coarse && (navigator.hardwareConcurrency ?? 4) >= 4;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: high, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, high ? 1.5 : 1.1));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = high;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const FOG = new THREE.Color('#3a1d5e');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(FOG, 0.0062);
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.3, 1200);

  await fontsReady();

  /* ---------- Sky: night above, a violet-to-magenta horizon, a low sun ---------- */
  const SUN_DIR = new THREE.Vector3(-0.35, 0.09, -1).normalize();
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color('#07071a') },
      uMid: { value: new THREE.Color('#2b1a66') },
      uHorizon: { value: FOG.clone() },
      uGlow: { value: new THREE.Color(C.magenta) },
      uSun: { value: SUN_DIR },
      uSunColor: { value: new THREE.Color('#ffb48a') },
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop, uMid, uHorizon, uGlow, uSun, uSunColor; varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719))) * 43758.5453); }
      void main(){
        float h = vDir.y;
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.16, h));
        col = mix(col, uTop, smoothstep(0.14, 0.55, h));
        col += uGlow * exp(-abs(h) * 22.0) * 0.55;
        float s = max(dot(normalize(vDir), uSun), 0.0);
        col += uSunColor * (pow(s, 900.0) * 3.0 + pow(s, 24.0) * 0.35 + pow(s, 4.0) * 0.08);
        vec3 q = floor(vDir * 420.0);
        float star = step(0.9975, hash(q)) * smoothstep(0.12, 0.5, h);
        col += vec3(star) * 0.8;
        if (h < 0.0) col = mix(uHorizon, uHorizon * 0.6, smoothstep(0.0, -0.2, h));
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 24), skyMat);
  sky.renderOrder = -1;
  scene.add(sky);

  /* ---------- Environment for reflections: the sky plus bands of paint ---------- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMat.clone()));
  const paint = [C.magenta, C.cyan, C.phosphor, C.orange, C.violet, C.blue, C.acid];
  paint.forEach((c, i) => {
    const band = new THREE.Mesh(new THREE.PlaneGeometry(14, 60), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
    const a = (i / paint.length) * Math.PI * 2;
    band.position.set(Math.cos(a) * 30, 6, Math.sin(a) * 30);
    band.lookAt(0, 6, 0);
    band.rotation.z = 0.5;
    env.add(band);
  });
  scene.environment = pmrem.fromScene(env, 0.035).texture;

  /* ---------- Light: a low sun that throws long shadows toward the viewer ---------- */
  scene.add(new THREE.HemisphereLight('#6a52d8', '#0a0a1c', 1.1));
  const sun = new THREE.DirectionalLight('#ffc2a8', 2.6);
  sun.castShadow = high;
  sun.shadow.mapSize.set(1536, 1536);
  Object.assign(sun.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 180 });
  sun.shadow.autoUpdate = false;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);
  const cursorLight = new THREE.PointLight(C.phosphor, 0, 14, 1.6);
  scene.add(cursorLight);

  /* ---------- The board ---------- */
  const tile = boardTile();
  tile.repeat.set(90, 90);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(720, 720), new THREE.MeshStandardMaterial({ map: tile, roughness: 0.82, metalness: 0.15, color: '#ffffff' }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(10, 0, -90);
  ground.receiveShadow = true;
  scene.add(ground);

  const r = rng(2026);
  const order = opts.sections.map((s) => s.dataset.chapter!).filter((id) => STATIONS[id]);
  const st = order.map((id) => STATIONS[id]);

  // Main signal: J1 → every station.
  const mainPts: P[] = [[-16, 40]];
  const alongAt: number[] = [];
  let acc = 0;
  const pushRoute = (a: P, b: P, zFirst: boolean) => {
    const seg = route(a, b, zFirst).slice(1);
    let prev = a;
    for (const p of seg) {
      acc += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      mainPts.push(p);
      prev = p;
    }
  };
  st.forEach((s, i) => {
    pushRoute(mainPts[mainPts.length - 1], s.ground, i % 2 === 0);
    alongAt.push(acc);
  });

  const traces: Parameters<typeof buildTraces>[0] = [{ pts: mainPts, width: 0.5, kind: 1, seed: 0 }];
  // Ambient buses: parallel traces with a jog, the texture of a real layout.
  const buses = high ? 70 : 38;
  for (let b = 0; b < buses; b++) {
    const x = -70 + r() * 170;
    const z = -230 + r() * 280;
    const horizontal = r() > 0.5;
    const len = 12 + r() * 46;
    const jog = (r() > 0.5 ? 1 : -1) * (2 + r() * 6);
    const n = 2 + Math.floor(r() * 5);
    for (let k = 0; k < n; k++) {
      const o = k * 0.75;
      const a: P = horizontal ? [x, z + o] : [x + o, z];
      const end: P = horizontal ? [x + len, z + o + jog] : [x + o + jog, z - len];
      traces.push({ pts: route(a, end, !horizontal), width: 0.22, kind: 0, seed: r() });
    }
  }
  const tr = buildTraces(traces);
  scene.add(tr.mesh);

  // Pads at trace ends.
  const padMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 20), new THREE.MeshStandardMaterial({ color: C.gold, metalness: 1, roughness: 0.32 }), tr.pads.length);
  const m4 = new THREE.Matrix4();
  tr.pads.forEach(([x, z], i) => {
    m4.makeTranslation(x, 0.04, z);
    padMesh.setMatrixAt(i, m4);
  });
  padMesh.receiveShadow = true;
  scene.add(padMesh);

  /* ---------- Silkscreen on the board ---------- */
  const silk = (tex: THREE.Texture, w: number, h: number, x: number, z: number, rot = 0, opacity = 1) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity, depthWrite: false, toneMapped: false }));
    m.rotation.set(-Math.PI / 2, 0, rot);
    m.position.set(x, 0.045, z);
    m.renderOrder = 2;
    scene.add(m);
    return m;
  };
  silk(silkTexture([{ text: 'ANDRÉS ORDÓÑEZ-BOLAÑOS', size: 150 }, { text: 'REV 2026 · J1 PASTO, COLOMBIA · SIGNAL PATH', size: 40, mono: true, color: C.silk }], 2048, 256), 40, 5, 4, -34, 0, 0.75);

  /* ---------- Chips: the shipped games ---------- */
  const lidData: { title: string; cover: string }[] = JSON.parse(document.getElementById('lid-data')?.textContent || '[]');
  const tex = new Map<string, THREE.Texture>();
  await Promise.all(
    [...new Set(lidData.map((l) => l.cover))].map(async (url) => tex.set(url, await loadTex(url))),
  );
  const T = (slug: string) => tex.get(`/img/projects/${slug}.webp`) ?? lidTexture(slug, '', C.magenta);
  const chipDefs: { ref: string; name: string; tex: THREE.Texture; w: number; d: number; at: P }[] = [
    { ref: 'U1', name: 'STEAL AN EGG', tex: T('steal-an-egg'), w: 8.4, d: 4.8, at: [23, -17] },
    { ref: 'U2', name: 'ORCS MUST DIE!', tex: T('orcs-must-die'), w: 7, d: 3.6, at: [14, -10] },
    { ref: 'U3', name: 'HAVOC HOTEL 2', tex: T('havoc-hotel-2'), w: 6, d: 3.4, at: [15, -26] },
    { ref: 'U4', name: 'HAVOC HOTEL 3', tex: T('havoc-hotel-3'), w: 6, d: 3.4, at: [32, -25] },
    { ref: 'U5', name: 'RAPTOR HEIST', tex: T('raptor-heist'), w: 6, d: 3.4, at: [24, -31] },
    { ref: 'U6', name: 'D&D ZOMBIE DRAGON', tex: T('dnd-zombie-dragon'), w: 5.6, d: 3.2, at: [34, -14] },
    { ref: 'U7', name: 'CLAYFACE × HAVOC HOTEL', tex: lidTexture('Clayface × Havoc Hotel', 'U7', C.violet), w: 5, d: 3.2, at: [6, -22] },
    { ref: 'U8', name: 'MEL-TED’S MULTI-PIT', tex: T('melted-multi-pit'), w: 5, d: 3, at: [29, -6] },
  ];

  // The hero monolith: one chip standing on its edge whose lid cycles through every shipped game.
  const hero = { w: 9.6, d: 5.4 };
  const heroChip = chip(hero.w, hero.d, T('steal-an-egg'), { h: 0.9 });
  const heroRig = new THREE.Group();
  heroRig.rotation.x = 1.22;
  heroRig.position.set(-0.5, (hero.d / 2) * Math.sin(1.22) + 0.35, -9);
  heroRig.add(heroChip.group);
  scene.add(heroRig);
  const u1 = heroChip.group;
  const u1Size: V3 = [hero.w, heroChip.height, hero.d];
  const lidAspect = (hero.w * 0.9) / (hero.d * 0.86);
  const fit = (t: THREE.Texture) => {
    const img = t.image as { width?: number; height?: number } | undefined;
    const a = img?.width && img?.height ? img.width / img.height : 1.78;
    return a > lidAspect ? new THREE.Vector4(lidAspect / a, 1, (1 - lidAspect / a) / 2, 0) : new THREE.Vector4(1, a / lidAspect, 0, (1 - a / lidAspect) / 2);
  };
  const cycle = lidData.map((l) => tex.get(l.cover)!).filter(Boolean);
  const lidU = {
    uA: { value: cycle[0] },
    uB: { value: cycle[1 % cycle.length] },
    uFA: { value: fit(cycle[0]) },
    uFB: { value: fit(cycle[1 % cycle.length]) },
    uMix: { value: 0 },
    uTime: { value: 0 },
  };
  heroChip.top.material = new THREE.ShaderMaterial({
    uniforms: lidU,
    toneMapped: false,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uA, uB; uniform vec4 uFA, uFB; uniform float uMix, uTime; varying vec2 vUv;
      float hash(float n){ return fract(sin(n) * 43758.5453); }
      void main(){
        // Banded wipe with a horizontal glitch shear while the signal switches.
        float band = floor(vUv.y * 22.0);
        float t = smoothstep(hash(band * 7.13) * 0.7, hash(band * 7.13) * 0.7 + 0.3, uMix);
        float glitch = sin(uMix * 3.14159);
        float shear = (hash(band + floor(uTime * 24.0)) - 0.5) * 0.06 * glitch;
        vec2 uv = vec2(vUv.x + shear, vUv.y);
        vec3 a = texture2D(uA, uv * uFA.xy + uFA.zw).rgb;
        vec3 b = texture2D(uB, uv * uFB.xy + uFB.zw).rgb;
        vec3 col = mix(a, b, t);
        col.r = mix(col.r, texture2D(uB, (uv + vec2(0.006 * glitch, 0.0)) * uFB.xy + uFB.zw).r, t * glitch);
        col *= 0.94 + 0.06 * sin(vUv.y * 900.0);
        col += vec3(0.21, 0.96, 0.54) * glitch * 0.12 * step(0.92, hash(band + floor(uTime * 12.0)));
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  let lidIndex = 0;
  let lidNext = 4.5;

  for (const c of chipDefs) {
    const k = chip(c.w, c.d, c.tex, { h: 0.7 });
    k.group.position.set(c.at[0], 0, c.at[1]);
    scene.add(k.group);
    silk(silkTexture([{ text: `${c.ref}  ${c.name}`, size: 54, mono: true }], 1024, 80), c.w, c.w * 0.078, c.at[0], c.at[1] + c.d / 2 + 0.95, 0, 0.85);
    // fan-out traces from the pins
    const fan: Parameters<typeof buildTraces>[0] = [];
    for (let i = 0; i < 4; i++) {
      const x = c.at[0] - c.w / 2 + (c.w / 4) * (i + 0.5);
      fan.push({ pts: route([x, c.at[1] - c.d / 2 - 0.5], [x + (i - 1.5) * 1.5, c.at[1] - c.d / 2 - 5 - r() * 4], true), width: 0.18, kind: 0, seed: r() });
      fan.push({ pts: route([x, c.at[1] + c.d / 2 + 0.5], [x - (i - 1.5) * 1.2, c.at[1] + c.d / 2 + 2.2 + r() * 2], true), width: 0.18, kind: 0, seed: r() });
    }
    const f = buildTraces(fan);
    f.mesh.material = tr.mesh.material;
    scene.add(f.mesh);
  }

  /* ---------- Objects of the dream ---------- */
  const k = knight();
  // A small knight on the plaza between the reading column and the chip's base.
  k.position.set(-3.9, 0, 4.6);
  k.rotation.y = 0.7;
  k.scale.setScalar(0.2);
  scene.add(k);

  // A second door far on the horizon: the visitor sees where the signal leads before walking there.
  const farDoor = door();
  // It floats above the horizon, a door with nothing to hold it.
  farDoor.group.position.set(-21, 8.5, -64);
  farDoor.group.rotation.y = 0.25;
  farDoor.group.scale.setScalar(1.3);
  scene.add(farDoor.group);

  // Time already melting at the first viewport's lower edge.
  const melt0 = meltingBlock();
  melt0.group.position.set(-0.8, 0, 3.2);
  melt0.group.rotation.y = -0.75;
  melt0.group.scale.setScalar(0.4);
  scene.add(melt0.group);

  const d = door();
  d.group.position.set(5, 0, -66);
  d.group.rotation.y = -0.55;
  scene.add(d.group);

  const melt = meltingBlock();
  melt.group.position.set(-17, 0, -84);
  melt.group.rotation.y = 0.4;
  scene.add(melt.group);

  const ln = lens();
  ln.group.position.set(10, 5.6, -118);
  ln.group.scale.setScalar(1.6);
  scene.add(ln.group);
  const lensBase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.6, 8), iridescent());
  lensBase.position.set(10, 0.8, -118);
  scene.add(lensBase);

  const joints = goldJoints();
  joints.position.set(36, 0, -50);
  scene.add(joints);

  scene.add(componentField(-60, -32, 30, 22, high ? 320 : 160));

  const por = portrait();
  por.points.position.set(46, 0.4, -158);
  por.points.lookAt(33, 0.4, -140);
  scene.add(por.points);
  por.load('/img/portraits/transhumanism.webp', high ? 18000 : 8000);

  const mir = mirror();
  mir.position.set(54, 0, -186);
  mir.lookAt(45, 0, -168);
  scene.add(mir);
  // A true reflection: the visitor sees the board, and the path they walked, in polished copper.
  const reflector = new Reflector(new THREE.PlaneGeometry(5.6, 9.1), {
    color: new THREE.Color('#d9a585'),
    textureWidth: Math.round(innerWidth * (high ? 0.6 : 0.35)),
    textureHeight: Math.round(innerHeight * (high ? 0.6 : 0.35)),
  });
  reflector.position.set(0, 4.95, 0.19);
  mir.add(reflector);
  const k2 = knight();
  k2.scale.setScalar(0.6);
  k2.position.set(58.5, 0, -181);
  k2.rotation.y = -2.3;
  scene.add(k2);

  // Metaphysical towers on the far horizon.
  for (const [x, z, h] of [
    [-52, -60, 26],
    [-44, -150, 38],
    [-30, -210, 30],
    [78, -112, 34],
    [92, -200, 44],
    [70, -40, 22],
  ] as V3[]) {
    const mo = monolith(h, 3.4, 3.4);
    mo.position.set(x, 0, z);
    mo.lookAt(10, 0, 20);
    scene.add(mo);
  }

  if (!high) {
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshPhysicalMaterial | undefined;
      if (m && 'transmission' in m) m.transmission = 0;
    });
  }

  /* ---------- Camera rail driven by scroll ---------- */
  let tops: number[] = [];
  const measure = () => {
    tops = opts.sections.filter((s) => STATIONS[s.dataset.chapter!]).map((s) => s.getBoundingClientRect().top + scrollY);
  };
  measure();
  new ResizeObserver(measure).observe(document.body);

  const v = (a: V3) => new THREE.Vector3(...a);
  const camPos = v(st[0].cam);
  const camLook = v(st[0].look);
  const tgtPos = camPos.clone();
  const tgtLook = camLook.clone();
  let progress = 0;
  const pointer = new THREE.Vector2();
  const pointerWorld = new THREE.Vector3(9999, 0, 9999);
  const state = { lift: 0, xray: 0, view: 'territory' as 'map' | 'territory' };

  const ease = (t: number) => t * t * (3 - 2 * t);
  function rail() {
    const y = scrollY + innerHeight * 0.4;
    let i = 0;
    while (i < tops.length - 1 && y >= tops[i + 1]) i++;
    const span = (tops[i + 1] ?? tops[i] + innerHeight) - tops[i];
    const local = Math.min(Math.max((y - tops[i]) / span, 0), 1);
    // Hold on a station while its chapter is read, travel on the way out.
    const t = ease(Math.min(Math.max((local - 0.5) / 0.5, 0), 1));
    const a = st[i];
    const b = st[Math.min(i + 1, st.length - 1)];
    tgtPos.lerpVectors(v(a.cam), v(b.cam), t);
    tgtLook.lerpVectors(v(a.look), v(b.look), t);
    progress = i + t;
    const sig = alongAt[i] + (alongAt[Math.min(i + 1, alongAt.length - 1)] - alongAt[i]) * t;
    tr.uniforms.uSignal.value = sig;
  }

  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  addEventListener(
    'pointermove',
    (e) => {
      pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      ray.setFromCamera(pointer, camera);
      ray.ray.intersectPlane(plane, pointerWorld);
    },
    { passive: true },
  );

  function layout() {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Shift the frame so the subject sits right of the reading column.
    if (w > 900) camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
    // On phones the text column is full width: push the subject into the lower part of the frame.
    else camera.setViewOffset(w, h, 0, -h * 0.3, w, h);
    camera.updateProjectionMatrix();
  }
  layout();
  addEventListener('resize', layout);

  const xrayMat = new THREE.MeshBasicMaterial({ color: C.phosphor, wireframe: true, transparent: true, opacity: 0.55 });
  const focus = (id: string) => Math.max(0, 1 - Math.abs(progress - order.indexOf(id)));

  const clock = new THREE.Clock();
  let running = true;
  let active = true;
  let tick = 0;
  let visible = true;
  document.addEventListener('visibilitychange', () => (visible = !document.hidden));

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    if (!visible || !active || (state.view === 'map' && state.lift >= 0.999)) return;
    // Shadows are the costliest pass: refresh them while the camera travels, sparsely at rest.
    tick++;
    sun.shadow.needsUpdate = camPos.distanceToSquared(tgtPos) > 0.0004 || tick % 6 === 0;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = opts.reduced ? 0 : clock.elapsedTime;
    rail();
    const damp = opts.reduced ? 1 : 1 - Math.exp(-dt * 3.2);
    camPos.lerp(tgtPos, damp);
    camLook.lerp(tgtLook, damp);

    const pos = camPos.clone();
    if (!opts.reduced) {
      pos.x += Math.sin(t * 0.12) * 0.5 + pointer.x * 0.6;
      pos.y += Math.sin(t * 0.17) * 0.25 + pointer.y * 0.35;
    }
    // Map view: rise to look straight down on the board.
    if (state.lift > 0) pos.lerp(new THREE.Vector3(camLook.x, 90, camLook.z + 0.01), state.lift);
    camera.position.copy(pos);
    camera.lookAt(camLook);

    sun.position.set(camLook.x - 34, 20, camLook.z - 46);
    sun.target.position.copy(camLook);
    sky.position.copy(camera.position);

    tr.uniforms.uTime.value = t;
    tr.uniforms.uCam.value.copy(camera.position);
    tr.uniforms.uPointer.value.copy(pointerWorld);
    cursorLight.position.set(pointerWorld.x, 2.2, pointerWorld.z);
    cursorLight.intensity = 22;

    // Hero lid: hold a game, glitch to the next, tell the page which one is showing.
    lidU.uTime.value = clock.elapsedTime;
    if (cycle.length > 1 && !opts.reduced) {
      const now = clock.elapsedTime;
      if (now > lidNext) {
        // The chip turns on its axis like a card: edge-on at the midpoint, where the art swaps.
        const k2 = Math.min((now - lidNext) / 1.1, 1);
        const half = k2 < 0.5 ? k2 * 2 : (k2 - 0.5) * 2;
        const eased = half * half * (3 - 2 * half);
        heroChip.group.rotation.z = k2 < 0.5 ? (eased * Math.PI) / 2 : (-(1 - eased) * Math.PI) / 2;
        lidU.uMix.value = k2 < 0.5 ? 0 : 1;
        sun.shadow.needsUpdate = true;
        if (k2 >= 1) {
          lidIndex = (lidIndex + 1) % cycle.length;
          lidU.uA.value = cycle[lidIndex];
          lidU.uFA.value = fit(cycle[lidIndex]);
          const nb = (lidIndex + 1) % cycle.length;
          lidU.uB.value = cycle[nb];
          lidU.uFB.value = fit(cycle[nb]);
          lidU.uMix.value = 0;
          heroChip.group.rotation.z = 0;
          lidNext = now + 4.5;
          dispatchEvent(new CustomEvent('lidchange', { detail: lidIndex }));
        } else if (k2 > 0.45 && !(lidU as any)._told) {
          (lidU as any)._told = true;
          dispatchEvent(new CustomEvent('lidswap', { detail: (lidIndex + 1) % cycle.length }));
        }
        if (k2 >= 1) (lidU as any)._told = false;
      }
    }
    d.sky.uniforms.uTime.value = t;
    farDoor.sky.uniforms.uTime.value = t;
    melt.update(t);
    melt0.update(t * 0.8);
    ln.update(t, camera.position);
    por.uniforms.uTime.value = t;
    const fb = focus('becoming');
    // Fully assembled whenever the camera is at (or near) the Becoming station.
    por.uniforms.uAssemble.value += ((fb > 0.25 ? 1 : 0) - por.uniforms.uAssemble.value) * 0.06;
    k.rotation.y = 0.7 + Math.sin(t * 0.15) * 0.08;
    // Only pay for the reflection pass when the mirror is near.
    reflector.visible = progress > order.length - 2.6;
    por.points.visible = progress > order.length - 4;

    scene.overrideMaterial = state.xray > 0.5 ? xrayMat : null;
    renderer.render(scene, camera);
  }
  frame();

  return {
    setView(view: 'map' | 'territory') {
      state.view = view;
      gsap.to(state, { lift: view === 'map' ? 1 : 0, duration: view === 'map' ? 0.9 : 1.6, ease: view === 'map' ? 'power2.in' : 'expo.out' });
      if (view === 'territory') clock.getDelta();
    },
    setActive(on: boolean) {
      if (on && !active) clock.getDelta();
      active = on;
    },
    setXray(on: boolean) {
      state.xray = on ? 1 : 0;
    },
    setPortrait(src: string) {
      por.uniforms.uAssemble.value = 0;
      por.load(src, high ? 18000 : 8000);
    },
    anchor(name: string) {
      if (name !== 'u1') return null;
      const p = u1.localToWorld(new THREE.Vector3(u1Size[0] * 0.45, u1Size[1] + 0.2, -u1Size[2] * 0.42)).project(camera);
      return { x: (p.x * 0.5 + 0.5) * innerWidth, y: (-p.y * 0.5 + 0.5) * innerHeight, visible: p.z < 1 && progress < 0.6 };
    },
    get progress() {
      return progress;
    },
    _debug: { scene, camera, lens: ln.group },
    dispose() {
      running = false;
      renderer.dispose();
    },
  };
}
