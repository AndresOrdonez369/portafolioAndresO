import type { L } from './types';

export interface Role {
  title: L;
  org: string;
  place: string;
  from: string;
  to: string | null;
  text: L;
}

export const experience: Role[] = [
  {
    title: { en: 'Lead Programmer I', es: 'Lead Programmer I' },
    org: 'Teravision Games',
    place: 'San Francisco, US · remote',
    from: '2025-06',
    to: null,
    text: {
      en: 'Direct and mentor a team of up to 15 engineers building UEFN and Unreal Engine titles with partners such as Epic Games, Wizards of the Coast and DC Studios. Own core systems architecture and high-stakes technical decisions.',
      es: 'Dirijo y acompaño a un equipo de hasta 15 ingenieros que construye títulos en UEFN y Unreal Engine con socios como Epic Games, Wizards of the Coast y DC Studios. Responsable de la arquitectura central y de las decisiones técnicas críticas.',
    },
  },
  {
    title: { en: 'VR Technical Lead', es: 'Líder técnico VR' },
    org: 'Vlesim',
    place: 'Quito, EC',
    from: '2025-03',
    to: '2025-06',
    text: {
      en: 'Technical lead of Inspira, the first VR project in Ecuador designed to inspire girls and teenagers toward STEM, for Universidad Internacional del Ecuador with GIZ funding.',
      es: 'Líder técnico de Inspira, el primer proyecto VR de Ecuador para acercar a niñas y adolescentes a STEM, para la Universidad Internacional del Ecuador con financiación de la GIZ.',
    },
  },
  {
    title: { en: 'Curriculum Developer — Full Stack and Mobile', es: 'Diseñador curricular — Full Stack y Móvil' },
    org: 'SENA',
    place: 'Popayán, CO',
    from: '2024-05',
    to: '2024-12',
    text: {
      en: 'Designed the national curriculum for two technical programs: Full Stack Web Development and Mobile App Development.',
      es: 'Diseñé el currículo nacional de dos programas técnicos: Desarrollo Web Full Stack y Desarrollo de Aplicaciones Móviles.',
    },
  },
  {
    title: { en: 'Methodology Lead', es: 'Líder metodológico' },
    org: 'Enlace',
    place: 'Pasto, CO',
    from: '2024-05',
    to: '2024-12',
    text: {
      en: 'Implemented ERP processes company-wide, trained teams in Scrum and defined the role and department structure.',
      es: 'Implementé procesos ERP en toda la empresa, formé equipos en Scrum y definí la estructura de roles y áreas.',
    },
  },
  {
    title: { en: 'Associate Developer', es: 'Desarrollador asociado' },
    org: 'Demiurgo',
    place: 'Mexico City, MX',
    from: '2024',
    to: '2024',
    text: { en: 'Augmented reality features in Unity with Vuforia and AR Foundation.', es: 'Funciones de realidad aumentada en Unity con Vuforia y AR Foundation.' },
  },
  {
    title: { en: 'Director of Art and Technology Labs', es: 'Director de laboratorios de arte y tecnología' },
    org: 'Instituto Departamental de Bellas Artes',
    place: 'Cali, CO',
    from: '2021-03',
    to: '2024-05',
    text: {
      en: 'Led five professionals across three labs (prototyping, digital creativity, VR room) with VR, 3D scanning and printing, and motion capture. Delivered XR and game projects in Unity and Unreal; ran teams with Scrum and Kanban.',
      es: 'Lideré a cinco profesionales en tres laboratorios (prototipado, creatividad digital, sala VR) con realidad virtual, escaneo e impresión 3D y captura de movimiento. Proyectos XR y de juegos en Unity y Unreal; equipos con Scrum y Kanban.',
    },
  },
  {
    title: { en: 'Visiting Researcher — Computer Graphics and VR', es: 'Investigador visitante — Informática gráfica y RV' },
    org: 'Universidad de Granada',
    place: 'Granada, ES',
    from: '2022-01',
    to: '2022-12',
    text: {
      en: 'Built and analyzed digital twins and VR games, explored ML-Agents for agent behavior, and worked with Xsens motion capture, 3D scanning and headsets.',
      es: 'Construí y analicé gemelos digitales y juegos VR, exploré ML-Agents para el comportamiento de agentes y trabajé con captura de movimiento Xsens, escaneo 3D y visores.',
    },
  },
  {
    title: { en: 'Senior / Lead Full Stack Developer', es: 'Desarrollador full stack senior / líder' },
    org: 'Like Photo USA · Like Marketing USA',
    place: 'Duluth, US · remote',
    from: '2020-02',
    to: '2021-03',
    text: {
      en: 'Led web and mobile development on the MERN stack, specializing in React and React Native, and introduced Scrum across teams.',
      es: 'Lideré desarrollo web y móvil con MERN, especializado en React y React Native, e introduje Scrum en los equipos.',
    },
  },
  {
    title: { en: 'Software Developer', es: 'Desarrollador de software' },
    org: 'Alcaldía de Pasto',
    place: 'Pasto, CO',
    from: '2020-08',
    to: '2021-03',
    text: {
      en: 'Citizen-facing web applications with PHP, Symfony and PostgreSQL, and mobile apps with React Native Expo and Firebase.',
      es: 'Aplicaciones web ciudadanas con PHP, Symfony y PostgreSQL, y apps móviles con React Native Expo y Firebase.',
    },
  },
  {
    title: { en: 'Network Administration Monitor', es: 'Monitor de administración de redes' },
    org: 'Universidad de Nariño',
    place: 'Pasto, CO',
    from: '2016',
    to: '2018',
    text: { en: 'Network hardware maintenance, support, installation and configuration.', es: 'Mantenimiento, soporte, instalación y configuración de equipos de red.' },
  },
];

