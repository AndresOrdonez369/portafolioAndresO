// Page behaviour shared by every route. Heavy modules (Three.js scene, studies, console) load on demand.
type View = 'map' | 'territory';

const root = document.documentElement;
root.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isHome = document.body.classList.contains('is-home');

/* ---------- Copy to clipboard ---------- */
document.addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-copy]');
  if (!btn) return;
  const value = btn.dataset.copy!;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value });
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  const label = btn.querySelector('span');
  const before = label?.textContent;
  btn.dataset.copied = '';
  if (label) label.textContent = (window as any).__copiedLabel ?? 'Copied';
  setTimeout(() => {
    delete btn.dataset.copied;
    if (label && before) label.textContent = before;
  }, 1600);
});

/* ---------- Video facades: the YouTube player loads only when asked ---------- */
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-video]');
  if (!btn) return;
  e.preventDefault();
  const media = btn.parentElement!;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0&modestbranding=1`;
  iframe.title = btn.getAttribute('aria-label') ?? 'Video';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  media.replaceChildren(iframe);
});

/* ---------- Project filters: tiles reorder in place ---------- */
const galleryEl = document.querySelector<HTMLElement>('[data-gallery]');
if (galleryEl) {
  const tiles = [...galleryEl.querySelectorAll<HTMLElement>('.tile')];
  const buttons = [...galleryEl.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const apply = (id: string, animate = true) => {
    const run = () => {
      for (const t of tiles) t.hidden = id !== 'all' && !(t.dataset.facets ?? '').split(' ').includes(id);
      for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.filter === id));
    };
    const vt = (document as any).startViewTransition;
    if (animate && vt && !reduced) vt.call(document, run);
    else run();
    const url = new URL(location.href);
    if (id === 'all') url.searchParams.delete('work');
    else url.searchParams.set('work', id);
    history.replaceState(null, '', url);
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter!)));
  const initial = new URLSearchParams(location.search).get('work');
  if (initial && buttons.some((b) => b.dataset.filter === initial)) apply(initial, false);
}

/* ---------- Stack explorer: pick a part, see the projects that use it ---------- */
const stackEl = document.querySelector<HTMLElement>('[data-stack]');
if (stackEl) {
  const data: Record<string, { t: string; h: string; c: string }[]> = JSON.parse(stackEl.querySelector('[data-part-json]')!.textContent || '{}');
  const grid = stackEl.querySelector('[data-part-grid]')!;
  const nameEl = stackEl.querySelector('[data-part-name]')!;
  const btns = [...stackEl.querySelectorAll<HTMLButtonElement>('[data-part]')];
  const show = (part: string) => {
    nameEl.textContent = part;
    grid.replaceChildren(
      ...(data[part] ?? []).slice(0, 8).map((p, i) => {
        const a = document.createElement('a');
        a.href = p.h;
        a.style.animationDelay = `${i * 40}ms`;
        if (p.c) {
          const img = new Image();
          img.src = p.c;
          img.alt = '';
          img.loading = 'lazy';
          a.append(img);
        }
        const label = document.createElement('span');
        label.textContent = p.t;
        a.append(label);
        return a;
      }),
    );
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.part === part)));
  };
  btns.forEach((b) => {
    b.addEventListener('click', () => show(b.dataset.part!));
    b.addEventListener('pointerenter', () => show(b.dataset.part!));
  });
  show(btns.find((b) => b.getAttribute('aria-pressed') === 'true')?.dataset.part ?? btns[0]?.dataset.part ?? '');
}

/* ---------- Cursor: a phosphor reticle that sheds glyphs as it moves ---------- */
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const ring = Object.assign(document.createElement('div'), { className: 'cur cur--ring' });
  const dot = Object.assign(document.createElement('div'), { className: 'cur cur--dot' });
  document.body.append(ring, dot);
  root.classList.add('has-cursor');
  const GLYPHS = ':=<>{}[]01#/\\λΣ∴∆'.split('');
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, lx = x, ly = y, live = 0;
  addEventListener('pointermove', (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    const t = e.target as HTMLElement;
    const hot = !!t.closest?.('a, button, summary, [data-copy], canvas, input');
    ring.classList.toggle('is-hot', hot);
    // shed a glyph every ~46px of travel, never more than 14 alive
    if (!reduced && Math.hypot(x - lx, y - ly) > 46 && live < 14) {
      lx = x;
      ly = y;
      const g = document.createElement('span');
      g.className = 'cur-glyph';
      g.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      g.style.left = x + 'px';
      g.style.top = y + 'px';
      document.body.append(g);
      live++;
      g.addEventListener('animationend', () => {
        g.remove();
        live--;
      });
    }
  }, { passive: true });
  addEventListener('pointerdown', () => ring.classList.add('is-down'));
  addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => root.classList.add('cursor-out'));
  document.addEventListener('pointerenter', () => root.classList.remove('cursor-out'));
  const follow = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(follow);
  };
  follow();
}

/* ---------- Lightbox for project galleries ---------- */
const lb = document.getElementById('lightbox') as HTMLDialogElement | null;
if (lb) {
  const shots = [...document.querySelectorAll<HTMLElement>('[data-lightbox]')];
  const img = lb.querySelector('img')!;
  const count = lb.querySelector('.lb__count')!;
  let at = 0;
  const show = (n: number) => {
    at = (n + shots.length) % shots.length;
    img.src = shots[at].dataset.lightbox!;
    img.alt = shots[at].querySelector('img')?.alt ?? '';
    count.textContent = `${at + 1} / ${shots.length}`;
  };
  shots.forEach((s, n) =>
    s.addEventListener('click', () => {
      show(n);
      lb.showModal();
    }),
  );
  lb.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-lb]')?.dataset.lb;
    if (act === 'prev') show(at - 1);
    else if (act === 'next') show(at + 1);
    else if (act === 'close' || e.target === lb) lb.close();
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(at - 1);
    if (e.key === 'ArrowRight') show(at + 1);
  });
}

/* ---------- Header gets a solid field once the page moves ---------- */
const top = document.querySelector('.top');
const onScroll = () => top?.classList.toggle('is-scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Heading reveal: silkscreen wipe ---------- */
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        revealIO.unobserve(en.target);
      }
    }
  },
  { rootMargin: '0px 0px -12% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

if (isHome) initHome();

function initHome() {
  /* ---------- View switch: Map ⇄ Territory ---------- */
  const viewBtns = document.querySelectorAll<HTMLButtonElement>('[data-view-btn]');
  let board: Awaited<ReturnType<typeof import('./board/scene').createBoard>> | null = null;

  function setView(v: View, push = true) {
    root.dataset.view = v;
    viewBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewBtn === v)));
    try {
      sessionStorage.setItem('view', v);
    } catch {}
    if (push) {
      const url = new URL(location.href);
      url.searchParams.set('view', v);
      history.replaceState(null, '', url);
    }
    board?.setView(v);
    if (v === 'map') drawNets();
    else if (!board) startBoard();
    document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
      const u = new URL(a.href);
      u.searchParams.set('view', v);
      a.href = u.pathname + u.search;
    });
    window.scrollTo({ top: 0 });
  }
  viewBtns.forEach((b) => b.addEventListener('click', () => setView(b.dataset.viewBtn as View)));
  setView((root.dataset.view as View) ?? 'territory', false);

  /* ---------- Map nets: orthogonal traces between schematic blocks ---------- */
  function drawNets() {
    const svg = document.querySelector<SVGSVGElement>('.map__nets');
    const sheet = document.querySelector('.map__sheet');
    if (!svg || !sheet || innerWidth < 700) return;
    requestAnimationFrame(() => {
      const box = svg.getBoundingClientRect();
      const blocks = new Map<string, DOMRect>();
      sheet.querySelectorAll<HTMLElement>('[data-net]').forEach((b) => blocks.set(b.dataset.net!, b.getBoundingClientRect()));
      let html = '';
      sheet.querySelectorAll<HTMLElement>('[data-net-from]').forEach((b, i) => {
        const from = blocks.get(b.dataset.netFrom!);
        const to = blocks.get(b.dataset.net!);
        if (!from || !to) return;
        const color = getComputedStyle(b).getPropertyValue('--net').trim() || 'var(--phosphor)';
        // Leave from the side facing the target, enter on the near edge.
        const sameRow = Math.abs(from.top - to.top) < 40;
        let x1, y1, x2, y2;
        if (sameRow) {
          x1 = from.right - box.left;
          y1 = from.top - box.top + 28 + i * 6;
          x2 = to.left - box.left;
          y2 = to.top - box.top + 28 + i * 6;
        } else {
          x1 = from.left - box.left + Math.min(from.width - 30, 40 + i * 22);
          y1 = from.bottom - box.top;
          x2 = to.left - box.left + 24;
          y2 = to.top - box.top;
        }
        const midY = sameRow ? y1 : y1 + (y2 - y1) / 2;
        const d = sameRow ? `M${x1},${y1} H${(x1 + x2) / 2} V${y2} H${x2}` : `M${x1},${y1} V${midY} H${x2} V${y2}`;
        const len = Math.abs(x2 - x1) + Math.abs(y2 - y1) + 40;
        html += `<path d="${d}" stroke="${color}" style="--len:${len};animation-delay:${0.3 + i * 0.12}s"/>`;
        html += `<circle cx="${x1}" cy="${y1}" r="3.5" fill="${color}"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${color}"/>`;
      });
      svg.innerHTML = html;
    });
  }
  addEventListener('resize', () => root.dataset.view === 'map' && drawNets());
  document.querySelector('[data-print]')?.addEventListener('click', () => print());

  /* ---------- Chapter rail ---------- */
  const sections = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
  const railLinks = new Map([...document.querySelectorAll<HTMLAnchorElement>('[data-rail]')].map((a) => [a.dataset.rail!, a]));
  const railIO = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const id = (en.target as HTMLElement).dataset.chapter!;
        let past = true;
        for (const [key, a] of railLinks) {
          if (key === id) {
            a.setAttribute('aria-current', 'true');
            past = false;
          } else {
            a.removeAttribute('aria-current');
            a.classList.toggle('is-past', past);
          }
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => railIO.observe(s));

  /* ---------- Board list: cover peek follows the pointer ---------- */
  const peek = document.querySelector<HTMLElement>('.board-peek');
  const peekImg = peek?.querySelector('img');
  if (peek && peekImg && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('.board-row').forEach((row) => {
      row.addEventListener('pointerenter', () => {
        if (!row.dataset.cover) return;
        peekImg.src = row.dataset.cover;
        peek.classList.add('is-on');
      });
      row.addEventListener('pointerleave', () => peek.classList.remove('is-on'));
      row.addEventListener('pointermove', (e) => {
        peek.style.left = e.clientX + 'px';
        peek.style.top = e.clientY + 'px';
      });
    });
  }

  /* ---------- Portrait switcher ---------- */
  const fig = document.querySelector('[data-portraits]');
  if (fig) {
    const imgs = fig.querySelectorAll<HTMLImageElement>('[data-portrait]');
    const btns = fig.querySelectorAll<HTMLButtonElement>('[data-portrait-btn]');
    const label = fig.querySelector('[data-portrait-label]');
    btns.forEach((b, i) =>
      b.addEventListener('click', () => {
        imgs.forEach((im, j) => im.classList.toggle('is-on', i === j));
        btns.forEach((o, j) => o.setAttribute('aria-pressed', String(i === j)));
        if (label) label.textContent = imgs[i].alt;
        board?.setPortrait(imgs[i].src);
      }),
    );
  }

  /* ---------- Studies: start when visible, stop when not ---------- */
  const studyIO = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const el = en.target as HTMLElement & { __study?: { start(): void; stop(): void; reset(): void } };
        if (en.isIntersecting) {
          if (el.__study) el.__study.start();
          else
            import('./studies/index').then(async ({ mount }) => {
              const canvas = el.tagName === 'CANVAS' ? (el as unknown as HTMLCanvasElement) : el.querySelector('canvas')!;
              el.__study = await mount(el.dataset.study!, canvas, { reduced });
              el.querySelector('[data-study-reset]')?.addEventListener('click', () => el.__study!.reset());
              if (el.__study) el.__study.start();
            });
        } else el.__study?.stop();
      }
    },
    { rootMargin: '120px 0px' },
  );
  document.querySelectorAll('[data-study]').forEach((s) => studyIO.observe(s));

  /* ---------- Territory: the WebGL board ---------- */
  function webglOK() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      return false;
    }
  }
  async function startBoard() {
    const canvas = document.getElementById('board') as HTMLCanvasElement | null;
    if (!canvas || board || !webglOK()) {
      root.classList.add('no-webgl');
      return;
    }
    const start = () =>
      import('./board/scene').then(async ({ createBoard }) => {
        board = await createBoard(canvas, { reduced, sections });
        board.setView((root.dataset.view as View) ?? 'territory');
        // Performance: draw the 3D only while a stage (open 3D under a heading) is on screen.
        const stages = new Set<Element>();
        const stageIO = new IntersectionObserver((entries) => {
          for (const en of entries) en.isIntersecting ? stages.add(en.target) : stages.delete(en.target);
          board!.setActive(stages.size > 0);
        });
        document.querySelectorAll('.ch__head, .ch--boot, .ch--mirror').forEach((el) => stageIO.observe(el));
        root.classList.add('board-ready');
        bindProbe();
      });
    // Let the first paint and LCP happen before the scene loads.
    if ('requestIdleCallback' in window) (window as any).requestIdleCallback(start, { timeout: 1200 });
    else setTimeout(start, 300);
  }
  if (root.dataset.view !== 'map') startBoard();

  /* ---------- Probe: follows the game currently on the hero chip ---------- */
  const lid: { title: string; meta: string }[] = JSON.parse(document.getElementById('lid-data')?.textContent || '[]');
  const probeEl = document.querySelector<HTMLElement>('.probe');
  addEventListener('lidswap', (e) => {
    const i = (e as CustomEvent<number>).detail;
    if (!probeEl || !lid[i]) return;
    probeEl.classList.add('is-swapping');
    setTimeout(() => {
      probeEl.querySelector('[data-probe-title]')!.textContent = lid[i].title;
      probeEl.querySelector('[data-probe-meta]')!.textContent = lid[i].meta;
      probeEl.classList.remove('is-swapping');
    }, 320);
  });
  // Safety net when frames are sparse (background tab): settle on the chip's current game.
  addEventListener('lidchange', (e) => {
    const i = (e as CustomEvent<number>).detail;
    const title = probeEl?.querySelector('[data-probe-title]');
    if (!probeEl || !lid[i] || !title || title.textContent === lid[i].title) return;
    title.textContent = lid[i].title;
    probeEl.querySelector('[data-probe-meta]')!.textContent = lid[i].meta;
  });

  /* ---------- Probe: leader line from the readout to the U1 chip ---------- */
  function bindProbe() {
    const probe = document.querySelector<HTMLElement>('.probe[data-anchor]');
    const line = probe?.querySelector('line');
    if (!probe || !line || !board) return;
    const tick = () => {
      if (board && root.dataset.view === 'territory' && innerWidth > 900) {
        const a = board.anchor(probe.dataset.anchor!);
        const r = probe.getBoundingClientRect();
        if (a && a.visible) {
          line.setAttribute('x2', String(a.x - r.left));
          line.setAttribute('y2', String(a.y - r.top));
          line.style.opacity = '1';
        } else line.style.opacity = '0';
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ---------- X-ray: hold X to see the scene as wireframe ---------- */
  addEventListener('keydown', (e) => {
    if (isTyping(e)) return;
    if (e.key.toLowerCase() === 'x' && !e.repeat) board?.setXray(true);
  });
  addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'x') board?.setXray(false);
  });

  (window as any).__site = {
    setView,
    get board() {
      return board;
    },
  };
}

/* ---------- Console ---------- */
function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement;
  return t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
}
addEventListener('keydown', (e) => {
  if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '/' || e.key === '~' || e.key === '`') {
    e.preventDefault();
    import('./console').then(({ openConsole }) => openConsole());
  }
});
