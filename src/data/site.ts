import type { L, Lang } from './types';

export const profile = {
  name: 'Andrés Ordóñez-Bolaños',
  short: 'Andrés Ordóñez',
  email: 'xrandres369@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andresordonezbolanos/',
  github: 'https://github.com/AndresOrdonez369',
  cv: '/cv-andres-ordonez.pdf',
  origin: 'Pasto, Colombia',
  role: {
    en: 'Lead Programmer · XR Tech Lead · MSc Computer Science',
    es: 'Lead Programmer · XR Tech Lead · MSc en Computación',
  } as L,
  intro: {
    en: 'I lead engineering teams that ship games on Fortnite and Meta Quest, teach AI at master’s level, and make art with code. Engineer by training, researcher by habit.',
    es: 'Lidero equipos de ingeniería que lanzan juegos en Fortnite y Meta Quest, enseño IA en maestría y hago arte con código. Ingeniero de formación, investigador por costumbre.',
  } as L,
};

export interface Chapter {
  id: string;
  n: string;
  title: L;
  /** One line that states what the chapter proves. */
  line: L;
  quote?: { text: L; by: string };
  tint: string;
}

export const lifeQuotes = [
  { text: { en: 'Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.', es: 'Aférrate a los sueños, porque si los sueños mueren, la vida es un pájaro de alas rotas que no puede volar.' }, by: 'Langston Hughes' },
  { text: { en: 'We have created machines that mirror us, and in that reflection we discover not just who we are, but who we might become.', es: 'Hemos creado máquinas que nos reflejan, y en ese reflejo descubrimos no solo quiénes somos, sino quiénes podríamos llegar a ser.' }, by: 'Inspired by transhumanist and existential philosophy' },
];

export const chapters: Chapter[] = [
  {
    id: 'boot',
    n: '00',
    title: { en: 'Boot', es: 'Arranque' },
    line: { en: 'The map precedes the territory.', es: 'El mapa precede al territorio.' },
    tint: 'var(--phosphor)',
  },
  {
    id: 'capabilities',
    n: '01',
    title: { en: 'Capabilities', es: 'Capacidades' },
    line: { en: 'What I bring to a team, and what it is built on.', es: 'Lo que aporto a un equipo, y sobre qué está construido.' },
    tint: 'var(--phosphor)',
  },
  {
    id: 'simulacra',
    n: '02',
    title: { en: 'Simulacra', es: 'Simulacros' },
    line: {
      en: 'Every project in one place: shipped games, XR, research and web. Filter by what you are hiring for.',
      es: 'Todos los proyectos en un lugar: juegos lanzados, XR, investigación y web. Filtra según lo que buscas.',
    },
    quote: {
      text: { en: 'The simulacrum is true.', es: 'El simulacro es verdadero.' },
      by: 'Jean Baudrillard',
    },
    tint: 'var(--magenta)',
  },
  {
    id: 'recognition',
    n: '03',
    title: { en: 'Recognition', es: 'Reconocimiento' },
    line: { en: 'Where the signal was noticed.', es: 'Donde la señal fue notada.' },
    tint: 'var(--gold)',
  },
  {
    id: 'virtual',
    n: '04',
    title: { en: 'The Virtual', es: 'Lo virtual' },
    line: {
      en: 'Six publications and fifteen talks on XR, digital twins, emotion recognition and art.',
      es: 'Seis publicaciones y quince charlas sobre XR, gemelos digitales, reconocimiento de emociones y arte.',
    },
    quote: {
      text: {
        en: 'Virtual worlds are not opposed to reality; they are its expansions.',
        es: 'Los mundos virtuales no se oponen a la realidad; son sus expansiones.',
      },
      by: 'Pierre Lévy',
    },
    tint: 'var(--blue)',
  },
  {
    id: 'time',
    n: '05',
    title: { en: 'Time', es: 'Tiempo' },
    line: {
      en: 'Ten years of engineering, from network closets to game studios.',
      es: 'Diez años de ingeniería, de cuartos de redes a estudios de videojuegos.',
    },
    quote: {
      text: {
        en: 'Time is not a sequence of moments; it is the openness where things emerge and pass into absence.',
        es: 'El tiempo no es una sucesión de instantes; es la apertura donde las cosas surgen y pasan a la ausencia.',
      },
      by: 'Martin Heidegger',
    },
    tint: 'var(--violet)',
  },
  {
    id: 'seeing',
    n: '06',
    title: { en: 'Seeing', es: 'Mirar' },
    line: {
      en: 'Eight years teaching people to see how machines learn.',
      es: 'Ocho años enseñando a ver cómo aprenden las máquinas.',
    },
    quote: {
      text: {
        en: 'The task is not so much to see what no one has seen, but to think what nobody has thought about that which everyone sees.',
        es: 'La tarea no es tanto ver lo que nadie ha visto, sino pensar lo que nadie ha pensado sobre aquello que todos ven.',
      },
      by: 'Arthur Schopenhauer',
    },
    tint: 'var(--cyan)',
  },
  {
    id: 'becoming',
    n: '07',
    title: { en: 'Becoming', es: 'Devenir' },
    line: {
      en: 'Born in southern Colombia. Still building, still learning.',
      es: 'Nacido en el sur de Colombia. Construyendo y aprendiendo.',
    },
    quote: {
      text: {
        en: 'To be able at any moment to sacrifice what we are for what we could become.',
        es: 'Poder en cualquier momento sacrificar lo que somos por lo que podríamos llegar a ser.',
      },
      by: 'Charles Du Bos',
    },
    tint: 'var(--orange)',
  },
  {
    id: 'mirror',
    n: '08',
    title: { en: 'Mirror', es: 'Espejo' },
    line: {
      en: 'Technology is humanity’s most honest mirror. Let’s build something.',
      es: 'La tecnología es el espejo más honesto de la humanidad. Construyamos algo.',
    },
    tint: 'var(--phosphor)',
  },
];

