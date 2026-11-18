import { KINDS, animalSVG, tijnLook } from '../art/animals.js';
import { art, ic } from '../art/index.js';
import { svg } from '../art/svg.js';
import { S } from '../core/state.js';
import { $, fmt, pick } from '../core/util.js';
import { FOODS, LEVEL_COST, STATIONS, ST_KEYS } from '../data/config.js';
import { L, chooseLayout } from '../data/layout.js';
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

// Maak het speelveld zo groot als het scherm toelaat. Kies daarbij de indeling
// (liggend of staand) waarmee het speelveld het grootst wordt.
let built = false;
// Het speelveld mag een klein beetje uitrekken (max 12%) zodat het het scherm
// helemaal vult, ook als het scherm een iets andere vorm heeft.
const MAX_STRETCH = 1.12;
export function fit() {
  const st = $('stage'), app = $('app'), cs = getComputedStyle(app), top = $('top');
  const border = parseFloat(getComputedStyle(st).borderLeftWidth) * 2 || 0;
  const viewH = (window.visualViewport && visualViewport.height) || innerHeight;
  const availW = app.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - border;
  const menuEl = $('menu');
  const availH = viewH - top.offsetHeight - parseFloat(getComputedStyle(top).marginBottom)
    - menuEl.offsetHeight - parseFloat(getComputedStyle(menuEl).marginTop)
    - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - border;
  if (chooseLayout(availW, availH) && built) rebuildWorld();
  let sx = availW / L.W, sy = availH / L.H;
  if (sx > sy) sx = Math.min(sx, sy * MAX_STRETCH); else sy = Math.min(sy, sx * MAX_STRETCH);
  sx = Math.max(.2, sx); sy = Math.max(.2, sy);
  W.style.width = L.W + 'px'; W.style.height = L.H + 'px';
  W.style.transform = `scale(${sx}, ${sy})`;
  st.style.width = (L.W * sx + border) + 'px'; st.style.height = (L.H * sy + border) + 'px';
  document.body.dataset.layout = L.name;
}

// Bouw het hele restaurant (opnieuw) op, bijvoorbeeld na het draaien van het scherm.
// Geld dat nog op tafel ligt, gaat eerst naar de portemonnee.
export function buildWorld() {
  buildStatic(); buildStations(); syncCooks(); syncWaiters(); syncCashiers(); syncTables(); buildZones(); buildDecor(); renderMenu(); updateTop();
  built = true;
}
export function rebuildWorld() {
  for (const t of G.tables) S.money += t.coins || 0;
  Object.assign(G, { tables: [], cooks: [], waiters: [], cashiers: [], customers: [], tickets: [], ready: [] });
  stationEls = {}; zoneEls = []; decorEls = [];
  buildWorld();
}
const rect = (cls, r, z = 0) => { const d = mk(cls, '', r[0], r[1], z); d.style.width = r[2] + 'px'; d.style.height = r[3] + 'px'; return d; };

export function buildStatic() {
  W.innerHTML = '';
  const R = L.rects;
  rect('kwall', R.kwall); rect('kfloor', R.kfloor); rect('dwall', R.dwall); rect('dfloor', R.dfloor);
  rect('awning', R.awning, 2); rect('hood', R.hood, 2);
  for (const [x, y] of L.windows) mk('win', art('window'), x, y, 1);
  mk('door', art('door'), L.door[0], L.door[1], 1);
  rect('divider' + (L.dividerDir === 'h' ? ' h' : ''), R.divider, 3);
  passEl = rect('pass', R.pass, 150);
  mk('register', art('register'), L.register[0], L.register[1], L.register[1] + 60);
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
    const [px, py] = L.stations[k];
    if (stationEls[k]) stationEls[k].remove();
    const el = mk('station' + (owned(k) ? '' : ' locked'), art(k), px, py, py + 110);
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
      const [px, py] = L.stations[k], n = mine.length;
      c.x = px + 55 + (n === 1 ? 0 : (i - (n - 1) / 2) * 36); c.y = py + 48;
      placeCharEl(c);
    });
  }
}
export function syncWaiters() {
  while (G.waiters.length < S.waiters) {
    const i = G.waiters.length, home = L.waiterHome(i);
    const w = makeChar(staffLook('waiter'), home[0], home[1]);
    w.home = home; w.state = 'idle'; w.carry = []; G.waiters.push(w);
    w.carryEl = document.createElement('div'); w.carryEl.className = 'carry'; w.el.appendChild(w.carryEl);
  }
}
export function syncCashiers() {
  while (G.cashiers.length < S.cashiers) {
    const [x, y] = L.cashier(G.cashiers.length);
    const c = makeChar(staffLook('cashier'), x, y); c.t = 0; G.cashiers.push(c);
  }
}
export function syncTables() {
  while (G.tables.length < S.tables) {
    const i = G.tables.length, [x, y] = L.slots[i];
    const t = { i, x, y, cust: null, coins: 0, dishes: [] };
    t.chair = mk('chair', art('chair'), x - 36, y - 88, y - 60);
    t.el = mk('table', art('table'), x - 61, y - 36, y + 46);
    t.dishEl = document.createElement('div'); t.dishEl.className = 'onTable'; t.el.appendChild(t.dishEl);
    G.tables.push(t);
  }
}
export function buildZones() {
  zoneEls.forEach(z => z.remove()); zoneEls = [];
  for (let l = S.level + 1; l < L.zones.length; l++) {
    const z = L.zones[l];
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
  for (const k in S.decor) { const [x, y] = L.decor[k]; decorEls.push(mk('decor' + (k === 'neon' ? ' neon' : ''), art(k), x, y, 5)); }
}
export function renderMenu() {
  $('menu').innerHTML = menu().map(k => `<div class="mi">${ic(k)}<span class="tag">${fmt(FOODS[k].price)}</span></div>`).join('');
  fit();
}
export function renderPass() {
  passEl.innerHTML = '';
  G.ready.filter(d => !d.taken).slice(0, 9).forEach((d, i) => {
    const e = document.createElement('div'); e.className = 'abs passitem'; e.innerHTML = art(d.item);
    const [x, y] = L.passItem(i); e.style.left = x + 'px'; e.style.top = y + 'px'; passEl.appendChild(e);
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
