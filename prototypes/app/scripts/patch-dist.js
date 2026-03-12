import fs from 'fs';
const p = 'c:/Users/Katarzyna/Documents/Vincenzo/Roundrushv2/prototypes/app/dist/assets/index-BLmS6qZW.js';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/activeTab:"tasks"/g, 'activeTab:"overview"');
s = s.replace(/a\.detail\.activeTab="acceptance-laws"/g, 'a.detail.activeTab="overview"');
fs.writeFileSync(p, s, 'utf8');
console.log('patched dist file');
