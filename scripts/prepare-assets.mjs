// Crops and optimizes source images from assets-src/raw into public/img.
// Run with: npm run assets
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const RAW = 'assets-src/raw/';
const OUT = 'public/img/';
mkdirSync(OUT + 'projects', { recursive: true });
mkdirSync(OUT + 'portraits', { recursive: true });

const jobs = [
  // Game key art, cropped from public store / Fortnite.gg page captures supplied by Andrés.
  { src: 'raptor-page.webp', out: 'projects/raptor-heist-egg.webp', crop: { left: 229, top: 517, width: 156, height: 86 } },
  { src: 'steal-page.webp', out: 'projects/steal-an-egg.webp', crop: { left: 28, top: 137, width: 671, height: 376 } },
  { src: 'steal-page.webp', out: 'projects/steal-an-egg-run.webp', crop: { left: 198, top: 527, width: 156, height: 86 } },
  { src: 'orcs-page.webp', out: 'projects/orcs-must-die-play.webp', crop: { left: 72, top: 594, width: 588, height: 320 } },
  // Portraits.
  { src: 'portrait-green.png', out: 'portraits/green.webp' },
  { src: 'portrait-photo.png', out: 'portraits/photo.webp' },
  { src: 'portrait-sketch.webp', out: 'portraits/sketch.webp', crop: { left: 22, top: 14, width: 516, height: 700 } },
  { src: 'site-MeTranshumanism2.webp', out: 'portraits/transhumanism.webp', resize: 900 },
  { src: 'site-aboutMeImage.webp', out: 'portraits/louvre.webp', resize: 1400 },
  // Projects from ordonezoswaldo.com.
  ...['inti', 'raices', 'coniuctum', 'digitalTwin', 'ylama', 'bigbang', 'klk', 'repara', 'letsgoal', 'beegenetic'].map((n) => ({
    src: `site-${n}.webp`,
    out: `projects/${n}.webp`,
    resize: 1000,
  })),
  { src: 'eig-logo.png', out: 'eig.webp' },
  // Key art and thumbnails cropped from Fortnite.gg page captures supplied by Andrés (2026-11-11).
  { src: 'hh2-page.webp', out: 'projects/havoc-hotel-2-a.webp', crop: { left: 249, top: 467, width: 156, height: 86 } },
  { src: 'hh2-page.webp', out: 'projects/havoc-hotel-2-b.webp', crop: { left: 420, top: 467, width: 156, height: 86 } },
  { src: 'hh2-page.webp', out: 'projects/havoc-hotel-2-c.webp', crop: { left: 591, top: 467, width: 156, height: 86 } },
  { src: 'hh3-page.webp', out: 'projects/havoc-hotel-3-a.webp', crop: { left: 242, top: 521, width: 156, height: 86 } },
  { src: 'hh3-page.webp', out: 'projects/havoc-hotel-3-b.webp', crop: { left: 413, top: 521, width: 156, height: 86 } },
  { src: 'hh3-page.webp', out: 'projects/havoc-hotel-3-c.webp', crop: { left: 584, top: 521, width: 156, height: 86 } },
  // Thumbnails of Andrés's own YouTube videos.
  { src: 'yt-9bmjvTAURxk.jpg', out: 'projects/mini-experiencias.webp', resize: 960 },
  { src: 'yt-0CWj1_Sju4E.jpg', out: 'projects/mini-experiencias-lobby.webp', crop: { left: 0, top: 45, width: 480, height: 270 } },
  { src: 'yt-Cxb_7x7DnAs.jpg', out: 'projects/brainrot-room-rush.webp', crop: { left: 0, top: 45, width: 480, height: 270 } },
  { src: 'yt-oLPQBUQBvic.jpg', out: 'projects/mosquito-ar.webp', crop: { left: 437, top: 0, width: 406, height: 720 }, resize: 405 },
  { src: 'yt-zzjzBnKVJHw.jpg', out: 'projects/fiesta-cafetera.webp', crop: { left: 138, top: 118, width: 204, height: 120 } },
  // High-resolution official key art from teravisiongames.com (public press/portfolio images).
  { src: 'tv-HH2-Basic-1.png', out: 'projects/havoc-hotel-2.webp', resize: 1600 },
  { src: 'tv-HH2-TheGameAwards-1.png', out: 'projects/havoc-hotel-2-tga.webp', resize: 1600 },
  { src: 'tv-Thumb_HH3-Basic-1.png', out: 'projects/havoc-hotel-3.webp', resize: 1600 },
  { src: 'tv-RH-Basic-1.png', out: 'projects/raptor-heist.webp', resize: 1600 },
  { src: 'tv-OMD-Imagen-principal-1.png', out: 'projects/orcs-must-die.webp', resize: 1600 },
  { src: 'tv-Trailer-V3.00_06_19_03457.png', out: 'projects/orcs-must-die-combat.webp', resize: 1600 },
  { src: 'tv-DnDThumbnail.jpeg', out: 'projects/dnd-zombie-dragon.webp', resize: 1600 },
  { src: 'tv-PIT_VersionB_thumb_Basic-1.png', out: 'projects/melted-multi-pit.webp', resize: 1600 },
  { src: 'dnd-page.webp', out: 'projects/dnd-zombie-dragon-update.webp', crop: { left: 36, top: 112, width: 671, height: 376 } },
  // Extra frames from Andrés's own YouTube videos.
  { src: 'ytf-0CWj1_Sju4E-1.jpg', out: 'projects/mini-experiencias-a.webp', crop: { left: 60, top: 0, width: 360, height: 360 } },
  { src: 'ytf-0CWj1_Sju4E-2.jpg', out: 'projects/mini-experiencias-b.webp', crop: { left: 60, top: 0, width: 360, height: 360 } },
  { src: 'ytf-9bmjvTAURxk-1.jpg', out: 'projects/mini-experiencias-c.webp', crop: { left: 60, top: 0, width: 360, height: 360 } },
  { src: 'ytf-9bmjvTAURxk-3.jpg', out: 'projects/mini-experiencias-d.webp', crop: { left: 60, top: 0, width: 360, height: 360 } },
  { src: 'ytf-Cxb_7x7DnAs-1.jpg', out: 'projects/brainrot-a.webp', crop: { left: 0, top: 45, width: 480, height: 270 } },
  { src: 'ytf-Cxb_7x7DnAs-2.jpg', out: 'projects/brainrot-b.webp', crop: { left: 0, top: 45, width: 480, height: 270 } },
  { src: 'ytf-Cxb_7x7DnAs-3.jpg', out: 'projects/brainrot-c.webp', crop: { left: 0, top: 45, width: 480, height: 270 } },
  { src: 'ytf-oLPQBUQBvic-1.jpg', out: 'projects/mosquito-a.webp', crop: { left: 150, top: 0, width: 180, height: 360 } },
  { src: 'ytf-oLPQBUQBvic-3.jpg', out: 'projects/mosquito-b.webp', crop: { left: 150, top: 0, width: 180, height: 360 } },
  // Screenshots supplied by Andrés, 2026-11-16.
  { src: 'user-raptor-egg.webp', out: 'projects/raptor-heist-lab.webp', resize: 1600 },
  { src: 'user-raptor-page.webp', out: 'projects/raptor-heist-hack.webp', crop: { left: 354, top: 412, width: 160, height: 90 } },
  { src: 'user-dnd-title.webp', out: 'projects/dnd-zombie-dragon-title.webp', crop: { left: 0, top: 70, width: 2000, height: 975 }, resize: 1600 },
  { src: 'user-omd-1.webp', out: 'projects/orcs-must-die-hall.webp', crop: { left: 0, top: 0, width: 1200, height: 713 } },
  { src: 'user-omd-2.webp', out: 'projects/orcs-must-die-horde.webp', crop: { left: 0, top: 0, width: 1200, height: 727 } },
  { src: 'inspira-site.png', out: 'projects/inspira.webp', crop: { left: 854, top: 247, width: 598, height: 500 } },
];