const ui = {
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  map: { en: 'Map', es: 'Mapa' },
  territory: { en: 'Territory', es: 'Territorio' },
  viewSwitch: { en: 'View', es: 'Vista' },
  contact: { en: 'Contact', es: 'Contacto' },
  downloadCv: { en: 'Download CV', es: 'Descargar CV' },
  seeWork: { en: 'See the games', es: 'Ver los juegos' },
  chapters: { en: 'Chapters', es: 'Capítulos' },
  island: { en: 'Island code', es: 'Código de isla' },
  copy: { en: 'Copy', es: 'Copiar' },
  copied: { en: 'Copied', es: 'Copiado' },
  caseStudy: { en: 'Case study', es: 'Caso de estudio' },
  role: { en: 'Role', es: 'Rol' },
  studio: { en: 'Studio', es: 'Estudio' },
  year: { en: 'Year', es: 'Año' },
  platform: { en: 'Platform', es: 'Plataforma' },
  stack: { en: 'Stack', es: 'Tecnologías' },
  whatIDid: { en: 'What I did', es: 'Qué hice' },
  team: { en: 'Engineering team', es: 'Equipo de ingeniería' },
  source: { en: 'Source', es: 'Fuente' },
  next: { en: 'Next', es: 'Siguiente' },
  back: { en: 'Back to the board', es: 'Volver a la placa' },
  now: { en: 'now', es: 'hoy' },
  moreWork: { en: 'Earlier web and mobile work', es: 'Trabajo web y móvil anterior' },
  teachingNow: { en: 'Teaching now', es: 'Enseñando hoy' },
  teachingBefore: { en: 'Before', es: 'Antes' },
  resources: { en: 'Lecture materials', es: 'Material de clase' },
  publications: { en: 'Publications', es: 'Publicaciones' },
  research: { en: 'XR, art and research', es: 'XR, arte e investigación' },
  talks: { en: 'Talks, workshops and events', es: 'Charlas, talleres y eventos' },
  awards: { en: 'Awards and honors', es: 'Premios y honores' },
  education: { en: 'Education', es: 'Formación' },
  courses: { en: 'Certifications and courses', es: 'Certificaciones y cursos' },
  ventures: { en: 'Ventures', es: 'Emprendimientos' },
  passions: { en: 'Off the clock', es: 'Fuera del trabajo' },
  passionsList: {
    en: 'Chess · Reading · Soccer · Cinema · Philosophy · Electric bass · World history',
    es: 'Ajedrez · Lectura · Fútbol · Cine · Filosofía · Bajo eléctrico · Historia universal',
  },
  languages: { en: 'Spanish (native) · English (professional working proficiency)', es: 'Español (nativo) · Inglés (competencia profesional)' },
  study: { en: 'Study', es: 'Estudio' },
  studyNote: {
    en: 'Live code running in your browser. Written for this site.',
    es: 'Código vivo en tu navegador. Escrito para este sitio.',
  },
  reset: { en: 'Reset', es: 'Reiniciar' },
  emailMe: { en: 'Write to me', es: 'Escríbeme' },
  copyEmail: { en: 'Copy email', es: 'Copiar correo' },
  consoleHint: { en: 'Press / for the console · hold X to see the code', es: 'Pulsa / para la consola · mantén X para ver el código' },
  footer: { en: 'Designed and coded by Andrés Ordóñez-Bolaños', es: 'Diseñado y programado por Andrés Ordóñez-Bolaños' },
  status: {
    live: { en: 'Live', es: 'En vivo' },
    shipped: { en: 'Shipped', es: 'Lanzado' },
    liveops: { en: 'LiveOps', es: 'LiveOps' },
    research: { en: 'Research', es: 'Investigación' },
    archive: { en: 'Archive', es: 'Archivo' },
  },
  notFound: { en: 'Open circuit', es: 'Circuito abierto' },
  notFoundText: { en: 'This trace leads nowhere. The signal is back on the board.', es: 'Esta pista no lleva a ningún lado. La señal está de vuelta en la placa.' },
  minutesPlayed: { en: 'minutes played across these islands', es: 'minutos jugados entre estas islas' },
} as const;

type UI = typeof ui;
export function useUI(lang: Lang) {
  return function tr<K extends keyof UI>(key: K): string {
    const v = ui[key] as unknown as L;
    return v[lang];
  };
}
export const statusLabel = (s: keyof UI['status'], lang: Lang) => ui.status[s][lang];

export const path = (lang: Lang, p = '/') => (lang === 'en' ? p : `/es${p === '/' ? '/' : p}`);
