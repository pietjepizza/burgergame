import { O, shine, svg } from './svg.js';

export const FOOD_ART = {
  burger: () => svg(`
    <rect x="14" y="68" width="72" height="20" rx="10" fill="#f2a541"/>
    <rect x="9" y="56" width="82" height="15" rx="7.5" fill="#7a4526"/>
    <path d="M11 54 H89 L85 60 L76 67 L68 60 L55 69 L44 60 L30 67 L18 60 Z" fill="#ffd23f"/>
    <path d="M7 48 Q13 58 19 48 Q25 58 31 48 Q37 58 43 48 Q49 58 55 48 Q61 58 67 48 Q73 58 79 48 Q85 58 93 48 L93 46 H7 Z" fill="#7ccf4f"/>
    <path d="M9 47 C9 20 30 11 50 11 C70 11 91 20 91 47 Z" fill="#f6a93b"/>
    ${shine('M24 28 Q32 18 46 17')}
    <g fill="#fff6dc" stroke="none"><ellipse cx="38" cy="26" rx="3" ry="2"/><ellipse cx="54" cy="22" rx="3" ry="2"/><ellipse cx="66" cy="30" rx="3" ry="2"/><ellipse cx="48" cy="34" rx="3" ry="2"/><ellipse cx="74" cy="22" rx="2.5" ry="1.8"/><ellipse cx="28" cy="36" rx="2.5" ry="1.8"/></g>`),
  fries: () => svg(`
    <g fill="#ffd23f">
      <rect x="24" y="14" width="10" height="46" rx="3" transform="rotate(-12 29 40)"/>
      <rect x="36" y="8" width="10" height="50" rx="3" transform="rotate(-4 41 36)"/>
      <rect x="48" y="6" width="10" height="52" rx="3" transform="rotate(3 53 36)"/>
      <rect x="60" y="10" width="10" height="48" rx="3" transform="rotate(10 65 36)"/>
      <rect x="42" y="18" width="10" height="40" rx="3" transform="rotate(14 47 40)"/>
    </g>
    <path d="M18 40 Q50 52 82 40 L74 92 H26 Z" fill="#e63946"/>
    <path d="M50 58 l4 9 10 1 -7.5 6.5 2.5 9.5 -9-5 -9 5 2.5-9.5 -7.5-6.5 10-1z" fill="#ffd23f" stroke-width="2.5"/>
    ${shine('M28 50 L32 84')}`),
  cola: () => svg(`
    <path d="M55 26 L62 4 H76" fill="none" stroke="${O}" stroke-width="10"/>
    <path d="M55 26 L62 4 H76" fill="none" stroke="#ff8fab" stroke-width="5"/>
    <path d="M25 30 H75 L68 92 H32 Z" fill="#3a86ff"/>
    <path d="M27.5 50 H72.5 L70.6 68 H29.4 Z" fill="#fff"/>
    <path d="M38 56 q6 -6 12 0 q6 6 12 0" fill="none" stroke="#e63946" stroke-width="4"/>
    <rect x="20" y="22" width="60" height="11" rx="5.5" fill="#e9ecef"/>
    ${shine('M33 38 L37 86')}`),
  popcorn: () => svg(`
    <g fill="#fff6d8"><circle cx="32" cy="36" r="10"/><circle cx="46" cy="28" r="11"/><circle cx="60" cy="30" r="10"/><circle cx="70" cy="38" r="9"/><circle cx="52" cy="18" r="9"/><circle cx="38" cy="22" r="8"/><circle cx="64" cy="20" r="7"/></g>
    <g fill="#ffd23f" stroke="none"><circle cx="44" cy="25" r="3"/><circle cx="62" cy="34" r="2.5"/><circle cx="34" cy="34" r="2.5"/></g>
    <path d="M22 42 H78 L70 94 H30 Z" fill="#fff"/>
    <g fill="#e63946" stroke="none"><path d="M31 42 H41 L40 94 H34 Z"/><path d="M50 42 H60 L57 94 H51 Z" transform="translate(-5 0)"/><path d="M64 42 H74 L69 94 H63 Z" transform="translate(-2 0)"/></g>
    <path d="M22 42 H78 L70 94 H30 Z" fill="none"/>`),
  hotdog: () => svg(`
    <rect x="12" y="42" width="76" height="30" rx="15" fill="#f6a93b"/>
    <rect x="3" y="40" width="94" height="20" rx="10" fill="#d0533a"/>
    ${shine('M12 46 H40')}
    <path d="M14 50 l7 -5 7 5 7 -5 7 5 7 -5 7 5 7 -5 7 5 7 -5 7 5" fill="none" stroke="#ffd23f" stroke-width="4.5"/>
    <path d="M10 58 Q50 70 90 58 Q90 84 70 84 H30 Q10 84 10 58 Z" fill="#f8bb55"/>
    ${shine('M22 72 Q40 78 56 76')}`),
  ice: () => svg(`
    <path d="M30 52 H70 L50 96 Z" fill="#eaa45a"/>
    <path d="M38 56 L56 82 M50 54 L62 68 M34 64 L46 54 M44 76 L62 56" fill="none" stroke-width="2.5" opacity=".6"/>
    <path d="M24 52 C18 36 30 26 40 30 C40 16 60 14 62 28 C74 24 84 38 76 52 Q72 58 66 52 Q60 60 54 52 Q48 60 42 52 Q36 60 30 52 Z" fill="#ffadc6"/>
    <circle cx="52" cy="14" r="7" fill="#e63946"/>
    <path d="M52 7 Q56 0 62 0" fill="none"/>
    ${shine('M32 36 Q36 30 42 32')}
    <g stroke="none"><rect x="40" y="38" width="6" height="3" rx="1.5" fill="#3a86ff" transform="rotate(30 43 39)"/><rect x="58" y="34" width="6" height="3" rx="1.5" fill="#ffd23f" transform="rotate(-20 61 35)"/><rect x="64" y="44" width="6" height="3" rx="1.5" fill="#2ec27e"/></g>`),
  donut: () => svg(`
    <path fill-rule="evenodd" d="M50 12 a40 38 0 1 0 0.1 0 Z M50 40 a12 11 0 1 1 -0.1 0 Z" fill="#e5a05a"/>
    <path fill-rule="evenodd" d="M50 17 C66 15 84 26 82 44 C86 52 80 58 82 66 C76 80 60 86 48 82 C36 86 22 78 20 66 C14 56 18 44 22 38 C24 26 36 16 50 17 Z M50 40 a12 11 0 1 1 -0.1 0 Z" fill="#ff7eb6"/>
    <g stroke="none"><rect x="30" y="34" width="9" height="3.6" rx="1.8" fill="#fff" transform="rotate(30 34 36)"/><rect x="60" y="26" width="9" height="3.6" rx="1.8" fill="#ffd23f" transform="rotate(-20 64 28)"/><rect x="68" y="56" width="9" height="3.6" rx="1.8" fill="#3a86ff" transform="rotate(50 72 58)"/><rect x="40" y="66" width="9" height="3.6" rx="1.8" fill="#2ec27e" transform="rotate(-30 44 68)"/><rect x="26" y="54" width="9" height="3.6" rx="1.8" fill="#ffd23f" transform="rotate(70 30 56)"/><rect x="48" y="24" width="9" height="3.6" rx="1.8" fill="#3a86ff"/><rect x="62" y="70" width="8" height="3.6" rx="1.8" fill="#fff" transform="rotate(10 66 72)"/></g>
    ${shine('M30 28 Q36 22 44 21')}`),
  pizza: () => svg(`
    <path d="M50 94 L12 24 Q50 4 88 24 Z" fill="#ffcf4a"/>
    <path d="M12 24 Q50 4 88 24 L84 34 Q50 16 16 34 Z" fill="#d98c3a"/>
    <path d="M30 48 Q30 58 34 60 Q36 52 40 50" fill="#ffcf4a"/>
    <g fill="#d63b3b"><circle cx="40" cy="40" r="7"/><circle cx="62" cy="42" r="7"/><circle cx="50" cy="62" r="6.5"/></g>
    <g fill="#4caf50" stroke="none"><circle cx="54" cy="32" r="2.5"/><circle cx="44" cy="54" r="2.5"/><circle cx="60" cy="56" r="2"/></g>
    ${shine('M24 30 Q40 20 56 19')}`),
  shake: () => svg(`
    <path d="M58 28 L66 2" fill="none" stroke="${O}" stroke-width="10"/><path d="M58 28 L66 2" fill="none" stroke="#3a86ff" stroke-width="5"/>
    <path d="M28 36 H72 L64 94 H36 Z" fill="#ff9ec4"/>
    <path d="M30 50 H70" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
    <path d="M24 38 Q22 24 34 26 Q36 14 50 18 Q62 12 66 26 Q78 24 76 38 Z" fill="#fff"/>
    <circle cx="50" cy="13" r="7" fill="#e63946"/><path d="M50 6 Q52 0 58 -1" fill="none"/>
    ${shine('M36 54 L40 86')}`),
  chicken: () => svg(`
    <g transform="rotate(-30 50 50)">
      <rect x="44" y="56" width="12" height="30" rx="5" fill="#fff4e0"/>
      <circle cx="44" cy="88" r="7" fill="#fff4e0"/><circle cx="56" cy="88" r="7" fill="#fff4e0"/>
      <path d="M50 10 C78 10 82 36 72 50 C66 60 58 62 56 62 H44 C42 62 34 60 28 50 C18 36 22 10 50 10 Z" fill="#d07a30"/>
      <g fill="#b55f1f" stroke="none"><circle cx="40" cy="28" r="3.5"/><circle cx="58" cy="24" r="3"/><circle cx="62" cy="44" r="3.5"/><circle cx="44" cy="46" r="3"/></g>
      ${shine('M34 22 Q40 15 48 15')}
    </g>`),
  taco: () => svg(`
    <path d="M6 82 A44 44 0 0 1 94 82 Z" fill="#7ccf4f"/>
    <g fill="#e63946"><circle cx="24" cy="46" r="6"/><circle cx="46" cy="36" r="6"/><circle cx="70" cy="40" r="6"/></g>
    <g fill="#8b4a2b"><circle cx="34" cy="42" r="5"/><circle cx="58" cy="36" r="5"/><circle cx="80" cy="52" r="5"/></g>
    <path d="M12 84 A38 38 0 0 1 88 84 Z" fill="#ffd166"/>
    <g fill="#e9a23b" stroke="none"><circle cx="34" cy="70" r="2.5"/><circle cx="52" cy="62" r="2.5"/><circle cx="66" cy="72" r="2.5"/><circle cx="44" cy="78" r="2"/><circle cx="74" cy="64" r="2"/></g>
    ${shine('M24 70 Q30 58 42 54')}`),
  wrap: () => svg(`
    <g transform="rotate(-28 50 54)">
      <path d="M28 40 H72 V84 Q72 96 50 96 Q28 96 28 84 Z" fill="#f1d7a2"/>
      <path d="M28 64 H72 V84 Q72 96 50 96 Q28 96 28 84 Z" fill="#cfd8dc"/>
      <path d="M28 70 H72" fill="none" stroke-width="2.5" opacity=".5"/>
      <ellipse cx="50" cy="40" rx="22" ry="9" fill="#f1d7a2"/>
      <ellipse cx="50" cy="38" rx="17" ry="6" fill="#8b4a2b" stroke="none"/>
      <g stroke="none"><circle cx="42" cy="36" r="4" fill="#7ccf4f"/><circle cx="56" cy="35" r="4" fill="#e63946"/><circle cx="50" cy="40" r="3.5" fill="#ffd23f"/><circle cx="62" cy="39" r="3" fill="#7ccf4f"/></g>
      ${shine('M33 46 V62')}
    </g>`),
};