for (const j of jobs) {
  let img = sharp(RAW + j.src);
  if (j.crop) img = img.extract(j.crop);
  if (j.resize) img = img.resize({ width: j.resize, withoutEnlargement: true });
  await img.webp({ quality: 84 }).toFile(OUT + j.out);
  console.log('wrote', j.out);
}

// Organisation logos extracted from Andrés's CV PDF, on a white plate.
mkdirSync(OUT + 'logos', { recursive: true });
for (const f of (await import('node:fs')).readdirSync(RAW + 'cv')) {
  const name = f.replace('.png', '');
  if (name === 'photo-vr') {
    await sharp(RAW + 'cv/' + f).resize({ width: 583 }).webp({ quality: 86 }).toFile(OUT + 'portraits/vr.webp');
    continue;
  }
  await sharp(RAW + 'cv/' + f)
    .flatten({ background: '#ffffff' })
    .resize(160, 160, { fit: 'contain', background: '#ffffff' })
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: '#ffffff' })
    .webp({ quality: 88 })
    .toFile(OUT + 'logos/' + name + '.webp');
}

// Tile-size variants of large art, and a clean upscale of the small page thumbnails.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
sharp.cache(false);
mkdirSync(OUT + 'projects/sm', { recursive: true });
for (const f of readdirSync(OUT + 'projects').filter((f) => f.endsWith('.webp'))) {
  const file = OUT + 'projects/' + f;
  const src = readFileSync(file);
  const meta = await sharp(src).metadata();
  if (meta.width > 900) await sharp(src).resize({ width: 800 }).webp({ quality: 80 }).toFile(OUT + 'projects/sm/' + f);
  if (meta.width < 400) {
    const buf = await sharp(src).resize({ width: meta.width * 3, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 86 }).toBuffer();
    writeFileSync(file, buf);
  }
}

// Poster used as the hero background until WebGL is ready.
await sharp(RAW + 'raptor-page.webp')
  .extract({ left: 60, top: 128, width: 670, height: 374 })
  .resize(64)
  .blur(2)
  .webp({ quality: 60 })
  .toFile(OUT + 'projects/raptor-heist-blur.webp');
