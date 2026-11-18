import { O, shine, svg } from './svg.js';

export const DECOR_ART = {
  balloons: () => svg(`<path d="M30 52 Q34 74 46 98 M62 46 Q56 74 48 98 M48 34 Q50 70 47 98" fill="none" stroke-width="2"/>
    <ellipse cx="30" cy="34" rx="16" ry="20" fill="#ef476f"/><ellipse cx="64" cy="30" rx="16" ry="20" fill="#3a86ff"/><ellipse cx="48" cy="18" rx="15" ry="18" fill="#ffd23f"/>${shine('M22 26 Q24 20 28 19')}${shine('M58 22 Q60 16 64 15')}`),
  clock: () => svg(`<circle cx="50" cy="50" r="40" fill="#ff8c1a"/><circle cx="50" cy="50" r="31" fill="#fff"/><path d="M50 30 V50 L64 58" fill="none" stroke-width="5"/><circle cx="50" cy="50" r="4" fill="${O}"/>`),
  picture: () => svg(`<rect x="6" y="10" width="88" height="80" rx="6" fill="#d98c3a"/><rect x="16" y="20" width="68" height="60" fill="#bde0fe"/>
    <path d="M16 66 Q40 52 84 64 V80 H16 Z" fill="#7ccf4f"/><circle cx="68" cy="36" r="9" fill="#ffd23f"/><g transform="translate(26 38) scale(.36)">
    <rect x="14" y="68" width="72" height="20" rx="10" fill="#f2a541"/><rect x="9" y="56" width="82" height="15" rx="7.5" fill="#7a4526"/><path d="M9 47 C9 20 30 11 50 11 C70 11 91 20 91 47 Z" fill="#f6a93b"/></g>`),
  plant: () => svg(`<path d="M50 62 C30 40 18 46 10 30 C30 28 44 40 50 62 Z" fill="#4caf50"/><path d="M50 62 C70 36 84 42 92 24 C70 22 56 36 50 62 Z" fill="#5fbf55"/>
    <path d="M50 62 C42 30 52 14 50 2 C64 16 60 40 50 62 Z" fill="#7ccf4f"/><path d="M24 60 H76 L68 96 H32 Z" fill="#e76f51"/><rect x="20" y="56" width="60" height="10" rx="4" fill="#f4a261"/>`),
  trophy: () => svg(`<path d="M24 14 H76 V40 Q76 64 50 66 Q24 64 24 40 Z" fill="#ffd23f"/><path d="M24 22 H10 Q8 46 28 48 M76 22 H90 Q92 46 72 48" fill="none" stroke-width="5"/>
    <rect x="42" y="64" width="16" height="14" fill="#e0a800"/><rect x="28" y="78" width="44" height="14" rx="3" fill="#8b4a2b"/>${shine('M34 22 V44')}`),
  teddy: () => svg(`<circle cx="26" cy="20" r="11" fill="#c8874f"/><circle cx="74" cy="20" r="11" fill="#c8874f"/><ellipse cx="50" cy="74" rx="30" ry="24" fill="#c8874f"/>
    <circle cx="50" cy="38" r="26" fill="#d9995e"/><ellipse cx="50" cy="48" rx="11" ry="8" fill="#f3d3ae"/><ellipse cx="50" cy="44" rx="4" ry="3" fill="${O}"/>
    <circle cx="41" cy="34" r="3.5" fill="${O}"/><circle cx="59" cy="34" r="3.5" fill="${O}"/><path d="M40 62 L50 68 L60 62 L60 74 L50 68 L40 74 Z" fill="#ef476f" stroke-width="2.5"/>`),
  neon: () => svg(`<rect x="4" y="16" width="92" height="68" rx="14" fill="#2b1f3a"/><g fill="none" stroke="#ff4fd8" stroke-width="4">
    <path d="M24 48 C24 34 36 28 50 28 C64 28 76 34 76 48 Z"/><rect x="22" y="54" width="56" height="8" rx="4"/><rect x="25" y="66" width="50" height="9" rx="4.5"/></g>`),
  rocket: () => svg(`<path d="M50 4 C70 18 72 46 66 70 H34 C28 46 30 18 50 4 Z" fill="#f1f3f5"/><circle cx="50" cy="36" r="9" fill="#3a86ff"/>
    <path d="M34 54 L20 76 L36 72 Z M66 54 L80 76 L64 72 Z" fill="#ef476f"/><path d="M40 72 Q50 98 60 72 Z" fill="#ff8c1a"/><path d="M45 72 Q50 88 55 72 Z" fill="#ffd23f" stroke="none"/>`),
  arcade: () => svg(`<path d="M20 4 H80 V96 H20 Z" fill="#3a86ff"/><rect x="28" y="12" width="44" height="34" rx="4" fill="#1b263b"/>
    <g stroke="none"><rect x="36" y="22" width="6" height="6" fill="#7cf5b0"/><rect x="48" y="30" width="6" height="6" fill="#ffd23f"/><rect x="58" y="20" width="6" height="6" fill="#ef476f"/></g>
    <rect x="24" y="52" width="52" height="14" fill="#ffd23f"/><circle cx="38" cy="59" r="4" fill="#ef476f"/><circle cx="62" cy="59" r="4" fill="#2ec27e"/><path d="M50 52 V44" stroke-width="3"/><circle cx="50" cy="42" r="4" fill="#ef476f"/>`),
  fish: () => svg(`<rect x="4" y="14" width="92" height="74" rx="10" fill="#9ee7ff" opacity=".9"/><path d="M4 70 Q30 62 50 72 Q70 82 96 70 V78 Q96 88 86 88 H14 Q4 88 4 78 Z" fill="#f4d58d"/>
    <path d="M22 88 Q20 72 26 62 M30 88 Q34 74 30 66" fill="none" stroke="#2ec27e" stroke-width="4"/>
    <g class="fishy"><ellipse cx="54" cy="44" rx="16" ry="11" fill="#ff8c1a"/><path d="M68 44 L82 34 V54 Z" fill="#ff8c1a"/><circle cx="47" cy="41" r="2.5" fill="${O}"/></g>
    <g fill="#fff" stroke="none" opacity=".8"><circle cx="34" cy="30" r="3"/><circle cx="30" cy="22" r="2"/></g>`),
  jukebox: () => svg(`<path d="M16 96 V40 Q16 6 50 6 Q84 6 84 40 V96 Z" fill="#ef476f"/><path d="M26 92 V42 Q26 16 50 16 Q74 16 74 42 V92 Z" fill="#ffd23f"/>
    <rect x="32" y="50" width="36" height="20" rx="3" fill="#9b5de5"/><circle cx="50" cy="34" r="10" fill="#3a86ff"/><path d="M32 78 H68 M32 85 H68" stroke-width="3"/>`),
  crown: () => svg(`<path d="M10 78 L16 26 L34 50 L50 16 L66 50 L84 26 L90 78 Z" fill="#ffd23f"/><rect x="8" y="76" width="84" height="14" rx="4" fill="#f0b400"/>
    <circle cx="50" cy="60" r="6" fill="#ef476f"/><circle cx="28" cy="64" r="4.5" fill="#3a86ff"/><circle cx="72" cy="64" r="4.5" fill="#2ec27e"/>${shine('M22 40 L20 64')}`),
};

// ---------------- Dieren ----------------
