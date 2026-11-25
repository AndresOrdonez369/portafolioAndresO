import { existsSync } from 'node:fs';

/** Tile-size variant of a project image when one was generated (public/img/projects/sm/). */
export function sm(src: string) {
  const small = src.replace('/img/projects/', '/img/projects/sm/');
  return small !== src && existsSync('public' + small) ? small : src;
}