export interface Teaching {
  org: string;
  role: L;
  from: string;
  to: string | null;
  courses: L;
  highlight?: boolean;
}

export const teaching: Teaching[] = [
  {
    org: 'EIG Education · Universidad Internacional del Ecuador',
    role: { en: 'Master’s Professor — Data Analytics and Artificial Intelligence', es: 'Profesor de maestría — Analítica de Datos e Inteligencia Artificial' },
    from: '2026',
    to: null,
    courses: {
      en: 'Deep Learning · Advanced Supervised Learning · Machine Learning · Ethics in AI',
      es: 'Deep Learning · Aprendizaje supervisado avanzado · Machine Learning · Ética en la IA',
    },
    highlight: true,
  },
  {
    org: 'CUN',
    role: { en: 'Postgraduate Lecturer — Game Design and Development', es: 'Docente de posgrado — Diseño y Desarrollo de Videojuegos' },
    from: '2026-05',
    to: null,
    courses: { en: 'Object-oriented programming · Software architecture · Software design', es: 'Programación orientada a objetos · Arquitectura de software · Diseño de software' },
    highlight: true,
  },
  {
    org: 'Jala University',
    role: { en: 'Professor — Commercial Software Engineering', es: 'Profesor — Ingeniería de Software Comercial' },
    from: '2025-02',
    to: null,
    courses: { en: 'Programming 2 · Internet of Things: architectures, protocols, sensors, data', es: 'Programación 2 · Internet de las cosas: arquitecturas, protocolos, sensores, datos' },
  },
  {
    org: 'Universidad Sergio Arboleda',
    role: { en: 'Professor — Digital aesthetics elective', es: 'Profesor — Electiva de estéticas digitales' },
    from: '2025-02',
    to: null,
    courses: { en: 'Art theory with production in Unreal Engine, Unity and After Effects', es: 'Teoría del arte con producción en Unreal Engine, Unity y After Effects' },
  },
  {
    org: 'MinTIC Talento Tech · Tecnalia',
    role: { en: 'Full Stack Web Development Mentor', es: 'Mentor de desarrollo web full stack' },
    from: '2024-09',
    to: '2025-01',
    courses: { en: '120-hour bootcamps for 100+ students: HTML, CSS, JavaScript, React, Express, Next.js', es: 'Bootcamps de 120 horas para más de 100 estudiantes: HTML, CSS, JavaScript, React, Express, Next.js' },
  },
  {
    org: 'Universidad del Cauca',
    role: { en: 'Professor', es: 'Profesor' },
    from: '2020',
    to: '2025',
    courses: { en: 'Object-oriented programming (C#) · Computer Science II · Unity game development', es: 'Programación orientada a objetos (C#) · Informática II · Desarrollo de juegos en Unity' },
  },
  {
    org: 'Universidad del Valle',
    role: { en: 'Engineering Faculty Professor', es: 'Profesor de la Facultad de Ingeniería' },
    from: '2022-08',
    to: '2024-06',
    courses: { en: 'University transition · Introduction to Electronic Engineering', es: 'Transición a la vida universitaria · Introducción a la Ingeniería Electrónica' },
  },
  {
    org: 'CINAR Sistemas',
    role: { en: 'Adjunct Professor', es: 'Profesor adjunto' },
    from: '2019-01',
    to: '2021-12',
    courses: { en: 'Programming and systems design with JavaScript, C# and Python', es: 'Programación y diseño de sistemas con JavaScript, C# y Python' },
  },
  {
    org: 'Universidad de Nariño',
    role: { en: 'Computer Science Professor', es: 'Profesor de informática' },
    from: '2017-06',
    to: '2018-06',
    courses: { en: 'Basic informatics for engineering students', es: 'Informática básica para estudiantes de ingeniería' },
  },
];

