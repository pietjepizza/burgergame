import { O, svg } from './svg.js';

export const KINDS = {
  bear:   { skin: '#b97a4a', snout: '#ecc9a0', ear: 'round', inner: '#e3a777' },
  cat:    { skin: '#f6a85b', snout: '#fff1de', ear: 'cat', inner: '#ffb3c6', whisk: 1 },
  fox:    { skin: '#f47c2c', snout: '#ffffff', ear: 'cat', inner: '#4a2c17' },
  panda:  { skin: '#ffffff', snout: '#ffffff', ear: 'round', earC: '#2f2f2f', inner: '#2f2f2f', patch: 1 },
  pig:    { skin: '#ffb5c5', snout: '#ff8fab', ear: 'cat', inner: '#ff8fab', pig: 1 },
  rabbit: { skin: '#f4f1ee', snout: '#ffffff', ear: 'long', inner: '#ffb3c6' },
  frog:   { skin: '#7bc96f', snout: '#a9e29f', ear: 'frog' },
  lion:   { skin: '#f6c453', snout: '#fff1c1', ear: 'round', inner: '#e0a030', mane: '#c8742f' },
  mouse:  { skin: '#b8c0c8', snout: '#e9ecef', ear: 'mouse', inner: '#ffb3c6', whisk: 1 },
  koala:  { skin: '#9aa5b1', snout: '#c9d1d9', ear: 'koala', inner: '#eef1f4', bignose: 1 },
  tiger:  { skin: '#f7931e', snout: '#fff3e0', ear: 'cat', inner: '#fff3e0', stripes: 1, whisk: 1 },
  dog:    { skin: '#e0b07a', snout: '#fff1de', ear: 'floppy', earC: '#8b5a2b' },
};
export const SHIRTS = ['#3a86ff', '#ef476f', '#2ec27e', '#9b5de5', '#ff8c1a', '#00b4d8', '#ffd23f', '#f15bb5'];
export const ACCS = ['none', 'none', 'bow', 'glasses', 'cap', 'none'];

