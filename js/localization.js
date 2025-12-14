
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    
    // Check local storage or default to English
    const currentLang = localStorage.getItem('niogod-lang') || 'en';
    setLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = document.body.classList.contains('lang-de') ? 'en' : 'de';
            setLanguage(newLang);
        });
    }
});

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
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        // Simple text toggle or styling
        // Assuming the toggle is a single link/button
        toggle.innerHTML = lang === 'de' ? 'DE | <span style="opacity:0.5">EN</span>' : 'EN | <span style="opacity:0.5">DE</span>';
    }
}