export const resources = [
  { title: { en: 'Reinforcement Learning', es: 'Aprendizaje por refuerzo' }, file: '/teaching/Reinforcementlearningweb.pdf', size: '0.8 MB' },
  { title: { en: 'AI and Video Games', es: 'IA y videojuegos' }, file: '/teaching/IAGAMESFRIENDS.pdf', size: '4.4 MB' },
  { title: { en: 'XR: Philosophy, Art and Technology', es: 'XR: filosofía, arte y tecnología' }, file: '/teaching/XRPresentacion.pdf', size: '6.9 MB' },
  { title: { en: 'Agility Is a Mindset Shift', es: 'La agilidad es un cambio de mentalidad' }, file: '/teaching/Agilidad.pdf', size: '2.3 MB' },
  { title: { en: 'Introduction to Electronic Engineering', es: 'Introducción a la Ingeniería Electrónica' }, file: '/teaching/electronicengineering.pdf', size: '1.0 MB' },
  { title: { en: 'History of Electronic Engineering', es: 'Historia de la Ingeniería Electrónica' }, file: '/teaching/HistoriaIngenieriaElectronica.pdf', size: '1.3 MB' },
];

export const education = [
  {
    degree: { en: 'MSc Computer Science', es: 'Maestría en Computación' },
    org: 'Universidad del Cauca',
    years: '2020–2024',
    note: {
      en: 'Thesis: a framework for educational pervasive games that integrate IoT and VR to teach Nasa Yuwe. GPA 4.8/5.0 — Francisco José de Caldas Medal.',
      es: 'Tesis: marco para juegos pervasivos educativos que integran IoT y RV para enseñar nasa yuwe. Promedio 4.8/5.0 — Medalla Francisco José de Caldas.',
    },
  },
  {
    degree: { en: 'BSc Electronic Engineering', es: 'Ingeniería Electrónica' },
    org: 'Universidad de Nariño',
    years: '2013–2018',
    note: {
      en: 'Thesis: automatic emotion classification from brain signals — Meritorious Thesis (99/100).',
      es: 'Tesis: clasificación automática de emociones a partir de señales cerebrales — Tesis meritoria (99/100).',
    },
  },
  {
    degree: { en: 'Diploma in Virtual Teaching', es: 'Diplomado en Educación Virtual' },
    org: 'Universidad del Valle',
    years: '2023',
    note: { en: '100-hour certification program.', es: 'Programa de certificación de 100 horas.' },
  },
];

