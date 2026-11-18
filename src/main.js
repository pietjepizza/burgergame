import './styles.css';
import { art } from './art/index.js';
import { sfx } from './core/sound.js';
import { S, save } from './core/state.js';
import { $ } from './core/util.js';
import { help, openShop } from './game/shop.js';
import { update } from './game/sim.js';
import { G, buildWorld, fit } from './game/world.js';

document.querySelectorAll('[data-art]').forEach(e => e.innerHTML = art(e.dataset.art));
$('cartIc').innerHTML = art('cart');
const setSoundIcon = () => $('soundBtn').innerHTML = art(S.sound ? 'soundOn' : 'soundOff');
setSoundIcon();
$('soundBtn').onclick = () => { S.sound = !S.sound; setSoundIcon(); save(); sfx.tap(); };
$('shopBtn').onclick = () => { sfx.tap(); openShop(); };
$('top').querySelector('.logo').onclick = help;

fit(); buildWorld(); fit();
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 300));
if (window.visualViewport) visualViewport.addEventListener('resize', fit);
if (document.fonts) document.fonts.ready.then(fit);
setInterval(save, 5000);

G.last = performance.now();
function loop(now) {
  const dt = Math.min(.1, (now - G.last) / 1000); G.last = now;
  if (!G.paused) update(dt);
  requestAnimationFrame(loop);
}
help();
requestAnimationFrame(loop);
