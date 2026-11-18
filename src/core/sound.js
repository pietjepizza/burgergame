import { S } from './state.js';

export let ac;
export function tone(f, t = 0, dur = .12, type = 'square', vol = .08) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + t;
    o.type = type; o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(vol, s); g.gain.exponentialRampToValueAtTime(.001, s + dur);
    o.connect(g).connect(ac.destination); o.start(s); o.stop(s + dur);
  } catch {}
}
export const sfx = {
  tap:   () => tone(700, 0, .06, 'triangle', .12),
  ding:  () => { tone(1320, 0, .12, 'sine', .12); tone(1760, .08, .2, 'sine', .08); },
  plop:  () => { tone(500, 0, .05, 'sine', .14); tone(800, .04, .06, 'sine', .1); },
  coin:  () => { tone(988, 0, .08); tone(1319, .07, .15); },
  kaching: () => { [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * .07, .18, 'triangle', .14)); },
  wrong: () => { tone(240, 0, .18, 'sawtooth', .06); tone(190, .14, .24, 'sawtooth', .06); },
  angry: () => { tone(200, 0, .3, 'sawtooth', .06); tone(140, .25, .4, 'sawtooth', .06); },
  hello: () => { tone(523, 0, .1, 'sine', .14); tone(784, .1, .15, 'sine', .14); },
  buy:   () => { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .08, .2, 'triangle', .12)); },
};
