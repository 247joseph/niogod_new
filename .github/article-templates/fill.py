#!/usr/bin/env python3
"""Fill niogod article templates with article JSON -> static HTML pages.
Usage: python3 .github/article-templates/fill.py <json_dir> <YYYY-MM-DD>
Each JSON: {slug, kind_en, kind_de, category_en, category_de,
 en:{title,description,teaser,body_html}, de:{...}}"""
import json, sys, os, re, glob, html
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TPL = {l: open(os.path.join(os.path.dirname(__file__), f'{l}.html'), encoding='utf-8').read() for l in ('en', 'de')}
DOMAIN = 'https://niogod.com'
BAD = ['—', '&mdash;', '– ']  # no em dashes
L = {
 'en': dict(dir='insights', root='../', pageroot='../', back='&larr; All insights', cta_h='Talk to niogod&trade;',
            cta='Planning engineering capacity in DACH? Book a 30-minute consultation with the niogod&trade; team.',
            cta_btn='Book consultation', author='Founder &amp; CEO', idx_title='Insights', idx_sub='// Daily briefings for DACH engineering leaders',
            read='Read &rarr;', day='Briefings of', count='articles'),
 'de': dict(dir='de/insights', root='../../', pageroot='../', back='&larr; Alle Insights', cta_h='Sprechen Sie mit niogod&trade;',
            cta='Sie planen Engineering-Kapazit&auml;t in DACH? Vereinbaren Sie eine 30-min&uuml;tige Konsultation mit dem niogod&trade;-Team.',
            cta_btn='Konsultation vereinbaren', author='Gr&uuml;nder &amp; CEO', idx_title='Insights', idx_sub='// T&auml;gliche Briefings f&uuml;r Engineering-Verantwortliche in DACH',
            read='Lesen &rarr;', day='Briefings vom', count='Artikel'),
}
def esc(s): return html.escape(s, quote=True)
def check(a):
    for k in ('slug','kind_en','kind_de','category_en','category_de'): assert a.get(k), k
    assert re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', a['slug']), a['slug']
    for l in ('en','de'):
        for k in ('title','description','teaser','body_html'): assert a[l].get(k), (a['slug'], l, k)
    blob = json.dumps(a, ensure_ascii=False)
    for b in BAD: assert b not in blob, (a['slug'], 'em dash')
    assert '<script' not in blob.lower(), a['slug']
def langswitch(lang, slug_en, slug_de):
    if lang == 'en':
        return f'<div class="lang-switcher"><a href="#" class="active">EN</a><span>|</span><a href="{slug_de}" class="lang-link" data-lang="de">DE</a></div>'
    return f'<div class="lang-switcher"><a href="{slug_en}" class="lang-link" data-lang="en">EN</a><span>|</span><a href="#" class="active">DE</a></div>'
def page(lang, title, desc, canon, url_en, url_de, ls, article, jsonld=''):
    c = L[lang]
    s = TPL[lang]
    for k, v in {'{{TITLE}}': esc(title), '{{DESC}}': esc(desc), '{{CANONICAL}}': canon, '{{URL_EN}}': url_en, '{{URL_DE}}': url_de,
                 '{{ROOT}}': c['root'], '{{PAGEROOT}}': c['pageroot'], '{{LANGSWITCH}}': ls, '{{JSONLD}}': jsonld, '{{ARTICLE}}': article}.items():
        s = s.replace(k, v)
    return s
def article_page(a, lang, date):
    c, d = L[lang], a[lang]
    url_en, url_de = f"{DOMAIN}/insights/{a['slug']}.html", f"{DOMAIN}/de/insights/{a['slug']}.html"
    canon = url_en if lang == 'en' else url_de
    ls = langswitch(lang, f"../../insights/{a['slug']}.html", f"../de/insights/{a['slug']}.html")
    ld = {"@context":"https://schema.org","@type":"Article","headline":d['title'],"description":d['description'],"datePublished":date,
          "inLanguage":lang,"author":{"@type":"Person","name":"Joseph Jose"},"publisher":{"@type":"Organization","name":"niogod™","url":DOMAIN},
          "mainEntityOfPage":canon}
    jsonld = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>'
    art = f'''    <!-- Article Header -->
    <section class="page-header" style="background: linear-gradient(180deg, #fdfbfd 0%, #eee8 100%); padding-bottom: 40px;">
        <div class="container" style="max-width: 800px;">
            <div class="blog-meta" style="justify-content: center; display: flex; gap: 10px; margin-bottom: 20px;">
                <span style="font-family: var(--font-mono);">// {esc(a['kind_'+lang])}</span> &middot; <span>{esc(a['category_'+lang])}</span> &middot; <span>{date}</span>
            </div>
            <h1 class="page-title" style="font-size: 2.5rem;">{esc(d['title'])}</h1>
            <div style="margin-top: 30px; display: flex; align-items: center; justify-content: center; gap: 15px;">
                <div class="team-avatar" style="width: 50px; height: 50px; margin: 0; font-size: 1rem; display:flex; align-items:center; justify-content:center; background:#e0d4fc;">JJ</div>
                <div style="text-align: left;">
                    <div style="font-weight: 700;">Joseph Jose</div>
                    <div style="font-size: 0.8rem; color: #666;">{c['author']}, niogod&trade;</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Article Body -->
    <section class="text-content-section">
        <div class="container text-content" style="max-width: 700px; margin: 0 auto; font-size: 1.1rem; line-height: 1.8;">
{d['body_html']}
            <div style="background: #f9f9ff; padding: 25px; border-left: 4px solid var(--primary-color); margin: 30px 0; border-radius: 4px;">
                <h4 style="margin-top:0;">{c['cta_h']}</h4>
                <p>{c['cta']}</p>
                <a href="../contact.html" class="btn btn-primary">{c['cta_btn']}</a>
            </div>
            <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #eee;">
                <a href="index.html" class="btn btn-outline">{c['back']}</a>
            </div>
        </div>
    </section>
'''
    return page(lang, d['title'], d['description'], canon, url_en, url_de, ls, art, jsonld)
