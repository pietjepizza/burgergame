import { animalSVG } from '../art/animals.js';
import { art, ic } from '../art/index.js';
import { sfx } from '../core/sound.js';
import { S, resetGame, save } from '../core/state.js';
import { $, fmt } from '../core/util.js';
import { ADS_COSTS, CASHIER_COSTS, COOK_COST, DECOR, FOODS, LEVEL_COST, LEVEL_SLOTS, SKATE_COSTS, SPEED_COSTS, STATIONS, ST_KEYS, TABLE_COST, WAITER_COSTS } from '../data/config.js';
import { afterBuy } from './sim.js';
import { G, owned } from './world.js';

export function shopItems() {
  const L = { people: [], kitchen: [], room: [] };
  // mensen
  for (const k of ST_KEYS) if (owned(k)) {
    const n = S.st[k].cooks, max = n >= 2;
    L.people.push({ pic: `<div class="ic half">${art('chef')}</div><div class="ic mini">${art(k)}</div>`, eff: dots(n, 2), cost: max ? 0 : COOK_COST(k, n), done: max, buy: () => S.st[k].cooks++ });
  }
  L.people.push({ pic: `<div class="ic half">${art('waiterIc')}</div>`, eff: dots(S.waiters, WAITER_COSTS.length), cost: WAITER_COSTS[S.waiters] || 0, done: S.waiters >= WAITER_COSTS.length, buy: () => S.waiters++ });
  L.people.push({ pic: `<div class="ic half">${art('cashierIc')}</div><div class="ic mini">${art('pile')}</div>`, eff: dots(S.cashiers, CASHIER_COSTS.length), cost: CASHIER_COSTS[S.cashiers] || 0, done: S.cashiers >= CASHIER_COSTS.length, buy: () => S.cashiers++ });
  L.people.push({ pic: ic('skates'), eff: dots(S.skates, SKATE_COSTS.length), cost: SKATE_COSTS[S.skates] || 0, done: S.skates >= SKATE_COSTS.length, buy: () => S.skates++ });
  // keuken
  for (const k of ST_KEYS) {
    const foods = Object.keys(FOODS).filter(f => FOODS[f].st === k).map(f => ic(f)).join('');
    if (!owned(k)) L.kitchen.push({ pic: ic(k), eff: foods, cost: STATIONS[k].cost, done: false, buy: () => S.st[k] = { cooks: 1, speed: 0 } });
    else {
      const sp = S.st[k].speed, max = sp >= SPEED_COSTS.length;
      L.kitchen.push({ pic: `${ic(k)}<div class="ic mini">${art('bolt')}</div>`, eff: dots(sp, SPEED_COSTS.length), cost: max ? 0 : SPEED_COSTS[sp] * (1 + ST_KEYS.indexOf(k) * .5), done: max, buy: () => S.st[k].speed++ });
    }
  }
  // restaurant
  const maxT = LEVEL_SLOTS[S.level];
  L.room.push({ pic: ic('table'), eff: dots(S.tables, maxT), cost: S.tables < maxT ? TABLE_COST(S.tables) : 0, done: S.tables >= maxT, buy: () => S.tables++ });
  if (S.level < 2) L.room.push({ pic: `${ic('house')}<div class="ic mini">${art('up')}</div>`, eff: dots(S.level + 1, 3), cost: LEVEL_COST[S.level + 1], done: false, buy: () => S.level++ });
  L.room.push({ pic: ic('megaphone'), eff: dots(S.ads, ADS_COSTS.length), cost: ADS_COSTS[S.ads] || 0, done: S.ads >= ADS_COSTS.length, buy: () => S.ads++ });
  for (const k in DECOR) L.room.push({ pic: ic(k), eff: '', cost: DECOR[k].cost, done: !!S.decor[k], buy: () => S.decor[k] = 1 });
  return L;
}
export const dots = (n, max) => `<span class="dots">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
export function cheapest() {
  const L = shopItems(); let m = Infinity;
  for (const t in L) for (const it of L[t]) if (!it.done && it.cost < m) m = it.cost;
  return m;
}

export let shopTab = 'people';
export const overlay = html => { $('overlay').innerHTML = `<div class="overlay"><div class="modal">${html}</div></div>`; };
export const closeOverlay = () => { $('overlay').innerHTML = ''; };
export function openShop() { G.paused = true; renderShop(); }
export function renderShop() {
  overlay(`
    <button class="rbtn xbtn" id="closeShop">${art('close')}</button>
    <div class="head"><div class="ic">${art('coin')}</div><span style="font-size:38px;color:var(--green-d)">${fmt(S.money)}</span></div>
    <div class="stabs">
      <button data-t="people" class="${shopTab === 'people' ? 'on' : ''}">${art('people')}</button>
      <button data-t="kitchen" class="${shopTab === 'kitchen' ? 'on' : ''}">${art('grill')}</button>
      <button data-t="room" class="${shopTab === 'room' ? 'on' : ''}">${art('table')}</button>
    </div>
    <div class="grid" id="shopGrid"></div>`);
  const g = $('shopGrid');
  for (const it of shopItems()[shopTab]) {
    const b = document.createElement('button');
    b.className = 'card' + (it.done ? ' owned' : S.money < it.cost ? ' cant' : '');
    b.innerHTML = `<div class="pic">${it.pic}</div><div class="eff">${it.eff}</div>${it.done ? `<div class="okmark">${art('checkG')}</div>` : `<span class="price">${ic('coin')}${fmt(it.cost)}</span>`}`;
    b.onclick = () => {
      if (it.done) return;
      if (S.money < it.cost) { sfx.wrong(); b.animate([{ transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'none' }], 300); return; }
      S.money -= it.cost; it.buy(); afterBuy(); renderShop();
    };
    g.appendChild(b);
  }
  document.querySelectorAll('.stabs button').forEach(b => b.onclick = () => { shopTab = b.dataset.t; sfx.tap(); renderShop(); });
  $('closeShop').onclick = () => { sfx.tap(); closeOverlay(); G.paused = false; G.last = performance.now(); };
}

export function help() {
  G.paused = true;
  const cust = { kind: 'bear', shirt: '#3a86ff', acc: 'none', blink: 0 };
  overlay(`
    <div class="hero">${art('burger')}</div>
    <div class="title">Tijn's Burger Place</div>
    <div class="how">
      <div><span class="n">1</span><div class="pics"><div class="ic half">${animalSVG(cust, 'happy')}</div>${ic('table')}</div><small>Klanten gaan zitten</small></div>
      <div><span class="n">2</span><div class="pics"><div class="ic half">${art('chef')}</div>${ic('grill')}</div><small>Koks maken het eten</small></div>
      <div><span class="n">3</span><div class="pics"><div class="ic half">${art('waiterIc')}</div>${ic('burger')}</div><small>Obers brengen het</small></div>
      <div><span class="n">4</span><div class="pics">${ic('tap')}${ic('pile')}</div><small>Tik op het geld!</small></div>
      <div><span class="n">5</span><div class="pics"><div class="ic" style="background:var(--green);border-radius:50%;padding:10px">${art('cart')}</div>${ic('house')}</div><small>Koop mensen en uitbreidingen</small></div>
    </div>
    <div class="actions">
      ${S.served ? `<button class="big no" id="resetBtn">${art('reset')}</button>` : ''}
      <button class="big go" id="startBtn">${art('play')}</button>
    </div>`);
  $('startBtn').onclick = () => { S.seenHelp = true; save(); closeOverlay(); G.paused = false; G.last = performance.now(); sfx.hello(); };
  const r = $('resetBtn');
  if (r) r.onclick = () => {
    overlay(`<div class="hero">${art('reset')}</div><div class="actions">
      <button class="big no" id="rNo">${art('close')}</button><button class="big go" id="rYes">${art('check')}</button></div>`);
    $('rNo').onclick = help;
    $('rYes').onclick = () => resetGame();
  };
}
