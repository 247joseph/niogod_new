const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'file://' + path.resolve(__dirname, '../index.html'); // Verify local index.html
const OUTPUT_DIR = path.resolve(__dirname, 'screenshots');

// Devices to test
const TEST_DEVICES = [
    { name: 'iPhone 14', ...devices['iPhone 14'] },
    { name: 'Pixel 7', ...devices['Pixel 7'] },
    { name: 'iPad Mini', ...devices['iPad Mini'] }
];

(async () => {
    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    console.log('📱 Starting Global Mobile Visual Audit...');
    const browser = await chromium.launch();

    // 1. Find all HTML files
    const rootPath = path.resolve(__dirname, '../');
    const dePath = path.resolve(__dirname, '../de');

    const rootFiles = fs.readdirSync(rootPath).filter(f => f.endsWith('.html'));
    const deFiles = fs.existsSync(dePath)
        ? fs.readdirSync(dePath).filter(f => f.endsWith('.html')).map(f => 'de/' + f)
        : [];

    const allFiles = [...rootFiles, ...deFiles];

    console.log(`Found ${allFiles.length} pages to audit across English and German.`);

    for (const file of allFiles) {
        console.log(`\n📄 Checking: ${file}`);
        const fileUrl = 'file://' + path.join(rootPath, file);

        for (const device of TEST_DEVICES) {
            const context = await browser.newContext({
                ...device,
                deviceScaleFactor: 2
            });
            const page = await context.newPage();

            try {
                await page.goto(fileUrl);

                // Check Overflow
                const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
                const viewportWidth = await page.viewportSize().width;

                if (scrollWidth > viewportWidth) {
                    console.error(`   ❌ [${device.name}] OVERFLOW: ${scrollWidth}px > ${viewportWidth}px`);
                }

                // Screenshot (Saving iPhone 14 for all pages to verify layout)
                if (device.name === 'iPhone 14') {
                    const safeName = file.replace(/[\/\\]/g, '_').replace('.html', '');
                    await page.screenshot({
                        path: `${OUTPUT_DIR}/${safeName}_mobile.png`,
                        fullPage: true
                    });
                }

            } catch (e) {
                console.error(`   Error checking ${device.name}:`, e.message);
            }
            await context.close();
        }
    }

    await browser.close();
    console.log(`\n✅ Audit Complete. Screenshots saved to tests/screenshots/`);
})();