export const publications = [
  {
    year: '2023',
    title: 'Transcoding Ylama: la producción estético-artística como herramienta para la reflexión sobre la memoria de la cultura Ylama',
    venue: 'XENOLandscapes, XXII International Image Festival',
    kind: { en: 'Book chapter', es: 'Capítulo de libro' },
    url: 'https://festivaldelaimagen.com/wp-content/uploads/2024/03/Memorias_-FII2023_Xenopaisajes.pdf',
  },
  {
    year: '2023',
    title: 'IoT-ATL: Prototype of a Digital Twin to Simulate Educational Scenarios in the Art and Technology Laboratories at the Departmental Institute of Fine Arts in Cali',
    venue: 'Revista Facultad de Ingeniería 32(63)',
    kind: { en: 'Journal article', es: 'Artículo de revista' },
    url: 'https://www.researchgate.net/publication/368720632_IoT-ATL_Prototype_of_a_Digital_Twin_to_Simulate_Educational_Scenarios_in_the_Art_and_Technology_Laboratories_at_the_Departmental_Institute_of_Fine_Arts_in_Cali_Colombia',
  },
  {
    year: '2023',
    title: 'La transmutación del ser humano a hibridaciones corporales mediante una experiencia audiovisual en Realidad Virtual',
    venue: 'Instituto Departamental de Bellas Artes',
    kind: { en: 'Pre-print', es: 'Pre-print' },
    url: 'https://www.researchgate.net/publication/373216168_La_transmutacion_del_ser_humano_a_hibridaciones_corporales_mediante_una_experiencia_audiovisual_en_Realidad_Virtual',
  },
  {
    year: '2019',
    title: 'Recognition of Emotions Using ICEEMD-Based Characterization of Multimodal Physiological Signals',
    venue: 'IEEE Latin American Symposium on Circuits and Systems (LASCAS)',
    kind: { en: 'Conference paper', es: 'Ponencia' },
    url: 'https://ieeexplore.ieee.org/document/8667585',
  },
  {
    year: '2019',
    title: 'Feature Extraction Analysis for Emotion Recognition from ICEEMD of Multimodal Physiological Signals',
    venue: 'Intelligent Information and Database Systems — ACIIDS 2019, Springer',
    kind: { en: 'Conference paper', es: 'Ponencia' },
    url: 'https://link.springer.com/chapter/10.1007/978-3-030-14799-0_30',
  },
  {
    year: '2018',
    title: 'Interpretación semántica computarizada de señales cerebrales para identificar emociones: un estado del arte',
    venue: 'Editorial UTN, Ibarra',
    kind: { en: 'Article', es: 'Artículo' },
    url: 'https://www.researchgate.net/publication/332739671_Interpretacion_semantica_computarizada_de_senales_cerebrales_para_identificar_emociones_Un_estado_del_arte',
  },
];

export const awards = [
  { year: '2024', name: { en: 'Francisco José de Caldas Medal — outstanding graduate research, GPA 4.8', es: 'Medalla Francisco José de Caldas — investigación de posgrado destacada, promedio 4.8' }, org: 'Universidad del Cauca', url: 'https://drive.google.com/file/d/1DFo828xbnmF6uHj6MiiIKAu04GXFmO9l/view?usp=drive_link' },
  { year: '2024', name: { en: '1,000 Leaders for Colombia — full leadership-school scholarship', es: '1.000 Líderes por Colombia — beca completa de escuela de liderazgo' }, org: 'Fundación Origen' },
  { year: '2023', name: { en: 'Youth Award, Science, Technology and Innovation', es: 'Premio Juventud, ciencia, tecnología e innovación' }, org: 'Alcaldía de Pasto', url: 'https://drive.google.com/drive/folders/1fAPZwNMi0yWkJumeWhoEDma5nYlvQTId?usp=sharing' },
  { year: '2022', name: { en: 'Andalusia Research Mobility Scholarship', es: 'Beca de movilidad de investigación Andalucía' }, org: 'AUIP', url: 'https://drive.google.com/file/d/1MVwe-a_w8aoBKihzasxxUu6z5mjiz9os/view?usp=sharing' },
  { year: '2022', name: { en: 'Work-Study Scholarship', es: 'Beca de trabajo' }, org: 'Universidad del Cauca', url: 'https://drive.google.com/file/d/1kAAmIb6OBm-bJ0KHLUQyUdTk6FS1W-Gz/view?usp=sharing' },
  { year: '2021', name: { en: 'PTF Research Grant', es: 'Beca de investigación PTF' }, org: 'SDAS Research Group', url: 'https://drive.google.com/file/d/1fLUbxB1o8nUIgd0PytMHl1j8mTYdDBHz/view?usp=sharing' },
  { year: '2019', name: { en: 'Local People’s Choice — “Rotten Reality”', es: 'Elección del público local — “Rotten Reality”' }, org: 'NASA Space Apps Challenge', url: 'https://drive.google.com/file/d/11ahNYWrVpvPZOj5CPPJHtA5PD7mqq_Rn/view?usp=sharing' },
  { year: '2018', name: { en: 'Meritorious Thesis, 99/100', es: 'Tesis meritoria, 99/100' }, org: 'Universidad de Nariño', url: 'https://drive.google.com/file/d/1HaGJG1r9zuBGk-N7MzjxSaPztdljUJ11/view?usp=sharing' },
  { year: '2017', name: { en: 'Outstanding Student of the Year 2016–2017', es: 'Estudiante destacado 2016–2017' }, org: 'Universidad de Nariño', url: 'https://drive.google.com/file/d/1NT5z5ynDua42AlBNCEaLeUjUXIb8Zs14/view?usp=sharing' },
  { year: '2017', name: { en: '“The Youth Leader” — Character of the Day', es: '“El líder juvenil” — Personaje del día' }, org: 'pagina10.com', url: 'https://pagina10.com/web/lider-juvenil-andres-ordonez-bolanos-es-el-personaje-10-del-dia/' },
  { year: '2017', name: { en: 'National award for the 2nd UDENAR robotics tournament (XV RNR)', es: 'Premio nacional por el 2.º torneo de robótica UDENAR (XV RNR)' }, org: 'IEEE UDENAR', url: 'https://drive.google.com/file/d/1diwmO8aEGWwRziDnXBsElD6shx2n5Rux/view?usp=sharing' },
  { year: '2013–2018', name: { en: 'President, IEEE Student Branch', es: 'Presidente, rama estudiantil IEEE' }, org: 'Universidad de Nariño', url: 'https://drive.google.com/file/d/1Y5d4rNiKmp8E00mqsHh-mMeIb53y_tvK/view?usp=sharing' },
  { year: '2013–2017', name: { en: 'Student Representative, Electronic Engineering', es: 'Representante estudiantil, Ingeniería Electrónica' }, org: 'Universidad de Nariño' },
  { year: '2012', name: { en: 'Winner and speaker — “Extreme Sports as an Alternative for Life”', es: 'Ganador y ponente — “Deportes extremos como alternativa de vida”' }, org: 'IOM · Pasto Extremo' },
];

