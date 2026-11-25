import * as THREE from 'three';
import { C } from './textures';

export type P = [number, number]; // x, z

/** Seeded RNG so the board is the same on every visit. */
export function rng(seed = 7) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** PCB-style route between two points: straight, a 45° chamfer, straight. */
export function route(a: P, b: P, zFirst = true): P[] {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const diag = Math.min(Math.abs(dx), Math.abs(dz));
  const sx = Math.sign(dx);
  const sz = Math.sign(dz);
  if (zFirst) {
    const straight = Math.abs(dz) - diag;
    const p1: P = [a[0], a[1] + sz * straight * 0.5];
    const p2: P = [p1[0] + sx * diag, p1[1] + sz * diag];
    return [a, p1, p2, b];
  }
  const straight = Math.abs(dx) - diag;
  const p1: P = [a[0] + sx * straight * 0.5, a[1]];
  const p2: P = [p1[0] + sx * diag, p1[1] + sz * diag];
  return [a, p1, p2, b];
}

interface Trace {
  pts: P[];
  width: number;
  kind: 0 | 1; // 0 ambient, 1 main signal
  seed: number;
  start?: number; // along offset
}

export function buildTraces(traces: Trace[]) {
  const pos: number[] = [];
  const along: number[] = [];
  const kind: number[] = [];
  const seed: number[] = [];
  const idx: number[] = [];
  const pads: P[] = [];
  let v = 0;
  for (const tr of traces) {
    let acc = tr.start ?? 0;
    const y = tr.kind === 1 ? 0.035 : 0.025;
    for (let i = 0; i < tr.pts.length - 1; i++) {
      const [x1, z1] = tr.pts[i];
      const [x2, z2] = tr.pts[i + 1];
      const len = Math.hypot(x2 - x1, z2 - z1);
      if (len < 1e-4) continue;
      const nx = (-(z2 - z1) / len) * tr.width * 0.5;
      const nz = ((x2 - x1) / len) * tr.width * 0.5;
      // extend each segment slightly to close the joints
      const ex = ((x2 - x1) / len) * tr.width * 0.5;
      const ez = ((z2 - z1) / len) * tr.width * 0.5;
      pos.push(x1 - ex + nx, y, z1 - ez + nz, x1 - ex - nx, y, z1 - ez - nz, x2 + ex + nx, y, z2 + ez + nz, x2 + ex - nx, y, z2 + ez - nz);
      along.push(acc, acc, acc + len, acc + len);
      for (let k = 0; k < 4; k++) {
        kind.push(tr.kind);
        seed.push(tr.seed);
      }
      idx.push(v, v + 2, v + 1, v + 1, v + 2, v + 3);
      v += 4;
      acc += len;
    }
    pads.push(tr.pts[0], tr.pts[tr.pts.length - 1]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aAlong', new THREE.Float32BufferAttribute(along, 1));
  geo.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  geo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
  geo.setIndex(idx);

  const uniforms = {
    uTime: { value: 0 },
    uSignal: { value: 0 },
    uDim: { value: new THREE.Color(C.trace) },
    uLit: { value: new THREE.Color(C.phosphor) },
    uPointer: { value: new THREE.Vector3(9999, 0, 9999) },
    uCam: { value: new THREE.Vector3() },
    uFogColor: { value: new THREE.Color('#3a1d5e') },
    uFogDensity: { value: 0.0062 },
    uXray: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      attribute float aAlong; attribute float aKind; attribute float aSeed;
      varying float vAlong; varying float vKind; varying float vSeed; varying vec3 vWorld;
      void main(){
        vAlong = aAlong; vKind = aKind; vSeed = aSeed;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uSignal; uniform vec3 uDim; uniform vec3 uLit;
      uniform vec3 uPointer; uniform vec3 uCam; uniform vec3 uFogColor; uniform float uFogDensity;
      varying float vAlong; varying float vKind; varying float vSeed; varying vec3 vWorld;
      void main(){
        vec3 col = uDim * 1.25;
        if (vKind > 0.5) {
          // main signal: everything behind the head is lit, the head burns
          float lit = 1.0 - smoothstep(uSignal - 1.0, uSignal, vAlong);
          col = mix(uDim * 1.6, uLit * 0.55, lit);
          col += uLit * exp(-abs(vAlong - uSignal) * 0.35) * 2.4;
        } else {
          float p = fract(vAlong * 0.012 - uTime * 0.07 + vSeed);
          float head = smoothstep(0.0, 0.02, p) * (1.0 - smoothstep(0.02, 0.09, p));
          col += uLit * head * 0.85;
        }
        float d = distance(vWorld.xz, uPointer.xz);
        col += uLit * 0.6 * exp(-d * 0.28);
        float dist = distance(vWorld, uCam);
        float f = 1.0 - exp(-pow(uFogDensity * dist, 2.0));
        col = mix(col, uFogColor, f);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 1;
  return { mesh, uniforms, pads };
}
