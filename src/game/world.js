import { KINDS, animalSVG, tijnLook } from '../art/animals.js';
import { art, ic } from '../art/index.js';
import { svg } from '../art/svg.js';
import { S } from '../core/state.js';
import { $, fmt, pick } from '../core/util.js';
import { DECOR, FOODS, LEVEL_COST, SLOTS, STATIONS, ST_KEYS, ZONES } from '../data/config.js';
import { cheapest } from './shop.js';
import { buyLevel, collect, stationTap } from './sim.js';

export const owned = st => !!S.st[st];
export const menu = () => Object.keys(FOODS).filter(k => owned(FOODS[k].st));
export const W = $('world');
export const mk = (cls, html = '', x = 0, y = 0, z = 1) => {
  const d = document.createElement('div'); d.className = 'abs ' + cls; d.innerHTML = html;
  d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.zIndex = z; W.appendChild(d); return d;
};
export const ptag = c => `<span class="ptag ${S.money < c ? 'cant' : ''}">${ic('coin')}${fmt(c)}</span>`;

//  WERELD OPBOUWEN
// =====================================================================
export const G = { tables: [], cooks: [], waiters: [], cashiers: [], customers: [], tickets: [], ready: [], paused: false, last: 0 };
export let stationEls = {}, zoneEls = [], passEl;

// Schaal de wereld (1000x600) zo groot mogelijk: zo breed als past, maar ook binnen de schermhoogte.
export function fit() {
  const st = $('stage'), app = $('app');
  st.style.width = '';
  const free = innerHeight - $('top').offsetHeight - $('menu').offsetHeight - 50;
  const s = Math.max(.2, Math.min(st.clientWidth / 1000, free / 600));
  st.style.width = (1000 * s + 10) + 'px';
  W.style.transform = `scale(${s})`; st.style.height = (600 * s) + 'px';
}

export function buildStatic() {
  W.innerHTML = '';
  mk('kwall', '', 0, 0, 0); mk('kfloor', '', 0, 175, 0); mk('dwall', '', 380, 0, 0); mk('dfloor', '', 380, 175, 0); mk('awning', '', 380, 0, 2);
  mk('hood', '', 10, 0, 2).style.width = '360px';
  mk('win', art('window'), 470, 34, 1); mk('win', art('window'), 696, 34, 1);
  mk('door', art('door'), 900, 40, 1).style.zIndex = 1;
  mk('divider', '', 374, 0, 3);
  passEl = mk('pass', '', 380, 190, 150);
  const reg = mk('register', art('register'), 905, 300, 360); reg.title = '';
}

export function placeCharEl(ch) {
  ch.el.style.transform = `translate(${ch.x - 37}px, ${ch.y - 138}px)`;
  ch.el.style.zIndex = Math.round(ch.y) + (ch.boss ? 5 : 0);
}
export function makeChar(look, x, y) {
  const el = mk('char', `<div class="body">${animalSVG(look, look.mood || 'ok')}</div>`, 0, 0);
  const ch = { look, x, y, el, path: [] };
  placeCharEl(ch);
  return ch;
}
export function setLook(ch, mood) {
  if (ch.look.mood === mood) return;
  ch.look.mood = mood; ch.el.querySelector('.body').innerHTML = animalSVG(ch.look, mood);
}
export const KIND_KEYS = Object.keys(KINDS);
export const staffLook = role => {
  let kind = pick(KIND_KEYS.filter(k => role !== 'cook' || !['rabbit', 'frog', 'lion'].includes(k)));
  const shirt = role === 'cook' ? '#ffffff' : role === 'waiter' ? '#2b2d42' : '#2ec27e';
  return { kind, shirt, role, acc: role === 'cashier' ? 'cap' : 'none', cap: '#ef476f', blink: (Math.random() * 4).toFixed(2), feet: role === 'waiter', mood: 'happy' };
};

export function buildStations() {
  for (const k of ST_KEYS) {
    const p = STATIONS[k];
    if (stationEls[k]) stationEls[k].remove();
    const el = mk('station' + (owned(k) ? '' : ' locked'), art(k), p.x, p.y, p.y + 110);
    el.innerHTML += `<div class="ring"><svg class="art" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#4a2c17" stroke-width="5"/><circle class="prog" cx="50" cy="50" r="38" fill="none" stroke="#2ec27e" stroke-width="12" stroke-dasharray="239" stroke-dashoffset="239" transform="rotate(-90 50 50)"/></svg><div class="food"></div></div>`;
    if (!owned(k)) {
      el.innerHTML += `<div class="lockbadge">${ic('lock')}${ptag(STATIONS[k].cost)}</div>`;
      el.querySelector('svg.art').style.opacity = .5;
    }
    el.onclick = () => stationTap(k, el);
    stationEls[k] = el;
  }
}