export const talks = [
  { year: '2023', title: { en: 'Visual live coding and synthesis: deep listening, seeing and programming', es: 'Live coding visual y síntesis: escucha, mirada y programación profundas' }, role: { en: 'Co-creator and presenter', es: 'Cocreador y expositor' }, place: 'MASS · Universidad del Valle, Cali' },
  { year: '2023', title: { en: 'Artificial intelligence for games: deep reinforcement learning', es: 'Inteligencia artificial para videojuegos: aprendizaje por refuerzo profundo' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'Institución Universitaria Antonio José Camacho, Cali' },
  { year: '2023', title: { en: 'Innovation with AI: essential tools and new perspectives', es: 'Innovación con IA: herramientas esenciales y nuevas perspectivas' }, role: { en: 'Workshop facilitator', es: 'Tallerista' }, place: 'Institución Universitaria Antonio José Camacho, Cali' },
  { year: '2023', title: { en: 'Transcoding Ylama', es: 'Transcoding Ylama' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'XXII International Image Festival · Bellas Artes, Cali' },
  { year: '2023', title: { en: 'Human transmutation into bodily hybridizations through VR (Coniunctum Corpora)', es: 'Transmutación humana en hibridaciones corporales mediante RV (Coniunctum Corpora)' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'Bellas Artes, Cali' },
  { year: '2023', title: { en: 'Motion capture workshop — research between art, design and technology', es: 'Taller de captura de movimiento — investigación entre arte, diseño y tecnología' }, role: { en: 'Workshop facilitator', es: 'Tallerista' }, place: 'Bellas Artes, Cali' },
  { year: '2023', title: { en: 'A brief note on the construction of IoT-LAT', es: 'Breve nota sobre la construcción de IoT-LAT' }, role: { en: 'Speaker', es: 'Ponente' }, place: '1st International Colloquium, PhD in Computer Science, Universidad del Cauca' },
  { year: '2022', title: { en: 'New Realities: XR from art and philosophy', es: 'Nuevas realidades: XR desde el arte y la filosofía' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'Shibuya Fest, Pasto' },
  { year: '2022', title: { en: 'From transhumanism to virtual reality', es: 'Del transhumanismo a la realidad virtual' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'International Comic Convention, Pasto' },
  { year: '2020', title: { en: 'Pervasive games, a new challenge for education', es: 'Juegos pervasivos, un nuevo reto para la educación' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'I International Online Congress on Telecommunications, Peru' },
  { year: '2020', title: { en: 'From social to research', es: 'De lo social a lo investigativo' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'Bla Bla Talks, Bogotá' },
  { year: '2020', title: { en: 'Game development in Unity', es: 'Desarrollo de videojuegos en Unity' }, role: { en: 'Workshop facilitator', es: 'Tallerista' }, place: 'Universidad del Cauca' },
  { year: '2020', title: { en: 'Youth Week: science and technology, software for social change, hackathon', es: 'Semana de la Juventud: ciencia y tecnología, software para el cambio social, hackathon' }, role: { en: 'Speaker, moderator and jury', es: 'Ponente, moderador y jurado' }, place: 'Alcaldía y Gobernación de Nariño, Pasto' },
  { year: '2017–2019', title: { en: 'Machine learning for emotion detection with EEG signals', es: 'Aprendizaje automático para detectar emociones con señales EEG' }, role: { en: 'Speaker', es: 'Ponente' }, place: 'Ciencia en el Bar · UPEC (EC) · UTN (EC) · IEEE Southwest' },
  { year: '2013–2021', title: { en: 'Robotics tournaments, League of Legends tournaments, Galeras Week', es: 'Torneos de robótica, torneos de League of Legends, Galeras Week' }, role: { en: 'Organizer', es: 'Organizador' }, place: 'IEEE UDENAR · Galeras Geek and Gaming, Pasto' },
];

export const courses = [
  { year: '2024', name: 'Advanced Scrum Certified Expert', org: 'CertJoin' },
  { year: '2024', name: 'Scrum Product Owner Certified Expert', org: 'CertJoin' },
  { year: '2023', name: 'Scrum Master Certified Expert', org: 'CertJoin', url: 'https://drive.google.com/file/d/1kUuWby5Ej-Mo2L8iiMmax57olTF1LJya/view' },
  { year: '2022', name: 'Introduction to AI in the Data Center', org: 'NVIDIA', url: 'https://www.credly.com/badges/cf58a513-a871-41f5-ae6f-f1e5fc81f861/linked_in_profile' },
  { year: '2022', name: 'Introduction to Virtual Reality', org: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/certificate/WB5FG25EUZWM' },
  { year: '2022', name: 'Instagram face filters with Spark AR', org: 'Platzi', url: 'https://platzi.com/p/andres-ordonez-bolanos/course/2647-filtros-spark-ar/diploma/detalle/' },
  { year: '2021', name: 'Augmented Reality with Unity (Master)', org: 'Udemy', url: 'https://www.udemy.com/certificate/UC-43bc7799-ba44-4ee7-9024-6736b5905a90/' },
  { year: '2021', name: 'Mastering Video Games with Unity', org: 'Udemy', url: 'https://www.udemy.com/certificate/UC-30beecd2-5f08-48cb-b5e7-ab0fe09be30a/' },
  { year: '2021', name: 'Problem Solving Using Computational Thinking', org: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/5NSL2BPU8QFE' },
  { year: '2020', name: 'Using Python for Research', org: 'HarvardX', url: 'https://courses.edx.org/certificates/c38403c2be9c4530a730fa83cc57c45e' },
  { year: '2020', name: 'Game Development in Unity', org: 'Universidad de los Andes', url: 'https://www.coursera.org/account/accomplishments/certificate/8NKXVLQA62XW' },
  { year: '2020', name: 'Scientific Thinking', org: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/USEUWDG39APF' },
  { year: '2020', name: 'Responsive Web Design', org: 'freeCodeCamp', url: 'https://www.freecodecamp.org/certification/fccb103e4fb-a9a6-4678-aaf4-bb41518f3453/responsive-web-design' },
  { year: '2020', name: 'Professional Git and GitHub', org: 'Platzi', url: 'https://platzi.com/p/andres-ordonez-bolanos/curso/1194-git-appsco-2017/diploma/detalle/' },
  { year: '2022', name: 'Basic Photoshop', org: 'Platzi', url: 'https://platzi.com/p/andres-ordonez-bolanos/curso/1230-course/diploma/detalle/' },
];

/** Bill of materials: skills listed the way a board lists its parts. */
export const bom = [
  { ref: 'L1', group: { en: 'Languages', es: 'Lenguajes' }, items: ['Verse', 'C++', 'C#', 'Python', 'JavaScript / TypeScript', 'Luau', 'GLSL', 'MATLAB'] },
  { ref: 'E1', group: { en: 'Engines', es: 'Motores' }, items: ['Unreal Engine', 'UEFN', 'Unity', 'Roblox Studio', 'Three.js'] },
  { ref: 'X1', group: { en: 'XR', es: 'XR' }, items: ['XR Interaction Toolkit', 'AR Foundation', 'ARCore', 'Vuforia', 'Oculus Integration', 'UltimateXR', 'Photon Engine', 'Lightship ARDK', 'Spark AR'] },
  { ref: 'A1', group: { en: 'AI and data', es: 'IA y datos' }, items: ['Deep learning', 'Supervised learning', 'Reinforcement learning', 'ML-Agents', 'Signal processing'] },
  { ref: 'W1', group: { en: 'Web and mobile', es: 'Web y móvil' }, items: ['React', 'React Native', 'Node.js', 'Express', 'Next.js', 'Firebase', 'MongoDB', 'MySQL', 'PostgreSQL'] },
  { ref: 'H1', group: { en: 'Hardware', es: 'Hardware' }, items: ['Arduino', 'Raspberry Pi', 'XBee', 'Microcontrollers', 'Motion capture', 'Shining 3D scanning', 'FDM/SLA printing', 'Laser cutting', 'CNC router'] },
  { ref: 'M1', group: { en: 'Leadership', es: 'Liderazgo' }, items: ['Scrum Master', 'Product Owner', 'Kanban', 'Technical direction', 'Mentoring'] },
  { ref: 'T1', group: { en: 'Tools', es: 'Herramientas' }, items: ['Git', 'Jira', 'Trello', 'Visual Studio', 'VS Code', 'Blender', 'Photoshop', 'Illustrator', 'Inkscape', 'Proteus', 'RdWorks'] },
];

export const ventures = [
  { name: 'Realidades X', text: { en: 'Immersive experiences and XR solutions — more than 100 clients served.', es: 'Experiencias inmersivas y soluciones XR — más de 100 clientes.' }, url: 'https://realidadesx.vercel.app/' },
  { name: 'Galeras Geek and Gaming', text: { en: 'Events, products, community and development for geek and gaming culture.', es: 'Eventos, productos, comunidad y desarrollo para la cultura geek y gamer.' } },
  { name: 'Funbotic', text: { en: 'Educational robotics for STEM learning.', es: 'Robótica educativa para aprender STEM.' } },
];

/** Capability pillars shown first on the home page. Numbers come from the CV. */
export const pillars = [
  {
    figure: '15',
    unit: { en: 'engineers led', es: 'ingenieros liderados' },
    title: { en: 'Engineering leadership', es: 'Liderazgo de ingeniería' },
    points: [
      { en: 'Lead Programmer at Teravision Games: core systems architecture and high-stakes technical decisions.', es: 'Lead Programmer en Teravision Games: arquitectura de sistemas centrales y decisiones técnicas críticas.' },
      { en: 'Shipped with Epic Games, Wizards of the Coast, DC Studios and Meta as partners.', es: 'Lanzamientos con Epic Games, Wizards of the Coast, DC Studios y Meta como socios.' },
      { en: 'Certified Scrum Master, Product Owner and Advanced Scrum; teams run with Scrum and Kanban.', es: 'Scrum Master, Product Owner y Advanced Scrum certificado; equipos con Scrum y Kanban.' },
    ],
    stack: ['Technical direction', 'Code review', 'Mentoring', 'Scrum', 'LiveOps'],
  },
  {
    figure: '7+',
    unit: { en: 'years building games and XR', es: 'años creando juegos y XR' },
    title: { en: 'Game and XR engineering', es: 'Ingeniería de juegos y XR' },
    points: [
      { en: 'UEFN and Verse multiplayer roguelikes, tycoons and branded islands played by millions.', es: 'Roguelikes multijugador, tycoons e islas de marca en UEFN y Verse, jugados por millones.' },
      { en: 'Unreal Engine C++ optimization and AI for a Meta Quest launch.', es: 'Optimización e IA en C++ con Unreal Engine para un lanzamiento en Meta Quest.' },
      { en: 'Unity VR, AR and digital twins connected to IoT hardware.', es: 'VR, AR y gemelos digitales en Unity conectados a hardware IoT.' },
    ],
    stack: ['Verse', 'UEFN', 'Unreal C++', 'Unity C#', 'XR Toolkit', 'Roblox'],
  },
  {
    figure: '8+',
    unit: { en: 'years teaching', es: 'años enseñando' },
    title: { en: 'AI and software teaching', es: 'Docencia en IA y software' },
    points: [
      { en: 'Master’s professor of Deep Learning, Advanced Supervised Learning, Machine Learning and Ethics in AI.', es: 'Profesor de maestría en Deep Learning, Aprendizaje Supervisado Avanzado, Machine Learning y Ética en la IA.' },
      { en: 'Postgraduate courses in software architecture and OOP for game development.', es: 'Cursos de posgrado en arquitectura de software y POO para videojuegos.' },
      { en: 'Designed a national curriculum and trained 100+ developers in bootcamps.', es: 'Diseñé un currículo nacional y formé a más de 100 desarrolladores en bootcamps.' },
    ],
    stack: ['Deep learning', 'Python · Keras · TensorFlow', 'Machine learning', 'AI ethics', 'Software architecture'],
  },
  {
    figure: '6',
    unit: { en: 'publications', es: 'publicaciones' },
    title: { en: 'Research and creative technology', es: 'Investigación y tecnología creativa' },
    points: [
      { en: 'IEEE and Springer papers on emotion recognition from physiological signals.', es: 'Artículos en IEEE y Springer sobre reconocimiento de emociones con señales fisiológicas.' },
      { en: 'Visiting researcher in VR and digital twins at the University of Granada.', es: 'Investigador visitante en RV y gemelos digitales en la Universidad de Granada.' },
      { en: 'Art installations in VR, 3D printing and creative coding.', es: 'Instalaciones artísticas con RV, impresión 3D y programación creativa.' },
    ],
    stack: ['Signal processing', 'Digital twins', 'IoT', 'Creative coding', 'Motion capture'],
  },
];

/** Logo plate per organisation (public/img/logos), keyed by the first words of the org name. */
const logoMap: [RegExp, string][] = [
  [/Teravision/, 'teravision'], [/Vlesim/, 'vlesim'], [/SENA/, 'sena'], [/Enlace/, 'enlace'], [/Demiurgo/, 'demiurgo'],
  [/Bellas Artes/, 'bellas-artes'], [/Granada/, 'granada'], [/Like Photo/, 'like-photo'], [/Alcald/, 'alcaldia-pasto'],
  [/Nari/, 'udenar'], [/CUN/, 'cun'], [/Jala/, 'jala'], [/Sergio Arboleda/, 'sergio-arboleda'], [/Talento Tech/, 'talento-tech'],
  [/Cauca/, 'unicauca'], [/Valle/, 'univalle'], [/CINAR/, 'cinar'], [/Realidades X/, 'realidades-x'], [/Galeras/, 'galeras'],
  [/Funbotic/, 'funbotic'], [/CertJoin/, 'certjoin'], [/Udemy/, 'udemy'],
];
export const logoFor = (org: string) => {
  const hit = logoMap.find(([re]) => re.test(org));
  return hit ? `/img/logos/${hit[1]}.webp` : undefined;
};

/** One image per role, taken from the work done there. */
const roleImage: [RegExp, string][] = [
  [/Teravision/, '/img/projects/sm/havoc-hotel-3.webp'], [/Vlesim/, '/img/projects/inspira.webp'],
  [/Bellas Artes/, '/img/projects/coniuctum.webp'], [/Granada/, '/img/projects/digitalTwin.webp'],
  [/Like Photo/, '/img/projects/bigbang.webp'], [/Alcald/, '/img/projects/sm/repara.webp'], [/Demiurgo/, '/img/projects/raices.webp'],
];
export const imageFor = (org: string) => roleImage.find(([re]) => re.test(org))?.[1];
