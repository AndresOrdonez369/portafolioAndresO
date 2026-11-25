import * as THREE from 'three';

export const C = {
  night: '#0a0a1c',
  board: '#12122b',
  trace: '#2a2a63',
  phosphor: '#35f58a',
  gold: '#d9b45a',
  violet: '#7b5cff',
  magenta: '#ff4fa3',
  cyan: '#3fe6d6',
  blue: '#3d86ff',
  orange: '#ff6a3d',
  acid: '#f2e23a',
  silk: '#ecebff',
};

export async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load('900 64px "Big Shoulders Display"'),
      document.fonts.load('700 64px "Big Shoulders Display"'),
      document.fonts.load('600 24px "Martian Mono"'),
    ]);
  } catch {}
}

function canvasTex(c: HTMLCanvasElement, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Repeating solder-mask tile: fine grid, a via, and faint silkscreen ticks. */
export function boardTile() {
  const s = 256;
  const c = Object.assign(document.createElement('canvas'), { width: s, height: s });
  const g = c.getContext('2d')!;
  g.fillStyle = '#16163c';
  g.fillRect(0, 0, s, s);
  g.strokeStyle = '#1d1d4a';
  g.lineWidth = 2;
  for (let i = 0; i <= s; i += 64) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i, s);
    g.moveTo(0, i);
    g.lineTo(s, i);
    g.stroke();
  }
  // vias
  for (const [x, y] of [
    [32, 32],
    [160, 96],
    [96, 192],
    [224, 224],
  ]) {
    g.fillStyle = '#4a3f6e';
    g.beginPath();
    g.arc(x, y, 7, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#07071a';
    g.beginPath();
    g.arc(x, y, 3, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#23235a';
  for (let i = 8; i < s; i += 16) g.fillRect(i, 126, 2, 4);
  const t = canvasTex(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Silkscreen text lying on the board. */
export function silkTexture(lines: { text: string; size: number; color?: string; weight?: number; mono?: boolean }[], w = 1024, h = 256, align: CanvasTextAlign = 'left') {
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  const g = c.getContext('2d')!;
  g.textAlign = align;
  g.textBaseline = 'top';
  let y = 8;
  for (const l of lines) {
    g.fillStyle = l.color ?? C.phosphor;
    g.font = l.mono ? `600 ${l.size}px "Martian Mono", monospace` : `${l.weight ?? 900} ${l.size}px "Big Shoulders Display", sans-serif`;
    const x = align === 'center' ? w / 2 : align === 'right' ? w - 8 : 8;
    g.fillText(l.text, x, y);
    y += l.size * 1.02;
  }
  return canvasTex(c);
}

/** Chip lid for projects without key art: title over a paint band. */
export function lidTexture(title: string, ref: string, tint: string) {
  const w = 1024;
  const h = 640;
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  const g = c.getContext('2d')!;
  g.fillStyle = '#0e0e26';
  g.fillRect(0, 0, w, h);
  const grad = g.createLinearGradient(0, h, w, 0);
  grad.addColorStop(0, C.violet);
  grad.addColorStop(0.3, tint);
  grad.addColorStop(0.6, C.orange);
  grad.addColorStop(1, C.acid);
  g.save();
  g.globalAlpha = 0.9;
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(0, h * 0.62);
  g.lineTo(w, h * 0.18);
  g.lineTo(w, h * 0.42);
  g.lineTo(0, h * 0.86);
  g.closePath();
  g.fill();
  g.restore();
  g.fillStyle = C.silk;
  g.font = '900 150px "Big Shoulders Display", sans-serif';
  g.textBaseline = 'alphabetic';
  const words = title.toUpperCase().split(' ');
  // two lines max
  const mid = Math.ceil(words.length / 2);
  const lines = words.length > 2 ? [words.slice(0, mid).join(' '), words.slice(mid).join(' ')] : [title.toUpperCase()];
  lines.forEach((l, i) => {
    let size = 150;
    g.font = `900 ${size}px "Big Shoulders Display", sans-serif`;
    while (g.measureText(l).width > w - 100 && size > 60) {
      size -= 6;
      g.font = `900 ${size}px "Big Shoulders Display", sans-serif`;
    }
    g.fillText(l, 50, h - 70 - (lines.length - 1 - i) * size * 0.92);
  });
  g.fillStyle = C.phosphor;
  g.font = '600 34px "Martian Mono", monospace';
  g.fillText(ref, 50, 80);
  return canvasTex(c);
}

/** Load an image texture with sRGB color. */
export function loadTex(url: string): Promise<THREE.Texture> {
  return new Promise((res) => {
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        res(t);
      },
      undefined,
      () => res(new THREE.Texture()),
    );
  });
}
