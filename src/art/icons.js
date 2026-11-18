import { animalSVG } from './animals.js';
import { O, shine, svg } from './svg.js';

export const ICONS = {
  coin: () => svg(`<circle cx="50" cy="50" r="42" fill="#ffc93c"/><circle cx="50" cy="50" r="31" fill="none" stroke="#d99a00" stroke-width="4"/>
    <text x="50" y="66" text-anchor="middle" font-size="46" font-family="Baloo 2, Arial" font-weight="800" fill="#b37800" stroke="none">€</text>${shine('M22 36 Q28 22 42 16')}`),
  star: () => svg(`<path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36 Z" fill="#ffd23f"/>${shine('M40 30 L48 14')}`),
  cart: () => svg(`<path d="M8 18 H22 L32 64 H78 L88 30 H26" fill="none" stroke="#fff" stroke-width="9"/><path d="M28 34 H84 L76 58 H33 Z" fill="#fff" stroke="none"/>
    <circle cx="38" cy="80" r="8" fill="#fff" stroke="none"/><circle cx="72" cy="80" r="8" fill="#fff" stroke="none"/>`),
  soundOn: () => svg(`<path d="M14 38 H32 L54 18 V82 L32 62 H14 Z" fill="#ff8c1a"/><path d="M66 34 Q76 50 66 66 M76 24 Q94 50 76 76" fill="none" stroke-width="7" stroke="#ff8c1a"/>`),
  soundOff: () => svg(`<path d="M14 38 H32 L54 18 V82 L32 62 H14 Z" fill="#adb5bd"/><path d="M66 36 L90 64 M90 36 L66 64" fill="none" stroke-width="8" stroke="#e63946"/>`),
  check: () => svg(`<path d="M16 52 L40 76 L86 24" fill="none" stroke="#fff" stroke-width="16"/>`),
  checkG: () => svg(`<circle cx="50" cy="50" r="44" fill="#2ec27e"/><path d="M28 52 L44 68 L74 34" fill="none" stroke="#fff" stroke-width="11"/>`),
  trash: () => svg(`<path d="M22 28 H78 L72 90 H28 Z" fill="#fff" stroke="none"/><rect x="14" y="16" width="72" height="12" rx="6" fill="#fff" stroke="none"/><rect x="38" y="6" width="24" height="12" rx="5" fill="#fff" stroke="none"/>
    <path d="M40 40 V78 M60 40 V78" stroke="#adb5bd" stroke-width="6"/>`),
  play: () => svg(`<path d="M30 14 L84 50 L30 86 Z" fill="#fff" stroke="none"/>`),
  close: () => svg(`<path d="M24 24 L76 76 M76 24 L24 76" fill="none" stroke="#e63946" stroke-width="14"/>`),
  sun: () => svg(`<g stroke="#ff9f1c" stroke-width="7">${[0,45,90,135,180,225,270,315].map(a => `<path d="M50 8 V18" transform="rotate(${a} 50 50)"/>`).join('')}</g><circle cx="50" cy="50" r="24" fill="#ffd23f"/>`),
  sunset: () => svg(`<circle cx="50" cy="50" r="28" fill="#ff7b39"/><path d="M8 62 H92" stroke="#ff7b39" stroke-width="6"/>`),
  moon: () => svg(`<path d="M62 10 A40 40 0 1 0 90 66 A32 32 0 1 1 62 10 Z" fill="#ffe066"/><circle cx="40" cy="44" r="5" fill="#f2c94c" stroke="none"/><circle cx="50" cy="70" r="4" fill="#f2c94c" stroke="none"/>`),
  heart: () => svg(`<path d="M50 88 C10 62 6 36 20 24 C32 14 46 20 50 32 C54 20 68 14 80 24 C94 36 90 62 50 88 Z" fill="#ef476f"/>${shine('M24 36 Q26 28 34 26')}`),
  angry: () => svg(`<g fill="none" stroke="#e63946" stroke-width="10"><path d="M20 38 Q38 38 38 20"/><path d="M62 20 Q62 38 80 38"/><path d="M20 62 Q38 62 38 80"/><path d="M80 62 Q62 62 62 80"/></g>`),
  question: () => svg(`<circle cx="50" cy="50" r="44" fill="#ffd23f"/><path d="M36 38 Q36 22 50 22 Q64 22 64 36 Q64 46 52 50 V58" fill="none" stroke-width="9"/><circle cx="52" cy="74" r="5" fill="${O}"/>`),
  clock: () => svg(`<circle cx="50" cy="52" r="38" fill="#fff"/><path d="M50 30 V52 L64 60" fill="none" stroke-width="6"/><rect x="40" y="4" width="20" height="10" rx="4" fill="#e63946"/>`),
  people: () => svg(`<circle cx="34" cy="34" r="14" fill="#ffb5c5"/><circle cx="68" cy="34" r="14" fill="#b97a4a"/><path d="M10 90 Q10 56 34 56 Q58 56 58 90 Z" fill="#3a86ff"/><path d="M44 90 Q44 56 68 56 Q92 56 92 90 Z" fill="#2ec27e"/>`),
  up: () => svg(`<path d="M50 12 L84 50 H64 V88 H36 V50 H16 Z" fill="#2ec27e"/>`),
  hand: () => svg(`<path d="M30 92 Q18 70 20 54 Q22 46 30 50 L34 58 V22 Q34 14 41 14 Q48 14 48 22 V44 V16 Q48 8 55 8 Q62 8 62 16 V44 V22 Q62 14 69 14 Q76 14 76 22 V48 V34 Q76 28 82 28 Q88 28 88 34 V62 Q88 82 76 92 Z" fill="#ffd0a8"/>`),
  back: () => svg(`<path d="M42 16 L10 46 L42 76 V58 Q72 56 88 82 Q86 38 42 34 Z" fill="#3a86ff"/>`),
  register: () => svg(`
    <rect x="16" y="6" width="60" height="26" rx="5" fill="#2f3a45"/><rect x="22" y="11" width="48" height="16" rx="3" fill="#7cf5b0" stroke="none"/>
    <path d="M8 34 H84 L90 82 H2 Z" fill="#ff8c1a"/><g fill="#fff" stroke="none">${[0,1,2].map(r => [0,1,2,3].map(c => `<rect x="${20 + c * 14}" y="${42 + r * 10}" width="10" height="6" rx="2"/>`).join('')).join('')}</g>
    <rect x="0" y="80" width="92" height="14" rx="4" fill="#d96d00"/>`, '0 0 92 96'),
  lamp: () => svg(`<path d="M23 0 V28" fill="none" stroke-width="3"/><path d="M6 44 Q6 26 23 26 Q40 26 40 44 Z" fill="#2ec27e"/><circle cx="23" cy="48" r="7" fill="#fff6a8"/>`, '0 0 46 60'),
  megaphone: () => svg(`<path d="M18 40 L64 16 V84 L18 60 Z" fill="#ef476f"/><rect x="8" y="38" width="14" height="24" rx="4" fill="#ffd23f"/><path d="M30 62 L36 86 H48 L44 68" fill="#adb5bd"/><path d="M76 34 Q84 50 76 66 M84 24 Q98 50 84 76" fill="none" stroke-width="5"/>`),
  sofa: () => svg(`<rect x="14" y="26" width="72" height="36" rx="14" fill="#9b5de5"/><rect x="4" y="44" width="22" height="36" rx="10" fill="#b583f0"/><rect x="74" y="44" width="22" height="36" rx="10" fill="#b583f0"/><rect x="22" y="54" width="56" height="22" rx="8" fill="#c9a2f7"/><path d="M16 80 V90 M84 80 V90" stroke-width="6"/>`),
  jar: () => svg(`<rect x="30" y="8" width="40" height="12" rx="4" fill="#ff8c1a"/><path d="M26 22 H74 Q84 32 84 48 V82 Q84 94 72 94 H28 Q16 94 16 82 V48 Q16 32 26 22 Z" fill="#d6f1ff"/>
    <g fill="#ffc93c"><ellipse cx="38" cy="80" rx="12" ry="6"/><ellipse cx="62" cy="80" rx="12" ry="6"/><ellipse cx="50" cy="70" rx="12" ry="6"/><ellipse cx="42" cy="60" rx="11" ry="5.5"/></g>${shine('M26 40 V70')}`),
  paint: () => svg(`<path d="M50 8 C76 8 94 26 92 50 C90 66 76 64 68 66 C60 68 64 80 58 88 C52 94 30 92 18 78 C4 62 8 8 50 8 Z" fill="#ffe0a3"/>
    <circle cx="30" cy="50" r="7" fill="#ef476f"/><circle cx="36" cy="28" r="7" fill="#ffd23f"/><circle cx="58" cy="22" r="7" fill="#2ec27e"/><circle cx="76" cy="38" r="7" fill="#3a86ff"/><circle cx="38" cy="72" r="7" fill="#9b5de5"/>`),
  bolt: () => svg(`<path d="M58 4 L18 56 H46 L38 96 L82 40 H54 Z" fill="#ffd23f"/>`),
  reset: () => svg(`<path d="M80 50 A30 30 0 1 1 64 23" fill="none" stroke-width="10"/><path d="M56 8 L74 22 L56 36 Z" fill="${O}"/>`),
  plate: () => svg(`<ellipse cx="50" cy="56" rx="44" ry="26" fill="#fff"/><ellipse cx="50" cy="54" rx="28" ry="15" fill="none" stroke-width="2.5"/>`),
};

