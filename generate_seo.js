const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://niogod.com';
const ROOT_DIR = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.git', '.github', 'assets', 'tests'];

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                getHtmlFiles(filePath, fileList);
            }
        } else {
            if (path.extname(file) === '.html') {
                // Convert absolute path to relative path derived from ROOT_DIR
                const relativePath = path.relative(ROOT_DIR, filePath);
                fileList.push(relativePath);
            }
        }
    });
    return fileList;
}

function generateSitemap() {
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    const date = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    htmlFiles.forEach(file => {
        // Handle index.html as root
        let urlPath = file.replace(/\\/g, '/'); // Ensure forward slashes
        if (urlPath === 'index.html') {
            urlPath = '';
        } else if (urlPath.endsWith('/index.html')) {
            urlPath = urlPath.replace('/index.html', '/');
        }

        const url = `${DOMAIN}/${urlPath}`;
        
        // Priority logic
        let priority = '0.8';
        if (urlPath === '') priority = '1.0';
        else if (urlPath.includes('contact') || urlPath.includes('pricing')) priority = '0.9';

        sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;

    fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemap);
    console.log('sitemap.xml generated.');
}

function generateRobots() {
    const robots = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;
    fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robots);
    console.log('robots.txt generated.');
}

generateSitemap();
generateRobots();
