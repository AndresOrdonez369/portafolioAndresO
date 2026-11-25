# Plan de implementación — Portafolio Andrés Ordóñez-Bolaños

Versión 2 · 2026-11-11 · Estado: **brief para confirmar, sin código del sitio todavía**
Contexto de producto: [PRODUCT.md](PRODUCT.md) · Boceto del hero: [hero-v2.html](.impeccable/mocks/hero-v2.html)

**Qué cambió frente a la versión 1**

- Concepto más fuerte: **Mapa y Territorio**. El sitio existe en dos vistas del mismo contenido.
- Siete capítulos, cada uno con una idea filosófica tuya, un objeto surrealista en 3D y una pieza de creative coding.
- Paleta ampliada con los colores de tu autorretrato, bajo una regla clara de uso.
- Más 3D y más animación, con un inventario concreto.
- Garantías de claridad escritas como reglas.
- Inventario completo: se sumó todo lo del sitio actual (premios con año, papers, cursos, clases, charlas, PDF de clases).
- Datos de los juegos verificados en fuentes públicas (sección 10).

---

## 1. Resumen

| Decisión | Valor |
|---|---|
| Visitante principal | Recruiters y directores técnicos de estudios de juegos (AAA / UEFN / XR) |
| Acción que debe ocurrir | Contactarte como Lead Programmer / Tech Lead; descargar CV |
| Modo | Experience: el trabajo lidera desde la primera pantalla |
| Dirección | **Signal Path — Mapa y Territorio** |
| Stack | Astro + Three.js + GSAP, contenido en Markdown/MDX |
| Idiomas | Inglés por defecto, español con selector |
| Confidencialidad | Solo información pública de proyectos Teravision |
| Construcción | Code-led, con prototipo del hero antes de construir el resto |

---

## 2. Concepto: Mapa y Territorio

Una placa de circuito es un dibujo que se volvió cosa. Primero existe el esquemático, que es un mapa; luego la placa, que es el territorio. Es la idea de Baudrillard y de Lévy que ya citas en tu CV, hecha hardware. El sitio muestra tu carrera en esas dos vistas:

- **MAP (esquemático).** Toda tu carrera en una pantalla: bloques, conexiones, cifras, enlaces. Limpio, plano, legible en treinta segundos. Es la lectura profesional.
- **TERRITORY (placa).** El mismo contenido como paisaje metafísico en 3D que se recorre con el scroll. Es la obra.

Un interruptor fijo cambia de una a otra, y el cambio es la animación firma: las líneas del esquemático se levantan y se vuelven placa.

**Tres reglas que ordenan todo**

1. **Ingeniería en fósforo, lo humano en color.** La placa es noche índigo y verde. Donde entra el arte, la docencia o lo personal, el color sangra como pintura, con la paleta de tu autorretrato. El color crece a lo largo del recorrido: casi monocromo en los juegos (el key art pone el color), espectro completo al llegar a tu retrato.
2. **Mate contra iridiscente.** La placa es mate y exacta. Los objetos surrealistas son iridiscentes, como pintura sobre cromo. Se distinguen al instante: lo construido y lo soñado.
3. **Nada es adorno.** Cada objeto, destello o cifra apunta a un hecho tuyo verificable.

**Prueba de memoria.** Quien vea solo la primera pantalla recordará: "una placa negra bajo un cielo violeta, con un chip que era un videojuego y una pista que se derretía en pintura".

**Lo que rechaza.** El portafolio dev oscuro con texto que se escribe solo, partículas de fondo y tarjetas iguales.

---

## 3. Dirección visual

### 3.1 El mundo

- **Suelo:** máscara de soldadura mate, noche índigo. Sin secciones blancas.
- **Serigrafía:** verde fósforo. Es la voz de la interfaz.
- **Horizonte:** la placa se extiende hasta una línea de horizonte con cielo violeta a magenta, sombras largas, silencio (plazas de De Chirico; máquinas de Remedios Varo).
- **Componentes con función:** chip (`U`) = proyecto · punto de prueba (`TP`) = métrica con fuente · conector (`J`) = entrada y salida · lista de materiales (BOM) = habilidades · cara superior e inferior = industria y arte.
- **Oro ENIG:** solo reconocimientos.

### 3.2 Color

Paleta completa. Escena: director técnico frente a monitor grande, abre el enlace desde LinkedIn; debe sentirse como key art de un juego, no como documento.

