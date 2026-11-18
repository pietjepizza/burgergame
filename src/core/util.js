export const $ = id => document.getElementById(id);
export const fmt = c => '€' + Math.floor(c / 100) + (c % 100 ? ',' + String(c % 100).padStart(2, '0') : '');
export const pick = a => a[Math.floor(Math.random() * a.length)];
