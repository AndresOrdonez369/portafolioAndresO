import { projects } from '../data/projects';
import { profile } from '../data/site';

const dlg = document.getElementById('console') as HTMLDialogElement;
const log = document.getElementById('console-log')!;
const form = document.getElementById('console-form') as HTMLFormElement;
const input = document.getElementById('console-input') as HTMLInputElement;
const es = dlg.dataset.lang === 'es';
const base = es ? '/es' : '';
const history: string[] = [];
let hi = 0;

const say = (text: string, cls = '') => {
  const p = document.createElement('p');
  if (cls) p.className = cls;
  p.textContent = text;
  log.append(p);
  log.scrollTop = log.scrollHeight;
};

const help = es
  ? `help              esta ayuda
whoami            quién soy
ls                proyectos
open <proyecto>   abrir un caso (ej. open raptor-heist)
map | territory   cambiar de vista
goto <capítulo>   ir a: simulacra, time, seeing, virtual, becoming, mirror
xray              ver el código de la escena (o mantén X)
cv                descargar el CV
contact           escribirme
lang en|es        idioma
clear             limpiar`
  : `help              this help
whoami            who I am
ls                projects
open <project>    open a case study (e.g. open raptor-heist)
map | territory   switch view
goto <chapter>    jump to: simulacra, time, seeing, virtual, becoming, mirror
xray              see the scene's code (or hold X)
cv                download the CV
contact           write to me
lang en|es        language
clear             clear`;

function rabbit() {
  const c = document.createElement('canvas');
  Object.assign(c.style, { position: 'fixed', inset: '0', zIndex: '60', pointerEvents: 'none', width: '100%', height: '100%' });
  document.body.append(c);
  const g = c.getContext('2d')!;
  c.width = innerWidth;
  c.height = innerHeight;
  const glyphs = 'Verse:=<decides><transacts>if(var)set{}[]0x1F#include<>;float vec3 uniform::spawn race sync 01'.split('');
  const size = 16;
  const cols = Math.ceil(innerWidth / size);
  const drops = Array.from({ length: cols }, () => Math.random() * -40);
  const t0 = performance.now();
  const tick = (now: number) => {
    const el = now - t0;
    g.fillStyle = 'rgba(10,10,28,0.14)';
    g.fillRect(0, 0, c.width, c.height);
    g.font = `600 ${size - 2}px "Martian Mono", monospace`;
    drops.forEach((y, i) => {
      g.fillStyle = Math.random() > 0.96 ? '#ecebff' : '#35f58a';
      g.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, y * size);
      drops[i] = y * size > c.height && Math.random() > 0.97 ? 0 : y + 1;
    });
    if (el < 4200) requestAnimationFrame(tick);
    else {
      c.style.transition = 'opacity .8s';
      c.style.opacity = '0';
      setTimeout(() => c.remove(), 900);
    }
  };
  requestAnimationFrame(tick);
}

function run(raw: string) {
  const cmd = raw.trim();
  if (!cmd) return;
  say(`$ ${cmd}`, 'cmd');
  history.push(cmd);
  hi = history.length;
  const [name, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ').toLowerCase();
  const site = (window as any).__site;
  switch (name.toLowerCase()) {
    case 'help':
      return say(help);
    case 'whoami':
      return say(`${profile.name}\n${profile.role[es ? 'es' : 'en']}\n${profile.origin}`);
    case 'ls':
      return say(projects.map((p) => `${(p.ref ?? '  ').padEnd(3)} ${p.slug.padEnd(28)} ${p.year}`).join('\n'));
    case 'open': {
      const p = projects.find((x) => x.slug === arg || x.title.toLowerCase().includes(arg));
      if (!p || !arg) return say(es ? `no encontré "${arg}". prueba ls` : `no project "${arg}". try ls`, 'err');
      location.href = `${base}/work/${p.slug}/`;
      return;
    }
    case 'map':
    case 'territory':
      if (!site) return say(es ? 'solo en la página principal' : 'only on the home page', 'err');
      site.setView(name.toLowerCase());
      return say('ok');
    case 'goto':
    case 'cd': {
      const el = document.getElementById(arg);
      if (!el) return say(es ? 'capítulo desconocido' : 'unknown chapter', 'err');
      site?.setView?.('territory');
      el.scrollIntoView({ behavior: 'smooth' });
      return say('ok');
    }
    case 'xray':
      if (!site?.board) return say(es ? 'la escena 3D no está activa' : 'the 3D scene is not running', 'err');
      site.board.setXray(true);
      setTimeout(() => site.board.setXray(false), 2500);
      return say(es ? 'rayos X por 2.5 s' : 'x-ray for 2.5 s');
    case 'cv':
      location.href = profile.cv;
      return say('↓ cv');
    case 'contact':
    case 'mail':
      location.href = `mailto:${profile.email}`;
      return say(profile.email);
    case 'lang':
      if (arg === 'es') location.href = '/es' + location.pathname.replace(/^\/es/, '');
      else if (arg === 'en') location.href = location.pathname.replace(/^\/es/, '') || '/';
      return;
    case 'clear':
      log.innerHTML = '';
      return;
    case 'sudo':
      return say(es ? 'buen intento.' : 'nice try.', 'err');
    case 'follow':
      if (/white rabbit/.test(arg)) {
        rabbit();
        return say(es ? 'despierta, Neo…' : 'wake up, Neo…');
      }
  }
  say(es ? `comando no encontrado: ${name}. escribe help` : `command not found: ${name}. type help`, 'err');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  run(input.value);
  input.value = '';
});
input.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && hi > 0) {
    input.value = history[--hi];
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    input.value = history[++hi] ?? '';
    hi = Math.min(hi, history.length);
    e.preventDefault();
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const [n, a = ''] = input.value.split(' ');
    if (n === 'open') {
      const m = projects.find((p) => p.slug.startsWith(a));
      if (m) input.value = `open ${m.slug}`;
    }
  }
});

export function openConsole() {
  if (!dlg.open) dlg.show();
  input.focus();
}
dlg.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') dlg.close();
});
