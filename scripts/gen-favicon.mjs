import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.resolve(__dirname, '../src/assets/logo.svg');
const outDir = path.resolve(__dirname, '../public');

// Generate apple-touch-icon (180x180 for iOS) with dark background
const svgBuffer = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="180" height="180">
  <rect width="100" height="100" rx="22" fill="#0a0814"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="30" stroke="url(#g)" stroke-width="7" fill="none"/>
  <circle cx="80" cy="50" r="7" fill="#a855f7"/>
  <rect x="44" y="28" width="12" height="44" rx="4" fill="url(#g)"/>
</svg>`;

sharp(Buffer.from(svgBuffer))
  .resize(180, 180)
  .png()
  .toFile(path.join(outDir, 'apple-touch-icon.png'))
  .then(() => {
    console.log('✅ apple-touch-icon.png generated');
    return sharp(Buffer.from(svgBuffer)).resize(32, 32).png().toFile(path.join(outDir, 'favicon-32.png'));
  })
  .then(() => console.log('✅ favicon-32.png generated'))
  .catch(err => console.error('❌', err));