| Rol | Valor inicial | Uso |
|---|---|---|
| Noche (suelo) | `#0a0a1c` | Fondo de todo el sitio |
| Placa 2 | `#12122b` | Paneles y superficies elevadas |
| Pista apagada | `#23235a` | Pistas sin señal, bordes |
| **Fósforo** (señal) | `#35f58a` | Serigrafía, interacción, foco, pista encendida |
| **Oro ENIG** | `#d9b45a` | Solo premios y nominaciones |
| Violeta | `#6c4de0` | Capítulo Time · cielo |
| Magenta | `#ff4fa3` | Capítulo Simulacra · cielo |
| Cian | `#3fe6d6` | Capítulo Seeing |
| Azul eléctrico | `#2f7dff` | Capítulo The Virtual |
| Naranja | `#ff5f2e` | Capítulo Becoming |
| Amarillo ácido | `#f2e23a` | Solo dentro de mezclas de pintura |
| Serigrafía clara | `#ecebff` | Texto de lectura |
| Apagado | `#9a9cc0` | Texto secundario |

Los seis colores del retrato tienen dos usos y solo dos: **color de capítulo** (un color por capítulo, también en la vista MAP, como los colores de red en un programa de diseño de placas) y **pintura** (goteos, iridiscencia de los objetos, piezas de creative coding). El texto nunca va en esos colores. Valores finales en OKLCH; contraste AA verificado.

### 3.3 Tipografía

| Voz | Fuente | Uso |
|---|---|---|
| Serigrafía grande | Big Shoulders Display 700/900 (Stencil para designadores) | Nombre, títulos, cifras |
| Leyenda | Martian Mono 400/600 | Etiquetas, metadatos, consola |
| Lectura | Familjen Grotesk 400/600 | Párrafos |
| Arte | Bodoni Moda itálica | Solo citas filosóficas y fichas de obra |

Jerarquía por contraste de escala. Fuentes servidas desde el sitio, `woff2`, subconjunto latino.

### 3.4 Movimiento

- Una coreografía: **la señal**. El scroll la mueve.
- Gramática futurista: estelas repetidas, entradas en diagonal, velocidad; salida exponencial, sin rebotes.
- Lo surrealista se mueve **lento**: los objetos flotan, giran y gotean despacio. Nada parpadea, nada salta.
- `prefers-reduced-motion`: se abre en vista MAP, sin recorrido de cámara.

---

## 4. Los siete capítulos

Todos los capítulos tienen la misma anatomía: **número · título · una frase · contenido · un objeto · un estudio**. Esa repetición es lo que mantiene el sitio ordenado.

| # | Capítulo | Idea (de tus citas) | Contenido | Objeto surrealista 3D | Estudio (creative coding) | Color |
|---|---|---|---|---|---|---|
| 00 | **Boot** | "El mapa precede al territorio" | Nombre, rol, Raptor Heist con trailer, 3 métricas, Contact y CV | La placa-plaza con horizonte | *Phosphor Field*: campo de flujo sobre las pistas | Fósforo + primer goteo |
| 01 | **Simulacra** | Baudrillard: "el simulacro es verdadero" | Juegos lanzados (6 destacados) | Chips que se abren: cada uno es una ventana a un mundo, con diorama en profundidad | *Hall of Mirrors*: retroalimentación de imagen, estilo Hydra | Magenta |
| 02 | **Recognition** | — (interludio) | Nominaciones y premios | Barra dorada que se enciende tramo a tramo | — | Oro |
| 03 | **Time** | Heidegger: el tiempo como apertura | Trayectoria profesional | **Pista derretida**: la línea de tiempo se derrite; el pasado gotea pintura, el presente está sólido y encendido | *Soft Time*: simulación de goteo | Violeta |
| 04 | **Seeing** | Schopenhauer: pensar lo que nadie pensó sobre lo que todos ven | Docencia y recursos | Lente flotante de anillos concéntricos que sigue al cursor | *Perceptron*: red neuronal pequeña que aprende en vivo en el navegador | Cian |
| 05 | **The Virtual** | Lévy: los mundos virtuales expanden la realidad | Investigación, XR y arte; la placa **se voltea** a su cara inferior | Marco de puerta de pie; al otro lado, otro cielo | *ICEEMD*: una señal se descompone en sus modos (tu paper de IEEE), con datos sintéticos rotulados | Azul eléctrico |
| — | **BOM** | — (interludio denso) | Stack y habilidades como lista de materiales | — | — | Fósforo |
| 06 | **Becoming** | Du Bos: sacrificar lo que somos por lo que podemos ser | Sobre ti: biografía, pasiones, emprendimientos | Tu autorretrato "Me transhumanism" se arma con partículas de pintura; caballo de ajedrez | *Swarm*: agentes que evolucionan rutas (tu Bee Genetic Race) | Espectro completo |
| 07 | **Mirror** | "La tecnología es el espejo más honesto" | Contacto: correo, LinkedIn, GitHub, CV | Plano de cobre pulido que refleja la escena y la luz del cursor; conector `J2` | — | Vuelve al fósforo |

