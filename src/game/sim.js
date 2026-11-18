import { ACCS, SHIRTS } from '../art/animals.js';
import { art, ic } from '../art/index.js';
import { confetti, floatAt, flyToWallet, spark } from '../core/effects.js';
import { sfx } from '../core/sound.js';
import { S, save } from '../core/state.js';
import { fmt, pick } from '../core/util.js';
import { FOODS, LEVEL_COST, LEVEL_SLOTS, STATIONS, ST_KEYS } from '../data/config.js';
import { L } from '../data/layout.js';
import { G, KIND_KEYS, buildDecor, buildStations, buildZones, makeChar, menu, owned, placeCharEl, renderBubble, renderMenu, renderPass, renderTable, setLook, stationEls, syncCashiers, syncCooks, syncTables, syncWaiters, updateTop } from './world.js';

export const freeTable = () => G.tables.find(t => !t.cust && !t.coins && t.i < LEVEL_SLOTS[S.level]);
export const spawnEvery = () => Math.max(1.6, 8 / (1 + .3 * S.ads + Object.keys(S.decor).length * .05) * (1.4 - S.stars * .1));
export const walkSpeed = () => 150;
export const waiterSpeed = () => 170 * (1 + .35 * S.skates);
export let spawnT = 1;

export function moveTo(ch, x, y) { ch.tx = x; ch.ty = y; ch.el.classList.add('walk'); }
export function stepMove(ch, dt, speed) {
  if (ch.tx == null) return true;
  const dx = ch.tx - ch.x, dy = ch.ty - ch.y, d = Math.hypot(dx, dy), s = speed * dt;
  if (d <= s) { ch.x = ch.tx; ch.y = ch.ty; ch.tx = null; ch.el.classList.remove('walk'); placeCharEl(ch); return true; }
  ch.x += dx / d * s; ch.y += dy / d * s; placeCharEl(ch); return false;
}

export function spawnCustomer() {
  const t = freeTable(); if (!t) return;
  const m = menu(), maxN = Math.min(3, 1 + Math.floor(Object.keys(S.st).length / 2));
  const n = 1 + Math.floor(Math.random() * maxN);
  const order = []; for (let i = 0; i < n; i++) order.push(pick(m));
  let kind = pick(KIND_KEYS), acc = pick(ACCS); if (acc === 'cap' && ['rabbit', 'frog', 'lion'].includes(kind)) acc = 'none';
  const look = { kind, shirt: pick(SHIRTS), cap: pick(SHIRTS), acc, blink: (Math.random() * 4).toFixed(2), feet: true, mood: 'happy' };
  const c = makeChar(look, ...L.DOOR);
  Object.assign(c, { order, got: [], table: t, state: 'enter', pat: 0, max: 40 + n * 12 });
  t.cust = c; G.customers.push(c);
  // looproute: van de deur langs de muur, dan naar de tafel (zo lopen ze niet door afgesloten stukken)
  moveTo(c, ...L.HALL);
  c.path = [[t.x, t.y + 10]];
  sfx.hello();
}

export function removeCustomer(c) {
  c.el.remove(); G.customers = G.customers.filter(x => x !== c);
}

