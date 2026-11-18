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
// keukens: cost = prijs om te kopen (de plek staat in layout.js)
export const STATIONS = {
  grill:   { cost: 0 },
  drinks:  { cost: 2500 },
  fryer:   { cost: 6000 },
  oven:    { cost: 12000 },
  dessert: { cost: 20000 },
  taco:    { cost: 35000 },
};
export const ST_KEYS = Object.keys(STATIONS);
// aantal tafelplekken per uitbreiding (de plekken staan in layout.js)
export const LEVEL_SLOTS = [4, 6, 9];
export const LEVEL_COST = [0, 15000, 40000];
// versiering: prijs (de plek staat in layout.js)
export const DECOR = {
  plant: { cost: 1000 },
  clock: { cost: 1500 },
  balloons: { cost: 2000 },
  picture: { cost: 3000 },
  neon: { cost: 4500 },
  fish: { cost: 6000 },
  trophy: { cost: 9000 },
  jukebox: { cost: 14000 },
  teddy: { cost: 18000 },
  crown: { cost: 50000 },
};
export const TABLE_COST = n => Math.round(1000 * Math.pow(1.55, n - 2) / 50) * 50; // n = huidige aantal
export const COOK_COST = (st, n) => Math.round((1500 + ST_KEYS.indexOf(st) * 1500) * Math.pow(2, n - 1) / 50) * 50;
export const SPEED_COSTS = [3000, 8000, 18000];
export const WAITER_COSTS = [0, 3000, 7000, 14000, 25000];
export const CASHIER_COSTS = [6000, 18000];
export const SKATE_COSTS = [4000, 10000, 22000];
export const ADS_COSTS = [2500, 6000, 12000, 25000];