Cada estudio lleva ficha de obra (título, año, técnica), un control para jugar con él y enlace a su código fuente. Es código tuyo del propio sitio, sin restricciones de confidencialidad, y sirve de muestra técnica.

**Hilo Matrix**, dentro del mundo:

- Al voltear la placa (capítulo 05), glifos caen **por dentro de las vías**. Conjunto de glifos tomado de tus lenguajes: tokens de Verse, C++, GLSL, hex.
- **Rayos X.** Mantener pulsada la tecla `X` (o el botón "See the code") muestra la escena como malla de alambre con datos, mientras dure la pulsación.
- **Consola** con `/`: `open raptor-heist`, `map`, `cv`, `lang es`, `whoami`. Huevo de pascua: `follow the white rabbit`.

---

## 5. Garantías de claridad

1. **Vista MAP a un clic, siempre.** Currículum completo en una pantalla, imprimible. Es también la versión sin WebGL y la de movimiento reducido.
2. **Ruta de treinta segundos.** La primera pantalla ya dice rol, juego principal, cifras y contacto.
3. **Índice de capítulos fijo** (00–07) con progreso; se salta a cualquiera.
4. **Anatomía repetida** en cada capítulo.
5. **El arte no tapa el texto.** Los objetos viven en zonas reservadas; las columnas de texto van sobre fondo calmo.
6. **Surrealista, no incómodo.** Formas geométricas y monumentales, movimiento lento. Sin anatomía realista, sin distorsión agresiva, sin destellos.
7. **Intro breve.** Arranque de 1.5 s como máximo, una vez por sesión, se puede saltar.
8. **Una acción principal por pantalla**, con foco por defecto. `CONTACT` siempre visible.
9. **Todo dato con fuente y fecha.**

---

## 6. Arquitectura de información

```
/                      Home: los siete capítulos (TERRITORY) o el esquemático (MAP)
/work                  Índice de proyectos con filtros
/work/[slug]           Caso de estudio
/experience            Trayectoria completa
/teaching              Docencia + recursos
/teaching/[slug]       Recurso o curso
/research              Publicaciones + obra de arte y tecnología
/studies               Las piezas de creative coding, como galería
/talks                 Charlas, talleres, eventos
/about                 Biografía, filosofía, pasiones, emprendimientos
/cv                    CV en HTML + PDF
/es/...                Espejo en español
404                    "Circuito abierto"
```

Controles globales, solo cuatro: índice de capítulos · `MAP | TERRITORY` · `EN | ES` · `CONTACT`.

**Caso de estudio:** cabecera con el chip "destapado" en 3D y el trailer dentro → título, rol, estudio, año, plataforma, motor, estado → código de isla copiable → métricas con fuente → reconocimientos → "qué hice" en términos generales → créditos del equipo (con permiso) → galería → siguiente proyecto.

**Móvil:** vistas guiadas en vez de órbita libre; placa vista desde arriba con paralaje leve; navegación en hoja inferior; MAP como lista vertical.

---

## 7. Inventario de contenido

### 7.1 Industria — Teravision Games, Lead Programmer (desde jun 2025)

