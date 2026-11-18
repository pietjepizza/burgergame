// =====================================================================
//  INDELING VAN HET RESTAURANT
//  Er zijn twee indelingen. Het spel kiest steeds de indeling waarmee het
//  speelveld het grootst op het scherm past:
//   - liggend: keuken links, eetzaal rechts (computer, iPad liggend)
//   - staand:  keuken boven, eetzaal onder (iPad of telefoon rechtop)
//  Alle getallen zijn punten in de wereld; de wereld wordt daarna geschaald.
//  rects = [x, y, breedte, hoogte]; posities = [x, y] (linksboven, of voetpunt
//  bij figuren). Tafels (slots) zijn het midden van de tafel.
// =====================================================================

const LANDSCAPE = {
  name: 'landscape', W: 1000, H: 600,
  rects: {
    kwall: [0, 0, 380, 175], kfloor: [0, 175, 380, 425],
    dwall: [380, 0, 620, 175], dfloor: [380, 175, 620, 425],
    awning: [380, 0, 620, 26], hood: [10, 0, 360, 40],
    divider: [374, 0, 12, 600], pass: [380, 190, 58, 400],
  },
  dividerDir: 'v',
  passItem: i => [4, 6 + i * 42],
  pickup: i => [458, Math.min(560, 210 + i * 42)],
  waiterHome: i => [458, 236 + i * 64],
  windows: [[470, 34], [696, 34]],
  door: [900, 40],
  register: [905, 300],
  cashier: i => [950 - i * 40, 330],
  DOOR: [942, 182], HALL: [760, 186],
  stations: { grill: [18, 210], drinks: [138, 210], fryer: [258, 210], oven: [18, 420], dessert: [138, 420], taco: [258, 420] },
  slots: [[552, 270], [696, 270], [552, 410], [696, 410], [838, 270], [838, 410], [552, 545], [696, 545], [838, 545]],
  zones: [null, { x: 772, y: 186, w: 128, h: 298 }, { x: 486, y: 486, w: 414, h: 110 }],
  decor: {
    plant: [394, 112], clock: [598, 30], balloons: [640, 18], picture: [830, 34], neon: [400, 36],
    fish: [600, 112], trophy: [652, 112], jukebox: [834, 112], teddy: [478, 118], crown: [913, -6],
  },
};

const PORTRAIT = {
  name: 'portrait', W: 780, H: 1080,
  rects: {
    kwall: [0, 0, 780, 110], kfloor: [0, 110, 780, 360],
    dwall: [0, 478, 780, 148], dfloor: [0, 626, 780, 454],
    awning: [0, 478, 780, 26], hood: [20, 0, 740, 40],
    divider: [0, 466, 780, 12], pass: [24, 522, 450, 64],
  },
  dividerDir: 'h',
  passItem: i => [6 + i * 46, 8],
  pickup: i => [50 + Math.min(i, 8) * 46, 646],
  waiterHome: i => [160 + i * 70, 656],
  windows: [],
  door: [680, 488],
  register: [4, 650],
  cashier: i => [46 + i * 46, 684],
  DOOR: [722, 622], HALL: [500, 648],
  stations: { grill: [70, 140], drinks: [335, 140], fryer: [600, 140], oven: [70, 340], dessert: [335, 340], taco: [600, 340] },
  slots: [[215, 770], [410, 770], [215, 900], [410, 900], [610, 770], [610, 900], [215, 1030], [410, 1030], [610, 1030]],
  zones: [null, { x: 532, y: 690, w: 244, h: 274 }, { x: 130, y: 968, w: 646, h: 108 }],
  // aan de keukenmuur alleen op plekken waar geen koks staan
  decor: {
    picture: [4, 48], neon: [195, 48], fish: [262, 48], trophy: [460, 48], teddy: [527, 48],
    plant: [482, 562], clock: [490, 506], balloons: [560, 500], jukebox: [612, 562], crown: [693, 444],
  },
};

export const LAYOUTS = { landscape: LANDSCAPE, portrait: PORTRAIT };

// De huidige indeling (wordt door chooseLayout gezet)
export let L = LANDSCAPE;

// Kies de indeling die het grootste speelveld geeft voor de beschikbare ruimte.
// Geeft true terug als de indeling veranderd is.
export function chooseLayout(availW, availH) {
  const area = lay => {
    const s = Math.min(availW / lay.W, availH / lay.H);
    return s * s * lay.W * lay.H;
  };
  const best = area(PORTRAIT) > area(LANDSCAPE) * 1.05 ? PORTRAIT : LANDSCAPE;
  const changed = best !== L;
  L = best;
  return changed;
}
