import { svg } from './svg.js';

export const flame = (x, y, s = 1) => `<g class="flame" transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-10 -12 -2 -26 Q0 -16 6 -20 Q4 -30 10 -36 Q20 -18 10 0 Z" fill="#ff8c1a"/><path d="M2 0 Q-3 -8 2 -16 Q6 -10 8 -4 Z" fill="#ffd23f" stroke="none"/></g>`;
export const bubbles = (x, y) => `<g class="flame" fill="#fff" stroke="none" opacity=".8"><circle cx="${x}" cy="${y}" r="3"/><circle cx="${x + 10}" cy="${y - 6}" r="2.5"/><circle cx="${x + 20}" cy="${y - 1}" r="3.5"/></g>`;
export const STATION_ART = {
  grill: () => svg(`${flame(24, 30)}${flame(52, 30, 1.2)}${flame(84, 30)}
    <rect x="6" y="40" width="108" height="68" rx="8" fill="#8d99ae"/><rect x="18" y="56" width="84" height="40" rx="6" fill="#adb5bd"/>
    <rect x="2" y="28" width="116" height="16" rx="6" fill="#2b2d42"/><path d="M14 36 H106" stroke="#6c757d" stroke-width="2"/>
    <g fill="#e63946"><circle cx="30" cy="102" r="0"/></g><rect x="46" y="70" width="28" height="6" rx="3" fill="#495057" stroke="none"/>
    <g fill="#ffd23f"><circle cx="20" cy="48" r="4"/><circle cx="100" cy="48" r="4"/></g>`, '0 0 120 110'),
  drinks: () => svg(`<rect x="12" y="2" width="96" height="106" rx="12" fill="#3a86ff"/><rect x="20" y="10" width="80" height="30" rx="8" fill="#e7f5ff"/>
    <path d="M40 25 q10 -10 20 0 q10 10 20 0" fill="none" stroke="#e63946" stroke-width="5"/>
    <rect x="20" y="46" width="80" height="44" rx="6" fill="#1d4e9e"/><g fill="#adb5bd"><rect x="32" y="46" width="10" height="12" rx="2"/><rect x="55" y="46" width="10" height="12" rx="2"/><rect x="78" y="46" width="10" height="12" rx="2"/></g>
    <path d="M50 66 H70 L67 88 H53 Z" fill="#fff"/>${bubbles(52, 76)}<rect x="12" y="94" width="96" height="14" rx="5" fill="#2667cc"/>`, '0 0 120 110'),
  fryer: () => svg(`<rect x="8" y="40" width="104" height="68" rx="8" fill="#adb5bd"/><rect x="14" y="30" width="92" height="22" rx="6" fill="#ffd23f"/>
    ${bubbles(26, 42)}${bubbles(68, 42)}
    <path d="M26 30 V12 H50 V30 M70 30 V12 H94 V30" fill="none" stroke="#495057" stroke-width="5"/><rect x="20" y="64" width="80" height="30" rx="6" fill="#ced4da"/>
    <g fill="#e63946"><circle cx="34" cy="79" r="6"/><circle cx="86" cy="79" r="6"/></g>`, '0 0 120 110'),
  oven: () => svg(`<path d="M6 108 V62 Q6 12 60 12 Q114 12 114 62 V108 Z" fill="#c8553d"/>
    <path d="M16 46 H40 M60 30 H84 M80 56 H104 M26 74 H50 M70 82 H96" stroke="#9a3b28" stroke-width="3"/>
    <path d="M30 108 V76 Q30 50 60 50 Q90 50 90 76 V108 Z" fill="#2b2d42"/>${flame(48, 104, 1.1)}${flame(70, 104, .9)}
    <rect x="50" y="0" width="20" height="16" rx="3" fill="#6c757d"/>`, '0 0 120 110'),
  dessert: () => svg(`<rect x="8" y="34" width="104" height="74" rx="10" fill="#ff9ec4"/><rect x="18" y="44" width="84" height="36" rx="6" fill="#d6f1ff"/>
    <g><circle cx="38" cy="66" r="10" fill="#ff7eb6"/><circle cx="38" cy="66" r="3.5" fill="#d6f1ff"/><circle cx="64" cy="66" r="10" fill="#e5a05a"/><circle cx="64" cy="66" r="3.5" fill="#d6f1ff"/><circle cx="88" cy="68" r="8" fill="#ffd23f"/></g>
    <path d="M44 34 C38 20 50 12 56 18 C58 6 74 8 72 20 C80 18 84 28 78 34 Z" fill="#fff"/><g class="flame" fill="#fff" stroke="none"><circle cx="90" cy="20" r="3"/><circle cx="98" cy="12" r="2"/></g>
    <rect x="8" y="88" width="104" height="20" rx="6" fill="#f15bb5"/>`, '0 0 120 110'),
  taco: () => svg(`<rect x="6" y="50" width="108" height="58" rx="8" fill="#2ec27e"/><path d="M6 60 H114" stroke="#1f9d63" stroke-width="4"/>
    <g><ellipse cx="28" cy="44" rx="18" ry="10" fill="#ffd166"/><ellipse cx="60" cy="44" rx="18" ry="10" fill="#e63946"/><ellipse cx="92" cy="44" rx="18" ry="10" fill="#7ccf4f"/></g>
    <g fill="#ffd23f"><path d="M14 88 l8 -14 8 14 8 -14 8 14 8 -14 8 14 8 -14 8 14 8 -14 8 14 8 -14 6 14" fill="none" stroke="#ffd23f" stroke-width="5"/></g>
    ${flame(60, 34, .8)}`, '0 0 120 110'),
};