| Proyecto | Datos públicos verificados |
|---|---|
| **Steal an Egg** | Isla 6898-9449-5160 · colaboración Do Big Studios × Misfits Gaming × TeraCreators · 565.1M minutos, 318K favoritos, 94.2% (Fortnite.gg, tu captura) |
| **Raptor Heist: A Havoc Hotel Roguelike** | Isla 1311-3035-1480 · 156.5M minutos, 121.1K favoritos, 88.2% · Nominee, The Game Awards: Vote in Fortnite 2025 · nominado Best Use of Verse (UEFN Community Awards) |
| **Havoc Hotel 3** | Isla 0335-8436-1670 · roguelike cooperativo, sistema de prestigio |
| **Havoc Hotel 2** | Isla 7996-5597-0868 |
| **Clayface × Havoc Hotel** | Campaña de DC Studios con Chartis para Warner Bros. Discovery; Havoc Hotel 2, Havoc Hotel 3 y Klombos Bed Wars; octubre 2026 |
| **Dungeons & Dragons** (Wizards of the Coast) | Lanzado 20 ene 2026 · isla del Zombie Dragon, código 2525-9596-3235 · artículo técnico de Epic en fortnite.com (17 feb 2026) |
| **Orcs Must Die! By the Blade** | Desarrollado y publicado por Teravision · Meta Quest 3/3S, 12 feb 2026 · líder técnico en la etapa final: optimización e IA |

### 7.2 XR, arte e investigación

Inspira (Vlesim / UIDE / GIZ) · Inti: El Ritual del Fuego · Coniunctum Corpora · IoT-LAT · Transcoding Ylama · ALICE · CIB: AR · Raíces · Bee Genetic Race · Rotten Reality (NASA Space Apps).

### 7.3 Web y móvil (archivo)

Big Bang Cash · KlK Msn · Let's Goal · Repara App.

### 7.4 Experiencia profesional

Teravision Games (Lead Programmer I, jun 2025–hoy) · Vlesim (VR Technical Lead, mar–jun 2025) · SENA (diseño curricular, may–dic 2024) · Demiurgo (AR, 2024) · Enlace (líder metodológico, may–dic 2024) · Bellas Artes Cali (director de laboratorios de arte y tecnología, 2021–2024) · Universidad de Granada (investigador visitante, 2022) · Like Photo USA / Like Marketing USA (líder full stack, 2020–2021) · Alcaldía de Pasto (2020–2021) · Universidad de Nariño (monitor de redes, 2016–2018).

### 7.5 Docencia

| Institución | Qué enseñas |
|---|---|
| **EIG Education / UIDE** | Máster en Analítica de Datos y máster en Inteligencia Artificial: Deep Learning, Aprendizaje Supervisado Avanzado, Machine Learning, Ética en la IA |
| CUN (desde may 2026) | Posgrado en videojuegos: POO, arquitectura y diseño de software |
| Jala University (desde feb 2025) | Programación 2, IoT |
| Sergio Arboleda (desde feb 2025) | Estéticas digitales: Unreal, Unity, After Effects |
| MinTIC Talento Tech / Tecnalia | Bootcamps full stack, más de 100 estudiantes |
| Universidad del Cauca | POO en C#, Unity, fundamentos |
| Universidad del Valle | Cursos de ciclo común de ingeniería |
| CINAR Sistemas | Programación y diseño de sistemas |
| Universidad de Nariño | Informática básica |
| SENA | Currículo nacional de Full Stack y Apps Móviles |

**Recursos ya disponibles** (seis PDF del sitio actual): Reinforcement Learning · XR: Philosophy, Art and Technology · Agility is a Mindset Shift · Introduction to Electronic Engineering · History of Electronic Engineering · AI and Video Games. Son la semilla de `/teaching`.

### 7.6 Formación

MSc Computer Science, Universidad del Cauca (GPA 4.8/5, Medalla Caldas) · BSc Ingeniería Electrónica, Universidad de Nariño (tesis 99/100) · Diplomado en Educación Virtual, Universidad del Valle (2023).

### 7.7 Publicaciones (6)

1. Transcoding Ylama — capítulo, XENOLandscapes, XXII Festival Internacional de la Imagen, 2023.
2. IoT-ATL, gemelo digital — Revista Facultad de Ingeniería 32(63), 2023.
3. La transmutación del ser humano a hibridaciones corporales (Coniunctum Corpora) — pre-print, 2023.
4. Recognition of Emotions Using ICEEMD — IEEE LASCAS, 2019.
5. Feature Extraction Analysis for Emotion Recognition — Springer, ACIIDS 2019.
6. Interpretación semántica computarizada de señales cerebrales — Editorial UTN, 2018.

### 7.8 Premios y honores (13)