def card(lang, a, href):
    d = a[lang]
    return f'''                    <article class="bento-card span-4"><div>
                        <div class="icon-header" style="font-family: var(--font-mono); color: var(--primary-color); font-size: 0.85rem;">// {esc(a['kind_'+lang])} &middot; {esc(a['category_'+lang])}</div>
                        <h3>{esc(d['title'])}</h3>
                        <p>{esc(d['teaser'])}</p>
                        <a href="{href}" class="sample-link" style="margin-top: 12px; display: inline-block;">{L[lang]['read']}</a>
                    </div></article>'''
def grid_section(title, sub, cards):
    return f'''    <section class="page-header" style="padding-bottom: 20px;">
        <div class="container text-center"><h1 class="page-title">{title}</h1><p class="section-subtitle" style="font-family: var(--font-mono);">{sub}</p></div>
    </section>
    <section style="padding: 40px 0 80px;"><div class="container"><div class="bento-grid">
{chr(10).join(cards)}
    </div></div></section>
'''
def write(path, s):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8').write(s)
def main(jdir, date):
    arts = [json.load(open(f, encoding='utf-8')) for f in sorted(glob.glob(os.path.join(jdir, '*.json')))]
    seen = set()
    for a in arts:
        check(a); assert a['slug'] not in seen, a['slug']; seen.add(a['slug'])
        assert not os.path.exists(os.path.join(REPO, 'insights', a['slug'] + '.html')), ('slug exists', a['slug'])
    for a in arts:
        for lang in ('en', 'de'):
            write(os.path.join(REPO, L[lang]['dir'], a['slug'] + '.html'), article_page(a, lang, date))
    # day archive (cards only stored as HTML; index rebuilt from day pages)
    for lang in ('en', 'de'):
        c = L[lang]
        cards = [card(lang, a, a['slug'] + '.html') for a in arts]
        sec = grid_section(f"{c['day']} {date}", f"// {len(arts)} {c['count']}", cards)
        sec = f'<!-- DAY:{date}:{len(arts)} -->\n' + sec
        url_en, url_de = f"{DOMAIN}/insights/day-{date}.html", f"{DOMAIN}/de/insights/day-{date}.html"
        ls = langswitch(lang, f"../../insights/day-{date}.html", f"../de/insights/day-{date}.html")
        write(os.path.join(REPO, c['dir'], f'day-{date}.html'),
              page(lang, f"{c['day']} {date}", f"niogod Intelligence {date}", url_en if lang=='en' else url_de, url_en, url_de, ls, sec))
        # index: latest day cards + list of all days
        days = sorted(glob.glob(os.path.join(REPO, c['dir'], 'day-*.html')), reverse=True)
        links = []
        for dp in days:
            dd = os.path.basename(dp)[4:-5]
            m = re.search(r'<!-- DAY:[^:]+:(\d+) -->', open(dp, encoding='utf-8').read())
            n = m.group(1) if m else '?'
            links.append(f'<li style="margin:6px 0;"><a href="day-{dd}.html" class="sample-link">{c["day"]} {dd}</a> <span style="font-family: var(--font-mono); color: var(--text-secondary);">({n} {c["count"]})</span></li>')
        idx = grid_section(c['idx_title'], c['idx_sub'], cards) + f'''    <section style="padding: 0 0 80px;"><div class="container" style="max-width:700px;"><h2 class="section-title">Archive</h2><ul>
{chr(10).join(links)}
    </ul></div></section>
'''
        u_en, u_de = f"{DOMAIN}/insights/index.html", f"{DOMAIN}/de/insights/index.html"
        write(os.path.join(REPO, c['dir'], 'index.html'),
              page(lang, c['idx_title'], 'niogod Intelligence: briefings on remote engineering pods, AÜG, Werkvertrag and DACH deep tech.',
                   u_en if lang=='en' else u_de, u_en, u_de, langswitch(lang, '../../insights/index.html', '../de/insights/index.html'), idx))
    # one-time link from blog.html pages
    for bp, href, label in (('blog.html', 'insights/index.html', 'Daily insights archive &rarr;'), ('de/blog.html', 'insights/index.html', 'T&auml;gliches Insights-Archiv &rarr;')):
        p = os.path.join(REPO, bp); s = open(p, encoding='utf-8').read()
        if 'INSIGHTS-LINK' not in s:
            block = f'''        <!-- INSIGHTS-LINK -->
        <section style="padding: 40px 0; text-align:center;"><div class="container"><a href="{href}" class="btn btn-primary">{label}</a></div></section>
'''
            s = s.replace('        <!-- Briefings -->', block + '        <!-- Briefings -->', 1)
            assert 'INSIGHTS-LINK' in s
            open(p, 'w', encoding='utf-8').write(s)
    print(f'built {len(arts)} articles x 2 languages for {date}')
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
