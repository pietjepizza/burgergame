export const SAVE_KEY = 'tijnsburger-tycoon';
export const fresh = () => ({ money: 1000, stars: 3, served: 0, level: 0, tables: 2,
  st: { grill: { cooks: 1, speed: 0 } }, waiters: 1, cashiers: 0, skates: 0, ads: 0, decor: {}, sound: true, seenHelp: false });
export let S;
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(SAVE_KEY)) || {}); } catch { S = fresh(); }
export const save = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch {} };


export function resetGame() {
  const snd = S.sound;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ ...fresh(), sound: snd })); } catch {}
  location.reload();
}
