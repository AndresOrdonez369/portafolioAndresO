import type { Project } from './types';

// Every file in ./projects/ exports an array of projects. Adding a project = adding to or creating a file there.
const modules = import.meta.glob<{ default: Project[] }>('./projects/*.ts', { eager: true });

export const projects: Project[] = Object.values(modules)
  .flatMap((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const industry = projects.filter((p) => p.group === 'industry');
export const xrArt = projects.filter((p) => p.group === 'xr-art');
export const web = projects.filter((p) => p.group === 'web');
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
