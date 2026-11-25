export type Lang = 'en' | 'es';
/** A bilingual string. */
export type L = { en: string; es: string };

export interface Metric {
  label: L;
  value: string;
  source: string;
  asOf: string;
}

export interface Award {
  name: L;
  year: string;
  url?: string;
}

export interface Link {
  label: L;
  url: string;
}

export type ProjectGroup = 'industry' | 'xr-art' | 'web';
export type ProjectStatus = 'live' | 'shipped' | 'liveops' | 'research' | 'archive';

export interface Project {
  slug: string;
  title: string;
  /** Board designator, e.g. U1. Only industry titles carry one. */
  ref?: string;
  group: ProjectGroup;
  role: L;
  studio: string;
  year: string;
  status: ProjectStatus;
  platforms: string[];
  stack: string[];
  summary: L;
  did?: L[];
  islandCode?: string;
  metrics?: Metric[];
  awards?: Award[];
  cover?: string;
  gallery?: string[];
  links?: Link[];
  /** YouTube videos; `vertical` for Shorts. */
  videos?: { id: string; title: string; vertical?: boolean }[];
  /** Cover is a portrait (vertical) frame. */
  portrait?: boolean;
  /** Released date as shown on the island page, when known. */
  released?: string;
  credits?: string[];
  featured?: boolean;
  order: number;
  /** Chapter tint used for the project's accent in the schematic. */
  tint?: string;
}

export const t = (v: L, lang: Lang) => v[lang];
