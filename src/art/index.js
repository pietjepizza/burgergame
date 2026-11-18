import { DECOR_ART } from './decor.js';
import { FOOD_ART } from './food.js';
import { ICONS } from './icons.js';
import { STATION_ART } from './stations.js';

export const art = k => (FOOD_ART[k] || DECOR_ART[k] || ICONS[k] || STATION_ART[k])();
export const ic = (k, cls = 'ic') => `<div class="${cls}">${art(k)}</div>`;
