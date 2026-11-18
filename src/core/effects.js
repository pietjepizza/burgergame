import { art } from '../art/index.js';
import { $, pick } from './util.js';
import { mk } from '../game/world.js';

export function confetti(n = 24) {
  const cols = ['#ef476f', '#ffd23f', '#2ec27e', '#3a86ff', '#9b5de5', '#ff8c1a'];
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div'); d.className = 'confetti'; d.style.background = pick(cols);
    d.style.left = (Math.random() * innerWidth) + 'px'; d.style.top = (Math.random() * 140 - 20) + 'px';
    d.style.animationDelay = (Math.random() * .3) + 's'; if (Math.random() < .4) d.style.borderRadius = '50%';
    document.body.appendChild(d); setTimeout(() => d.remove(), 2000);
  }
}
export function floatAt(el, text) {
  const r = el.getBoundingClientRect();
  const d = document.createElement('div'); d.className = 'float'; d.textContent = text;
  d.style.left = (r.left + r.width / 2 - 36) + 'px'; d.style.top = r.top + 'px';
  document.body.appendChild(d); setTimeout(() => d.remove(), 1200);
}
export function flyToWallet(fromEl, count = 6) {
  const a = fromEl.getBoundingClientRect(), b = $('wallet').getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div'); d.className = 'fly';
    d.style.left = (a.left + Math.random() * a.width) + 'px'; d.style.top = (a.top + Math.random() * a.height) + 'px';
    document.body.appendChild(d);
    setTimeout(() => { d.style.left = (b.left + 14) + 'px'; d.style.top = (b.top + 10) + 'px'; d.style.transform = 'scale(.6)'; }, 30 + i * 60);
    setTimeout(() => d.remove(), 950 + i * 60);
  }
  setTimeout(() => { const w = $('wallet'); w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop'); }, 800);
}
export function spark(x, y) {
  const d = mk('spark', art('star'), x - 15, y - 15, 9999); d.className = 'spark';
  setTimeout(() => d.remove(), 600);
}
