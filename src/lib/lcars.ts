// Client-side LCARS behaviors, rewritten from the template's script without the
// sound effects or onclick redirects.

/** TNG-style stardate: 41000 at the start of 1987, +1000 per year, plus a tenth-of-day unit. */
export function stardate(now = new Date()): string {
  const year = now.getFullYear();
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year + 1, 0, 1).getTime();
  const whole = Math.floor((year - 1987 + 41) * 1000 + ((now.getTime() - start) / (end - start)) * 1000);
  const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  return `${whole}.${Math.floor(seconds / 8640)}`;
}

export function startStardate(el: HTMLElement | null): void {
  if (!el) return;
  const tick = () => (el.textContent = stardate());
  tick();
  setInterval(tick, 1000);
}

export function wireTopButton(button: HTMLElement | null): void {
  if (!button) return;
  const sync = () => (button.style.display = window.scrollY > 200 ? "block" : "none");
  window.addEventListener("scroll", sync, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0 }));
  sync();
}