Object.assign(ICONS, {
  table: () => svg(`<path d="M10 32 Q14 62 22 86 H118 Q126 62 130 32 Z" fill="#ef476f"/>
    <path d="M22 86 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0" fill="#ef476f"/>
    <path d="M40 40 Q42 64 46 84 M70 42 V86 M100 40 Q98 64 94 84" stroke="#fff" stroke-width="6" opacity=".5"/>
    <ellipse cx="70" cy="30" rx="62" ry="17" fill="#fff"/>`, '0 0 140 90'),
  chair: () => svg(`<rect x="8" y="6" width="68" height="70" rx="16" fill="#b5652d"/><rect x="20" y="18" width="44" height="46" rx="10" fill="#d98c4a"/>`, '0 0 84 80'),
  door: () => svg(`<rect x="2" y="2" width="80" height="134" rx="8" fill="#8d5a33"/><rect x="12" y="12" width="60" height="124" rx="4" fill="#3a86ff"/>
    <rect x="20" y="20" width="44" height="54" rx="4" fill="#bde0fe"/><path d="M24 30 L36 22 M24 44 L48 26" stroke="#fff" stroke-width="4" opacity=".7"/><circle cx="62" cy="96" r="5" fill="#ffd23f"/>`, '0 0 84 138'),
  window: () => svg(`<rect x="2" y="2" width="116" height="78" rx="8" fill="#fff"/><rect x="10" y="10" width="100" height="62" rx="4" fill="#9bd7ff"/>
    <circle cx="88" cy="26" r="8" fill="#ffd23f" stroke="none"/><path d="M10 60 Q40 44 70 58 Q90 50 110 56 V72 H10 Z" fill="#7ccf4f" stroke="none"/>
    <path d="M26 26 a8 8 0 0 1 14 -4 a7 7 0 0 1 10 6 h-24" fill="#fff" stroke="none"/><path d="M60 10 V72 M10 41 H110" stroke-width="4" stroke="#fff"/>`, '0 0 120 82'),
  lock: () => svg(`<path d="M30 46 V32 Q30 12 50 12 Q70 12 70 32 V46" fill="none" stroke="#adb5bd" stroke-width="10"/><rect x="20" y="44" width="60" height="46" rx="10" fill="#ffd23f"/><circle cx="50" cy="62" r="7" fill="${O}"/><path d="M50 66 V78" stroke-width="6"/>`),
  pile: () => svg(`<g fill="#ffc93c"><ellipse cx="32" cy="66" rx="22" ry="9"/><ellipse cx="32" cy="58" rx="22" ry="9"/><ellipse cx="68" cy="66" rx="22" ry="9"/><ellipse cx="50" cy="50" rx="22" ry="9"/><ellipse cx="50" cy="42" rx="22" ry="9"/></g>
    <circle cx="58" cy="30" r="16" fill="#ffd23f"/><text x="58" y="37" text-anchor="middle" font-size="20" font-family="Baloo 2, Arial" font-weight="800" fill="#b37800" stroke="none">€</text>`, '0 0 100 80'),
  skates: () => svg(`<path d="M20 20 H52 V54 H84 Q92 54 92 64 V70 H16 Z" fill="#ef476f"/><path d="M24 30 H48 M24 40 H48" stroke="#fff" stroke-width="4"/>
    <circle cx="30" cy="82" r="9" fill="#ffd23f"/><circle cx="78" cy="82" r="9" fill="#ffd23f"/><path d="M8 50 H0 M8 60 H-4" stroke="#ff8c1a" stroke-width="5"/>`),
  house: () => svg(`<path d="M10 48 L50 12 L90 48" fill="none" stroke="#e63946" stroke-width="10"/><path d="M20 44 V90 H80 V44 L50 18 Z" fill="#ffd23f"/><rect x="40" y="58" width="20" height="32" rx="3" fill="#3a86ff"/>`),
  rotate: () => svg(`<rect x="30" y="12" width="40" height="70" rx="8" fill="#fff"/><path d="M14 64 A40 40 0 0 0 76 90" fill="none" stroke="#fff" stroke-width="7"/><path d="M70 80 L82 92 L66 96 Z" fill="#fff"/>`),
  tap: () => svg(`<path d="M40 92 Q28 72 28 60 Q28 52 36 54 L42 62 V24 Q42 16 49 16 Q56 16 56 24 V50 Q70 46 74 54 Q86 54 86 64 Q86 82 74 92 Z" fill="#ffd0a8"/><path d="M30 18 L22 10 M49 6 V-2 M68 18 L76 10" stroke-width="4"/>`),
  chef: () => animalSVG({ kind: 'bear', shirt: '#fff', role: 'cook', acc: 'none', blink: 0 }, 'happy'),
  waiterIc: () => animalSVG({ kind: 'cat', shirt: '#2b2d42', role: 'waiter', acc: 'none', blink: 0 }, 'happy'),
  cashierIc: () => animalSVG({ kind: 'panda', shirt: '#2ec27e', role: 'cashier', acc: 'cap', cap: '#ef476f', blink: 0 }, 'happy'),
});
