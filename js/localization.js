
document.addEventListener('DOMContentLoaded', () => {
    const langToggles = document.querySelectorAll('.lang-toggle-btn');

    // Check local storage
    const storedLang = localStorage.getItem('niogod-lang');

    if (storedLang) {
        setLanguage(storedLang);
    } else {
        // IP-based detection
        detectLanguageFromIP();
    }

    langToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = document.body.classList.contains('lang-de') ? 'en' : 'de';
            setLanguage(newLang);
        });
    });
});

async function detectLanguageFromIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;
        // DACH region defaults to German
        if (['DE', 'AT', 'CH'].includes(country)) {
            setLanguage('de');
        } else {
            setLanguage('en');
        }
    } catch (error) {
        console.log('IP detection failed, defaulting to English', error);
        setLanguage('en');
    }
}

function setLanguage(lang) {
    if (lang === 'de') {
        document.body.classList.add('lang-de');
        document.body.classList.remove('lang-en');
    } else {
        document.body.classList.remove('lang-de');
        document.body.classList.add('lang-en');
    }
    localStorage.setItem('niogod-lang', lang);
    updateToggleText(lang);
}

function updateToggleText(lang) {
    const toggles = document.querySelectorAll('.lang-toggle-btn');
    toggles.forEach(toggle => {
        // Simple text toggle or styling
        toggle.innerHTML = lang === 'de' ? 'DE | <span style="opacity:0.5">EN</span>' : 'EN | <span style="opacity:0.5">DE</span>';
    });
}