export function syncCooks() {
  for (const k of ST_KEYS) {
    const want = owned(k) ? S.st[k].cooks : 0;
    let mine = G.cooks.filter(c => c.st === k);
    while (mine.length < want) {
      // de eerste kok bij de grill is altijd Tijn zelf
      const look = k === 'grill' && mine.length === 0 ? tijnLook() : staffLook('cook');
      const c = makeChar(look, 0, 0); c.st = k; c.job = null; G.cooks.push(c); mine.push(c);
      if (look.kind === 'tijn') { c.boss = true; c.el.classList.add('boss'); }
    }
    mine.forEach((c, i) => {
      const p = STATIONS[k], n = mine.length;
      c.x = p.x + 55 + (n === 1 ? 0 : (i - (n - 1) / 2) * 36); c.y = p.y + 48;
      placeCharEl(c);
    });
  }
}
export function syncWaiters() {
  while (G.waiters.length < S.waiters) {
    const i = G.waiters.length, home = [458, 236 + i * 64];
    const w = makeChar(staffLook('waiter'), home[0], home[1]);
    w.home = home; w.state = 'idle'; w.carry = []; G.waiters.push(w);
    w.carryEl = document.createElement('div'); w.carryEl.className = 'carry'; w.el.appendChild(w.carryEl);
  }
}
export function syncCashiers() {
  while (G.cashiers.length < S.cashiers) {
    const c = makeChar(staffLook('cashier'), 950 - G.cashiers.length * 40, 330); c.t = 0; G.cashiers.push(c);
  }
}
export function syncTables() {
  while (G.tables.length < S.tables) {
    const i = G.tables.length, [x, y] = SLOTS[i];
    const t = { i, x, y, cust: null, coins: 0, dishes: [] };
    t.chair = mk('chair', art('chair'), x - 36, y - 88, y - 60);
    t.el = mk('table', art('table'), x - 61, y - 36, y + 46);
    t.dishEl = document.createElement('div'); t.dishEl.className = 'onTable'; t.el.appendChild(t.dishEl);
    G.tables.push(t);
  }
}
export function buildZones() {
  zoneEls.forEach(z => z.remove()); zoneEls = [];
  for (let l = S.level + 1; l < ZONES.length; l++) {
    const z = ZONES[l];
    const el = mk('zone', `${ic('lock')}${ptag(LEVEL_COST[l])}`, z.x, z.y, 2000);
    el.style.width = z.w + 'px'; el.style.height = z.h + 'px';
    if (l > S.level + 1) { el.style.opacity = .85; el.innerHTML = ic('lock'); }
    el.onclick = () => { if (l === S.level + 1) buyLevel(l, el); };
    zoneEls.push(el);
  }
}
export let decorEls = [];
export function buildDecor() {
  decorEls.forEach(d => d.remove()); decorEls = [];
  for (const k in S.decor) { const d = DECOR[k]; decorEls.push(mk('decor' + (k === 'neon' ? ' neon' : ''), art(k), d.x, d.y, 5)); }
}
export function renderMenu() {
  $('menu').innerHTML = menu().map(k => `<div class="mi">${ic(k)}<span class="tag">${fmt(FOODS[k].price)}</span></div>`).join('');
  fit();
}
export function renderPass() {
  passEl.innerHTML = '';
  G.ready.filter(d => !d.taken).slice(0, 9).forEach((d, i) => {
    const e = document.createElement('div'); e.className = 'abs passitem'; e.innerHTML = art(d.item);
    e.style.left = '4px'; e.style.top = (6 + i * 42) + 'px'; passEl.appendChild(e);
  });
}
export function renderBubble(c) {
  let b = c.el.querySelector('.bubble');
  if (c.state !== 'wait') { if (b) b.remove(); return; }
  if (!b) { b = document.createElement('div'); b.className = 'bubble'; c.el.appendChild(b); b.style.top = '10px'; b.style.bottom = 'auto'; b.style.transform = 'translate(-50%,-100%)'; }
  const got = c.got.slice();
  b.innerHTML = c.order.map(k => { const i = got.indexOf(k), g = i >= 0; if (g) got.splice(i, 1); return `<div class="ic ${g ? 'got' : ''}">${art(k)}</div>`; }).join('') + '<div class="pat"><div></div></div>';
}
export function renderTable(t) {
  t.dishEl.innerHTML = t.dishes.map(k => `<div class="ic">${art(k)}</div>`).join('');
  if (t.coinEl) { t.coinEl.remove(); t.coinEl = null; }
  if (t.coins) {
    // bonnetje: elk gerecht met zijn menuprijs, het totaal, en de fooi apart
    const b = t.bill || { items: [], tip: 0 };
    const total = b.items.reduce((sum, k) => sum + FOODS[k].price, 0);
    const rows = b.items.map(k => `<div class="row">${ic(k)}<span>${fmt(FOODS[k].price)}</span></div>`).join('');
    const bon = `<div class="bon">${rows}<div class="row tot"><span>=</span><span>${fmt(total)}</span></div>${
      b.tip ? `<div class="row tip">${ic('heart')}<span>+${fmt(b.tip)}</span></div>` : ''}</div>`;
    t.coinEl = mk('coins', `<div class="coinsIn">${bon}<div class="pile">${art('pile')}</div></div>`, t.x - 58, t.y - 12, 3000);
    t.coinEl.onclick = e => { e.stopPropagation(); collect(t); };
  }
}
export function updateTop() {
  $('money').textContent = fmt(S.money); $('stars').textContent = S.stars.toFixed(1);
  $('shopBtn').classList.toggle('can', cheapest() <= S.money);
  zoneEls.forEach(z => z.querySelectorAll('.ptag').forEach(p => p.classList.toggle('cant', S.money < LEVEL_COST[S.level + 1])));
  for (const k of ST_KEYS) if (!owned(k)) { const p = stationEls[k].querySelector('.ptag'); if (p) p.classList.toggle('cant', S.money < STATIONS[k].cost); }
}
