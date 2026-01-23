import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [192, 512];
const inputPath = join(__dirname, '../public/cc_logo.svg');

async function generateIcons() {
  for (const size of sizes) {
    const outputPath = join(__dirname, `../public/pwa-${size}x${size}.png`);
    
    await sharp(inputPath)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated: pwa-${size}x${size}.png`);
  }
  
  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
