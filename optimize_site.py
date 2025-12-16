import os
import re

ROOT_DIR = "."
DEFER_SCRIPTS_KEYWORDS = [
    'vendor-waypoint', 'vendor-wow', 'vendor-counterup',
    'vendor-sal', 'vendor-slick', 'vendor-text-type',
    'vendor-prism', 'vendor-jquery.style.swicher',
    'vendor-bootstrap-select', 'vendor-backto-top',
    'vendor-js.cookie', 'vendor-jquery-one-page-nav',
    'vendor-bootstrap', 'js-main.js', 'video-widget.js'
]

def add_defer_to_script(match):
    tag = match.group(0)
    if 'defer' in tag or 'async' in tag:
        return tag
    if any(k in tag for k in DEFER_SCRIPTS_KEYWORDS):
        return tag.replace('<script ', '<script defer ')
    return tag

def add_lazy_loading(match):
    tag = match.group(0)
    if 'loading=' in tag:
        return tag
    return tag.replace('<img ', '<img loading="lazy" ')

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Skipping binary/non-utf8 file: {filepath}")
        return

    original_content = content
    
    # Add defer to specific scripts
    content = re.sub(r'<script\s+[^>]*src=["\'][^"\']+["\'][^>]*>', add_defer_to_script, content, flags=re.IGNORECASE)
    
    # Add loading="lazy" to all images
    content = re.sub(r'<img\s+[^>]*>', add_lazy_loading, content, flags=re.IGNORECASE)

    if content != original_content:
        print(f"Optimizing {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(".html"):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
