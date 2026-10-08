/** Reveal delay for the nth item of a grid, capped so long lists don't lag. */
export function stagger(index: number, step = 80, max = 480) {
  return Math.min(index * step, max);
}
