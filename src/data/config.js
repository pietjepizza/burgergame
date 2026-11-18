export const FOODS = {
  burger:  { price: 250, time: 4,   st: 'grill' },
  hotdog:  { price: 200, time: 3,   st: 'grill' },
  cola:    { price: 100, time: 1.5, st: 'drinks' },
  shake:   { price: 250, time: 2.5, st: 'drinks' },
  fries:   { price: 150, time: 3,   st: 'fryer' },
  chicken: { price: 350, time: 4.5, st: 'fryer' },
  pizza:   { price: 300, time: 5,   st: 'oven' },
  ice:     { price: 150, time: 2,   st: 'dessert' },
  donut:   { price: 100, time: 2,   st: 'dessert' },
  taco:    { price: 200, time: 3,   st: 'taco' },
  wrap:    { price: 300, time: 3.5, st: 'taco' },
};
// positie (linksboven) in de wereld; cost = prijs om te kopen
export const STATIONS = {
  grill:   { x: 18,  y: 210, cost: 0 },
  drinks:  { x: 138, y: 210, cost: 2500 },
  fryer:   { x: 258, y: 210, cost: 6000 },
  oven:    { x: 18,  y: 420, cost: 12000 },
  dessert: { x: 138, y: 420, cost: 20000 },
  taco:    { x: 258, y: 420, cost: 35000 },
};
export const ST_KEYS = Object.keys(STATIONS);
// tafelplekken (midden van tafel) per uitbreiding
export const SLOTS = [[552, 270], [696, 270], [552, 410], [696, 410], [838, 270], [838, 410], [552, 545], [696, 545], [838, 545]];
export const LEVEL_SLOTS = [4, 6, 9];
export const LEVEL_COST = [0, 15000, 40000];
export const ZONES = [null, { x: 772, y: 186, w: 128, h: 298 }, { x: 486, y: 486, w: 414, h: 110 }];
export const DECOR = {
  plant:    { cost: 1000,  x: 394, y: 112 },
  clock:    { cost: 1500,  x: 598, y: 30 },
  balloons: { cost: 2000,  x: 640, y: 18 },
  picture:  { cost: 3000,  x: 830, y: 34 },
  neon:     { cost: 4500,  x: 400, y: 36 },
  fish:     { cost: 6000,  x: 600, y: 112 },
  trophy:   { cost: 9000,  x: 652, y: 112 },
  jukebox:  { cost: 14000, x: 834, y: 112 },
  teddy:    { cost: 18000, x: 478, y: 118 },
  crown:    { cost: 50000, x: 913, y: -6 },
};
export const TABLE_COST = n => Math.round(1000 * Math.pow(1.55, n - 2) / 50) * 50; // n = huidige aantal
export const COOK_COST = (st, n) => Math.round((1500 + ST_KEYS.indexOf(st) * 1500) * Math.pow(2, n - 1) / 50) * 50;
export const SPEED_COSTS = [3000, 8000, 18000];
export const WAITER_COSTS = [0, 3000, 7000, 14000, 25000];
export const CASHIER_COSTS = [6000, 18000];
export const SKATE_COSTS = [4000, 10000, 22000];
export const ADS_COSTS = [2500, 6000, 12000, 25000];