2024 Medalla Francisco José de Caldas · 2024 1,000 Líderes para Colombia · 2023 Premio Juventud, Pasto la Gran Capital · 2022 Beca de movilidad AUIP Andalucía · 2021 Beca PTF, grupo SDAS · Beca de trabajo, Universidad del Cauca · 2019 NASA Space Apps, elección del público local ("Rotten Reality") · 2018 Tesis meritoria 99/100 · 2017 Estudiante destacado 2016–2017 · 2017 Personaje del día, pagina10.com · 2017 Premio XV RNR, rama IEEE UDENAR · 2013–2018 Presidente rama estudiantil IEEE · 2013–2017 Representante estudiantil · 2012 Ganador y ponente, OIM con Pasto Extremo.

### 7.9 Charlas, talleres y eventos (24)

2023: Live coding visual y síntesis · Taller de captura de movimiento · Transcoding Ylama (Bellas Artes y Festival de la Imagen) · Coniunctum Corpora · IA para videojuegos: Deep Reinforcement Learning · Innovación con IA · IoT-LAT en coloquio doctoral.
2022: New Realities: XR from Art and Philosophy (Shibuya Fest) · From Transhumanism to Virtual Reality (CIC Pasto).
2020: Pervasive Games (congreso, Perú) · Bla Bla Talks · Taller de Unity · Semana de la Juventud (ponente, moderador, jurado de hackathon, tallerista).
2017–2019: Machine learning y EEG (Ciencia en el Bar, UPEC, UTN, IEEE Suroccidente).
Organizador: torneos de robótica UDENAR (2.º a 5.º) · torneos de League of Legends · Galeras Week / Galeras Weekend / Hallo Geek.

### 7.10 Certificaciones y cursos (16)

Scrum Master, Product Owner y Advanced Scrum (CertJoin, 2023–2024) · AR con Unity (Udemy) · Videojuegos con Unity (Udemy) · Desarrollo en Unity (Uniandes) · Introduction to VR (Coursera) · Using Python for Research (HarvardX) · AI in the Data Center (Nvidia) · Spark AR (Platzi) · Git y GitHub (Platzi) · Photoshop (Platzi) · Responsive Web Design (freeCodeCamp) · Scientific Thinking (Coursera) · Computational Thinking (Coursera) · Diplomado en Educación Virtual.

### 7.11 Otros

Emprendimientos: Realidades X · Galeras Geek and Gaming · Funbotic. Siete citas filosóficas. Idiomas. Pasiones: ajedrez, lectura, fútbol, cine, filosofía, bajo eléctrico, historia. Equipos que dominas: impresión 3D, captura de movimiento, corte láser, CNC, escáner 3D.

---

## 8. Interacción, 3D y animación

### 8.1 Interacciones

| Interacción | Comportamiento |
|---|---|
| **MAP ⇄ TERRITORY** (firma) | El esquemático se levanta y se vuelve placa; al volver, se aplana. Se guarda en la URL. |
| **Seguir la señal** | El scroll mueve el pulso por la pista; la cámara lo acompaña; cada capítulo se enciende al llegar. |
| Abrir chip | Hover: la tapa se levanta y asoma el diorama. Clic: el chip crece hasta ser la página del caso. |
| Volteo de placa | Una vez, al entrar al capítulo 05. |
| Rayos X | Mantener `X`. |
| Luz del cursor | Luz de fósforo suave que enciende las pistas cercanas. |
| Punto de prueba | Los dígitos ruedan hasta la cifra; hover muestra fuente y fecha. |
| Código de isla | Clic copia y confirma. |
| Filtros en `/work` | Los chips se reordenan en sitio. |
| Estudios | Un control por pieza; botón de reinicio; enlace al código. |
| Consola | `/`. Opcional. |
| Sonido | Ambiente generativo, **apagado por defecto**, con interruptor. Fase posterior. |

### 8.2 Inventario 3D

Placa-paisaje con horizonte · chips con dioramas de profundidad · pulso con estelas · seis objetos iridiscentes (pista derretida, lente, puerta, caballo, retrato en partículas, espejo de cobre) · volteo de placa · extrusión de mapa a territorio · chip destapado en cada caso · chispa en el 404.

### 8.3 Inventario de animación

Trazado inicial del esquemático · riel de cámara por scroll · tapas de chip · goteo de pintura · rodaje de dígitos · entrada de títulos por línea · seguimiento de la lente · entrenamiento de la red · glifos en vías · transición continua entre páginas · respiración lenta de luz en reposo.

---

## 9. Arquitectura técnica

