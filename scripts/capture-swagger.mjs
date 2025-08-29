import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const OUT_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const url = process.env.SWAGGER_URL || 'http://localhost:3000/docs';
const outfile = path.join(OUT_DIR, 'swagger.png');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  // انتظر الصفحة لغاية ما تبني واجهة Swagger
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.swagger-ui', { timeout: 60000 });

  // افتح أول Tag (اختياري لظهور الـ endpoints بالصورة)
  await page.evaluate(() => {
    const firstTag = document.querySelector('.opblock-tag');
    if (firstTag) firstTag.click();
  });

  // مهلة قصيرة بديلة عن waitForTimeout
  await sleep(800);

  await page.screenshot({ path: outfile, fullPage: true });
  console.log('Saved:', outfile);
} finally {
  await browser.close();
}