export function update(dt) {
  // klanten komen binnen
  spawnT -= dt;
  if (spawnT <= 0) { spawnCustomer(); spawnT = spawnEvery() * (.7 + Math.random() * .6); }

  for (const c of G.customers.slice()) {
    if (c.state === 'enter') {
      if (stepMove(c, dt, walkSpeed())) {
        if (c.path.length) { const [x, y] = c.path.shift(); moveTo(c, x, y); }
        else {
          c.state = 'wait'; c.look.feet = false; c.look.mood = ''; setLook(c, 'ok');
          c.pat = c.max; c.order.forEach(item => G.tickets.push({ item, cust: c }));
          renderBubble(c); sfx.plop();
        }
      }
    } else if (c.state === 'wait') {
      c.pat -= dt;
      const p = c.pat / c.max, bar = c.el.querySelector('.pat div');
      if (bar) { bar.style.width = Math.max(0, p * 100) + '%'; bar.style.background = p > .5 ? '#2ec27e' : p > .25 ? '#ffc21a' : '#e63946'; }
      if (p < .25) setLook(c, 'angry'); else if (p < .5) setLook(c, 'worried');
      if (c.got.length === c.order.length) {
        c.state = 'eat'; c.eat = 4; setLook(c, 'happy'); renderBubble(c);
      } else if (c.pat <= 0) {
        sfx.angry(); S.stars = Math.max(1, S.stars - .25);
        G.tickets = G.tickets.filter(tk => tk.cust !== c); G.ready = G.ready.filter(d => d.cust !== c || d.taken); renderPass();
        leave(c, false);
      }
    } else if (c.state === 'eat') {
      c.eat -= dt;
      c.table.dishEl.querySelectorAll('.ic').forEach(e => e.style.transform = `scale(${Math.max(.2, c.eat / 4)})`);
      if (c.eat <= 0) {
        const total = c.order.reduce((s, k) => s + FOODS[k].price, 0);
        const frac = c.pat / c.max, tip = frac > .6 ? 100 : frac > .3 ? 50 : 0;
        c.table.coins = total + tip; c.table.bill = { items: c.order.slice(), tip }; c.table.dishes = []; renderTable(c.table);
        S.served++; S.stars = Math.min(5, S.stars + .06); updateTop(); sfx.ding();
        leave(c, true);
      }
    } else if (c.state === 'leave') {
      if (c.delay > 0) {
        c.delay -= dt;
        if (c.delay <= 0) {
          const t = c.table; t.cust = null; if (!c.happy) { t.dishes = []; renderTable(t); }
          c.look.feet = true; c.look.mood = ''; setLook(c, c.happy ? 'love' : 'angry');
          moveTo(c, ...L.HALL); c.path = [L.DOOR];
        }
        continue;
      }
      if (stepMove(c, dt, walkSpeed())) {
        if (c.path.length) { const [x, y] = c.path.shift(); moveTo(c, x, y); } else removeCustomer(c);
      }
    }
  }

  // koks
  for (const k of G.cooks) {
    if (!k.job) {
      const i = G.tickets.findIndex(tk => FOODS[tk.item].st === k.st);
      if (i >= 0) {
        const tk = G.tickets.splice(i, 1)[0];
        const dur = FOODS[tk.item].time * Math.pow(.75, S.st[k.st].speed);
        k.job = { ...tk, t: dur, dur }; k.el.classList.add('walk');
      }
    } else {
      k.job.t -= dt;
      if (k.job.t <= 0) {
        if (k.job.cust.state === 'wait') { G.ready.push({ item: k.job.item, cust: k.job.cust }); renderPass(); sfx.plop(); }
        k.job = null; k.el.classList.remove('walk');
      }
    }
  }
  // stations tonen voortgang
  for (const st of ST_KEYS) {
    if (!owned(st)) continue;
    const busy = G.cooks.filter(c => c.st === st && c.job);
    const el = stationEls[st];
    el.classList.toggle('on', busy.length > 0);
    if (busy.length) {
      const j = busy[0].job;
      el.querySelector('.prog').setAttribute('stroke-dashoffset', 239 * (j.t / j.dur));
      const f = el.querySelector('.ring .food');
      if (f.dataset.k !== j.item) { f.dataset.k = j.item; f.innerHTML = art(j.item); }
    }
  }

  // obers
  for (const w of G.waiters) {
    const arrived = stepMove(w, dt, waiterSpeed());
    if (!arrived) continue;
    if (w.state === 'idle') {
      const d = G.ready.find(r => !r.taken && r.cust.state === 'wait');
      if (d) {
        const batch = G.ready.filter(r => !r.taken && r.cust === d.cust).slice(0, 3);
        batch.forEach(r => r.taken = true); w.batch = batch; w.cust = d.cust;
        w.state = 'toPass'; moveTo(w, ...L.pickup(G.ready.indexOf(d)));
      } else if (w.x !== w.home[0] || w.y !== w.home[1]) moveTo(w, w.home[0], w.home[1]);
    } else if (w.state === 'toPass') {
      G.ready = G.ready.filter(r => !w.batch.includes(r)); renderPass();
      w.carry = w.batch.map(r => r.item);
      w.carryEl.innerHTML = '<div class="plate2"></div>' + w.carry.map(k => `<div class="ic">${art(k)}</div>`).join('');
      if (w.cust.state !== 'wait') { w.carry = []; w.carryEl.innerHTML = ''; w.state = 'idle'; continue; }
      const t = w.cust.table; w.state = 'toTable'; moveTo(w, t.x + 72, t.y + 44);
    } else if (w.state === 'toTable') {
      const c = w.cust;
      if (c.state === 'wait') {
        c.got.push(...w.carry); c.table.dishes.push(...w.carry); renderTable(c.table); renderBubble(c); sfx.plop();
      }
      w.carry = []; w.carryEl.innerHTML = ''; w.state = 'idle'; w.cust = null;
    }
  }

  // kassamedewerkers halen geld op
  for (const c of G.cashiers) {
    c.t += dt;
    if (c.t > 3.5) {
      const t = G.tables.find(t => t.coins);
      if (t) { c.t = 0; collect(t, true); }
    }
  }
}

export function leave(c, happy) {
  c.state = 'leave'; c.happy = happy; c.delay = .8; c.tx = null; c.path = []; renderBubble(c);
  setLook(c, happy ? 'love' : 'angry');
  const r = document.createElement('div'); r.className = 'react'; r.innerHTML = art(happy ? 'heart' : 'angry'); c.el.appendChild(r);
}

export function collect(t, auto) {
  if (!t.coins) return;
  const v = t.coins; t.coins = 0;
  S.money += v; save();
  const tip = (t.bill && t.bill.tip) || 0;
  if (t.coinEl) {
    flyToWallet(t.coinEl, 6);
    floatAt(t.coinEl, '+' + fmt(v - tip));
    if (tip) { const r = t.coinEl.getBoundingClientRect(), spot = { getBoundingClientRect: () => r }; setTimeout(() => floatAt(spot, '♥ +' + fmt(tip)), 350); }
  }
  t.bill = null;
  sfx.kaching();
  renderTable(t); updateTop();
}

export function stationTap(k, el) {
  if (!owned(k)) {
    const c = STATIONS[k].cost;
    if (S.money < c) { sfx.wrong(); return; }
    S.money -= c; S.st[k] = { cooks: 1, speed: 0 }; afterBuy();
    return;
  }
  const busy = G.cooks.filter(c => c.st === k && c.job);
  if (!busy.length) return;
  busy.forEach(c => c.job.t -= c.job.dur * .18);
  const [sx, sy] = L.stations[k];
  sfx.tap(); spark(sx + 30 + Math.random() * 50, sy + 20 + Math.random() * 40);
}
export function buyLevel(l) {
  const c = LEVEL_COST[l];
  if (S.money < c) { sfx.wrong(); return; }
  S.money -= c; S.level = l; afterBuy();
}
export function afterBuy() {
  sfx.buy(); confetti(30); save();
  buildStations(); syncCooks(); syncWaiters(); syncCashiers(); syncTables(); buildZones(); buildDecor(); renderMenu(); updateTop();
}