- **Astro 5** estático con islas. **Three.js** por módulos, en diferido. **GSAP + ScrollTrigger** con scroll nativo. **View Transitions** con lienzo persistente. **Colecciones de contenido** con Zod y MDX. TypeScript estricto. CSS propio con variables.
- **La vista MAP se construye primero.** Es HTML y SVG; es la base de SEO, accesibilidad y la versión sin WebGL. El 3D se monta encima.
- **Un solo lienzo y un solo renderizador**; las escenas de capítulo se activan por scroll. Instancias para pads y vías. Solo el chip destacado reproduce video.
- **Iridiscencia** con shader de película delgada; resplandor con sprites aditivos; bloom a media resolución solo en nivel alto.
- **Estudios:** cada uno es un módulo independiente que se carga al acercarse y se pausa fuera de pantalla. *Perceptron* entrena una red de pocos cientos de parámetros, sin librerías.
- **Tres niveles** por GPU: Alto, Bajo (sin postproceso ni video, objetos simplificados), MAP (sin WebGL).
- El render se detiene con el lienzo fuera de pantalla o la pestaña oculta. DPR máximo 2 en escritorio, 1.5 en móvil.

```
src/
  content/   projects/ experience/ teaching/ publications/ talks/ awards/ courses/ resources/ quotes/  config.ts
  i18n/      en.json  es.json
  pages/     index  work/  teaching/  research/  studies/  talks/  about  cv  es/...
  components/
    map/       Esquemático en SVG
    board/     Escena: Board, Chip, Trace, TestPoint, Via, Horizon
    objects/   MeltedTrace, Lens, Door, Knight, PortraitParticles, Mirror
    studies/   PhosphorField, HallOfMirrors, SoftTime, Perceptron, Iceemd, Swarm
    ui/        ChapterIndex, ViewSwitch, Console, IslandCode, Metric, Timeline, BomTable
  styles/    tokens.css  base.css
  lib/       gpu-tier  scroll  i18n
```

Modelo de proyecto: `title, slug, chapter, ref, role, studio, year, status, platforms[], engines[], tags[], islandCode?, metrics[{label,value,source,asOf}], awards[{name,result,year,url}], cover, video?, links[], credits[], featured, order`. Añadir un proyecto o un recurso es añadir un archivo.

**Presupuesto**

| Métrica | Objetivo |
|---|---|
| LCP (móvil, 4G) | < 2.0 s, con poster AVIF de la placa |
| INP | < 200 ms |
| CLS | < 0.05 |
| JS inicial | < 60 KB gzip; Three.js en diferido |
| Hero sin video | < 600 KB |
| Clip del chip destacado | 6–8 s, 720p, sin audio, < 1.2 MB |
| Cuadros | 60 fps escritorio · 30+ móvil medio |
| Lighthouse | 95+ Performance · 100 en el resto |

SEO: JSON-LD `Person` y `CreativeWork`, `hreflang`, sitemap, imágenes Open Graph por proyecto. Accesibilidad: todo el contenido en HTML real, teclado completo, foco visible, contraste AA. Analítica sin cookies.

---

## 10. Datos verificados y pendientes

| Tema | Hallazgo | Qué hago |
|---|---|---|
| Raptor Heist, 2025 | Figura entre los diez nominados de "Vote in Fortnite" de The Game Awards (anunciado 21 nov 2025) | Se publica |
| Naturaleza de esa nominación | Es una votación de fans organizada por The Game Awards, no una categoría oficial | Se redacta "Nominee — The Game Awards: Vote in Fortnite 2025". Un director técnico lo va a comprobar; mejor exacto |
| Havoc Hotel 3, 2025 | **No encontré esa nominación.** El nominado de 2025 es Raptor Heist (que es de la franquicia Havoc Hotel). Havoc Hotel 2 fue nominado en 2024 | No se publica nominación de Havoc Hotel 3 salvo que tengas la fuente. Havoc Hotel 2 (2024) es anterior a tu ingreso (jun 2025): se menciona como logro de la franquicia, no tuyo |
| Rockstar Games | Dices que fue trabajo exploratorio | Fuera del sitio. Conviene quitarlo también del resumen del CV o redactarlo como exploración |
| Top 3 Fortnite | Sin fuente pública hallada | Queda preparado pero oculto hasta tener captura |
| Steal an Egg | La búsqueda no devolvió la isla; hay varias de nombre parecido | Se usan las cifras de tu captura de Fortnite.gg, con fecha |
| Orcs Must Die! By the Blade | Teravision desarrolla y publica; Quest 3/3S el 12 feb 2026 | Se publica |
| Dungeons & Dragons | Lanzado 20 ene 2026 con Chartis; isla del Zombie Dragon de Teravision; artículo técnico de Epic | Se publica; el artículo de Epic se enlaza como detalle técnico público |
| Clayface | Campaña de DC Studios con Chartis, octubre 2026 | Se publica según la publicación de Chartis |
| Best Use of Verse | Sin fuente pública hallada; existe tu publicación con el enlace de votación | Se publica con ese enlace |
| Años de premios | Resueltos con el sitio actual | Un dato menor abierto: beca de trabajo (2020 o 2022) |
| MSc | CV 2020–2024; sitio 2020–2023 | Uso 2020–2024 salvo que corrijas |
| LinkedIn | CV y sitio actual tienen URL distintas | Dime cuál vale |

