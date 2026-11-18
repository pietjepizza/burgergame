
export const O = '#4a2c17';
export const svg = (inner, vb = '0 0 100 100') =>
  `<svg class="art" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg"><g stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
export const shine = d => `<path d="${d}" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>`;