export function animalSVG(c, mood = 'ok') {
  const k = KINDS[c.kind];
  const frog = k.ear === 'frog';
  const ey = frog ? 26 : 54, ex1 = frog ? 40 : 45, ex2 = frog ? 80 : 75;
  let s = '';
  if (c.feet) s += '<g class="feet"><ellipse class="fl" cx="44" cy="170" rx="12" ry="7" fill="#4a2c17"/><ellipse class="fr" cx="76" cy="170" rx="12" ry="7" fill="#4a2c17"/></g>';
  // lichaam
  s += `<path d="M14 166 Q16 118 60 116 Q104 118 106 166 Z" fill="${c.shirt}"/>`;
  s += `<path d="M44 117 L60 132 L76 117" fill="#fff"/>`;
  if (c.role === 'waiter') s += `<path d="M60 124 L46 116 L46 132 Z M60 124 L74 116 L74 132 Z" fill="#e63946"/><circle cx="60" cy="124" r="4.5" fill="#e63946"/>`;
  if (c.role === 'cook') s += `<circle cx="60" cy="140" r="3" fill="#ced4da"/><circle cx="60" cy="152" r="3" fill="#ced4da"/>`;
  if (c.role === 'cashier') s += `<rect x="70" y="134" width="20" height="14" rx="3" fill="#fff"/><path d="M74 140 H86" stroke-width="2.5"/>`;
  // manen
  if (k.mane) for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2; s += `<circle cx="${60 + Math.cos(a) * 40}" cy="${58 + Math.sin(a) * 38}" r="14" fill="${k.mane}"/>`;
  }
  // oren achter hoofd
  const ec = k.earC || k.skin;
  if (k.ear === 'round') s += `<circle cx="28" cy="28" r="14" fill="${ec}"/><circle cx="92" cy="28" r="14" fill="${ec}"/><circle cx="28" cy="28" r="7" fill="${k.inner}" stroke="none"/><circle cx="92" cy="28" r="7" fill="${k.inner}" stroke="none"/>`;
  if (k.ear === 'cat') s += `<path d="M22 46 L26 6 L54 28 Z" fill="${ec}"/><path d="M98 46 L94 6 L66 28 Z" fill="${ec}"/><path d="M29 36 L31 17 L45 28 Z" fill="${k.inner}" stroke="none"/><path d="M91 36 L89 17 L75 28 Z" fill="${k.inner}" stroke="none"/>`;
  if (k.ear === 'long') s += `<ellipse cx="42" cy="2" rx="11" ry="30" fill="${ec}" transform="rotate(-10 42 2)"/><ellipse cx="78" cy="2" rx="11" ry="30" fill="${ec}" transform="rotate(10 78 2)"/><ellipse cx="42" cy="4" rx="5" ry="21" fill="${k.inner}" stroke="none" transform="rotate(-10 42 4)"/><ellipse cx="78" cy="4" rx="5" ry="21" fill="${k.inner}" stroke="none" transform="rotate(10 78 4)"/>`;
  if (k.ear === 'mouse') s += `<circle cx="20" cy="30" r="21" fill="${ec}"/><circle cx="100" cy="30" r="21" fill="${ec}"/><circle cx="20" cy="30" r="12" fill="${k.inner}" stroke="none"/><circle cx="100" cy="30" r="12" fill="${k.inner}" stroke="none"/>`;
  if (k.ear === 'koala') s += `<circle cx="20" cy="40" r="21" fill="${ec}"/><circle cx="100" cy="40" r="21" fill="${ec}"/><circle cx="21" cy="41" r="12" fill="${k.inner}" stroke="none"/><circle cx="99" cy="41" r="12" fill="${k.inner}" stroke="none"/>`;
  if (frog) s += `<circle cx="40" cy="26" r="17" fill="${k.skin}"/><circle cx="80" cy="26" r="17" fill="${k.skin}"/>`;
  // hoofd
  s += `<ellipse cx="60" cy="60" rx="41" ry="38" fill="${k.skin}"/>`;
  if (frog) s += `<path d="M27 30 A17 17 0 0 1 53 26 M67 26 A17 17 0 0 1 93 30" fill="${k.skin}" stroke="none"/>`;
  if (k.stripes) s += `<path d="M60 23 V34 M47 25 L50 34 M73 25 L70 34 M20 58 L31 60 M100 58 L89 60 M22 70 L31 69 M98 70 L89 69" fill="none" stroke-width="4"/>`;
  if (k.patch) s += `<ellipse cx="45" cy="55" rx="11" ry="14" fill="#2f2f2f" stroke="none" transform="rotate(-25 45 55)"/><ellipse cx="75" cy="55" rx="11" ry="14" fill="#2f2f2f" stroke="none" transform="rotate(25 75 55)"/>`;
  if (k.ear === 'floppy') s += `<ellipse cx="22" cy="56" rx="12" ry="27" fill="${ec}" transform="rotate(18 22 56)"/><ellipse cx="98" cy="56" rx="12" ry="27" fill="${ec}" transform="rotate(-18 98 56)"/>`;
  // ogen
  if (mood === 'love') {
    const h = (x, y) => `<path d="M${x} ${y + 8} C${x - 12} ${y} ${x - 10} ${y - 10} ${x} ${y - 4} C${x + 10} ${y - 10} ${x + 12} ${y} ${x} ${y + 8} Z" fill="#ef476f" stroke-width="2.5"/>`;
    s += h(ex1, ey) + h(ex2, ey);
  } else if (mood === 'happy') {
    s += `<path d="M${ex1 - 7} ${ey + 2} Q${ex1} ${ey - 8} ${ex1 + 7} ${ey + 2} M${ex2 - 7} ${ey + 2} Q${ex2} ${ey - 8} ${ex2 + 7} ${ey + 2}" fill="none" stroke-width="4.5"/>`;
  } else {
    s += `<g class="eyes" style="animation-delay:${c.blink}s"><circle cx="${ex1}" cy="${ey}" r="8.5" fill="#fff"/><circle cx="${ex2}" cy="${ey}" r="8.5" fill="#fff"/>
      <circle cx="${ex1 + 1}" cy="${ey + 1}" r="5" fill="${O}" stroke="none"/><circle cx="${ex2 + 1}" cy="${ey + 1}" r="5" fill="${O}" stroke="none"/>
      <circle cx="${ex1 + 2.5}" cy="${ey - 1}" r="1.8" fill="#fff" stroke="none"/><circle cx="${ex2 + 2.5}" cy="${ey - 1}" r="1.8" fill="#fff" stroke="none"/></g>`;
  }
  if (mood === 'angry') s += `<path d="M${ex1 - 10} ${ey - 15} L${ex1 + 7} ${ey - 9} M${ex2 + 10} ${ey - 15} L${ex2 - 7} ${ey - 9}" fill="none" stroke-width="4.5"/>`;
  if (mood === 'worried' || mood === 'sad') s += `<path d="M${ex1 - 8} ${ey - 11} L${ex1 + 6} ${ey - 16} M${ex2 + 8} ${ey - 11} L${ex2 - 6} ${ey - 16}" fill="none" stroke-width="4"/>`;
  // wangen
  s += `<ellipse cx="31" cy="72" rx="7" ry="4.5" fill="#ff6b8b" opacity="${mood === 'love' || mood === 'happy' ? .7 : .4}" stroke="none"/><ellipse cx="89" cy="72" rx="7" ry="4.5" fill="#ff6b8b" opacity="${mood === 'love' || mood === 'happy' ? .7 : .4}" stroke="none"/>`;
  // snuit & neus
  if (!frog && !k.pig) s += `<ellipse cx="60" cy="74" rx="16" ry="12" fill="${k.snout}" ${k.snout === k.skin ? 'stroke="none"' : ''}/>`;
  if (k.pig) s += `<ellipse cx="60" cy="70" rx="13" ry="9" fill="${k.snout}"/><ellipse cx="55" cy="70" rx="2.5" ry="3.5" fill="${O}" stroke="none"/><ellipse cx="65" cy="70" rx="2.5" ry="3.5" fill="${O}" stroke="none"/>`;
  else if (k.bignose) s += `<ellipse cx="60" cy="68" rx="9" ry="11" fill="#3b3b3b"/>`;
  else if (!frog) s += `<path d="M53 66 Q60 62 67 66 Q64 72 60 72 Q56 72 53 66 Z" fill="${O}"/>`;
  // mond
  const my = k.pig ? 82 : 78;
  if (frog) {
    if (mood === 'angry' || mood === 'sad' || mood === 'worried') s += `<path d="M42 78 Q60 68 78 78" fill="none"/>`;
    else s += `<path d="M38 66 Q60 ${mood === 'ok' ? 80 : 90} 82 66 ${mood === 'ok' ? '' : 'Z'}" fill="${mood === 'ok' ? 'none' : '#c0392b'}"/>`;
  } else if (mood === 'happy' || mood === 'love') s += `<path d="M50 ${my - 1} Q60 ${my + 14} 70 ${my - 1} Z" fill="#c0392b"/><path d="M55 ${my + 5} Q60 ${my + 9} 65 ${my + 5}" fill="#ff8fab" stroke="none"/>`;
  else if (mood === 'ok') s += `<path d="M52 ${my} Q56 ${my + 5} 60 ${my} Q64 ${my + 5} 68 ${my}" fill="none" stroke-width="3"/>`;
  else s += `<path d="M52 ${my + 7} Q60 ${my - 1} 68 ${my + 7}" fill="none"/>`;
  if (k.whisk) s += `<path d="M42 74 L24 70 M42 78 L24 80 M78 74 L96 70 M78 78 L96 80" fill="none" stroke-width="2"/>`;
  // accessoires
  if (c.acc === 'bow') s += `<g transform="translate(90 26)"><path d="M0 0 L-14 -10 L-14 10 Z M0 0 L14 -10 L14 10 Z" fill="#ff5d8f"/><circle r="5" fill="#ff5d8f"/></g>`;
  if (c.acc === 'glasses' && !frog) s += `<g fill="none" stroke-width="3.5"><circle cx="${ex1}" cy="${ey}" r="13"/><circle cx="${ex2}" cy="${ey}" r="13"/><path d="M${ex1 + 13} ${ey} H${ex2 - 13}"/></g>`;
  if (c.acc === 'cap') s += `<path d="M24 36 Q26 10 60 10 Q94 10 96 36 Z" fill="${c.cap}"/><path d="M60 36 H104 Q110 42 100 44 H60 Z" fill="${c.cap}"/><circle cx="60" cy="10" r="4" fill="${c.cap}"/>`;
  if (c.role === 'cook') s += `<path d="M34 32 Q20 32 21 17 Q22 2 38 5 Q42 -14 60 -14 Q78 -14 82 5 Q98 2 99 17 Q100 32 86 32 Z" fill="#fff"/><rect x="33" y="26" width="54" height="14" rx="5" fill="#fff"/><path d="M48 8 Q50 18 48 26 M72 8 Q70 18 72 26" fill="none" stroke-width="2" opacity=".4"/>`;
  return svg(s, '0 -44 120 224');
}