---

## 11. Fases

| Fase | Entregable | Criterio de aceptación |
|---|---|---|
| **0. Contenido** | Datos en colecciones; activos reunidos | Sección 10 sin pendientes críticos |
| **0.5 Prototipo del hero** | Capítulo 00 real en Three.js: placa, horizonte, chip con video, pista derretida, paleta | Tú apruebas el arte antes de construir el resto |
| **1. Base y MAP** | Astro, tokens, fuentes, i18n, todo el contenido, vista MAP y todas las páginas en HTML | Sitio completo sin JavaScript; Lighthouse 100; EN y ES |
| **2. TERRITORY** | Escena completa, tres niveles, transición MAP ⇄ TERRITORY | 60 fps; LCP < 2 s; transición fluida |
| **3. Capítulos 01–03** | Simulacra, Recognition, Time; recorrido por scroll | Chips se abren; pista derretida; teclado completo |
| **4. Capítulos 04–07** | Seeing, The Virtual (volteo), BOM, Becoming, Mirror | Volteo con glifos; retrato en partículas; contacto funcional |
| **5. Casos de estudio** | Plantilla, chip destapado, fachadas de video, filtros | Siete casos de industria completos |
| **6. Estudios** | Seis piezas de creative coding y `/studies` | Cada una con ficha, control y código; se pausan fuera de pantalla |
| **7. Móvil y pulido** | Adaptación, rayos X, consola, accesibilidad, performance, SEO | Revisado en 390, 768, 1280, 1440 y 1920 px; presupuesto cumplido |
| **8. Revisión y salida** | Detector y revisión final de Impeccable, `DESIGN.md`, deploy, dominio | Veredicto "ship"; dominio apuntando al sitio nuevo |
| **9. Después** | Sonido generativo; más recursos pedagógicos; más casos | Publicar un recurso = añadir un archivo |

La fase 1 deja un sitio publicable aunque el 3D se retrase. Las fases 5 y 6 pueden ir en paralelo.

---

## 12. Lo que aún necesito de ti

1. Fuente de la nominación de Havoc Hotel 3, si existe.
2. Captura del Top 3 de Fortnite.
3. URL de LinkedIn vigente.
4. Key art en alta resolución y un clip de 6–8 s de Raptor Heist, o permiso para usar los públicos con crédito.
5. Autorretrato "Me transhumanism" en la mayor resolución que tengas, y quién lo ilustró para darle crédito.
6. Fotos o video de Coniunctum Corpora, Transcoding Ylama, Inti, Inspira, IoT-LAT (las del sitio actual son de baja resolución).
7. CV final en PDF, inglés y español.
8. Deploy: Vercel (recomendado) o Cloudflare Pages.

---

## 13. Riesgos

| Riesgo | Mitigación |
|---|---|
| Demasiadas ideas, sitio confuso | Anatomía repetida por capítulo, cuatro controles globales, vista MAP |
| El arte compite con los juegos | Capítulo 01 casi monocromo; el color llega después |
| Lo surrealista incomoda | Regla 6 de claridad; prototipo del hero para validarlo contigo |
| 3D pesado en móvil | Tres niveles; MAP primero; un solo lienzo |
| Afirmaciones que no resisten verificación | Sección 10: solo se publica lo que tiene fuente |
| Key art de terceros | Créditos visibles; permisos; plan B con capturas propias |
| Alcance grande | Fases publicables; estudios y sonido al final |

---

## 14. Siguiente paso

Fase 0.5: prototipo interactivo del hero, para que veas la placa, el horizonte, la pista derretida y la paleta en movimiento antes de construir lo demás.
