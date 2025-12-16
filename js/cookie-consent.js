
document.addEventListener("DOMContentLoaded", function () {
    const cookieName = "niogod_consent_v1";
    const gaId = "G-D6536TQ5TZ";

    // CSS for Blocking Banner
    const styles = `
        #cookie-overlay {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 999999;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            opacity: 0;
            animation: fadeIn 0.4s forwards;
            pointer-events: none;
        }
        .cookie-modal {
            background: #141414;
            border: 1px solid #2a2a2a;
            padding: 32px;
            max-width: 440px;
            width: 90vw;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8);
            pointer-events: auto;
        }
        .cookie-modal h3 {
            color: #fff;
            margin-bottom: 12px;
            font-size: 1.25rem;
            font-weight: 600;
        }
        .cookie-modal p {
            color: #b0b0b0;
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 24px;
        }
        .cookie-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
        }
        .btn-accept {
            background: #805AF5;
            color: white;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        .btn-accept:hover {
            background: #9b7bf7;
            transform: translateY(-1px);
        }
        .btn-link {
            background: transparent;
            color: #999;
            border: 1px solid #333;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        .btn-link:hover {
            border-color: #555;
            color: #fff;
        }
        @keyframes fadeIn { to { opacity: 1; } }
        
        /* Mobile: Center at bottom */
        @media (max-width: 576px) {
            #cookie-overlay {
                bottom: 20px;
                right: 0;
                left: 0;
                justify-content: center;
            }
            .cookie-modal {
                width: 92%;
                margin: 0 auto;
            }
        }
        
        /* Language Visibility */
        body.lang-de .c-en { display: none; }
        body:not(.lang-de) .c-de { display: none; }
    `;

    function addStyles() {
        const s = document.createElement('style');
        s.innerHTML = styles;
        document.head.appendChild(s);
    }

    function getCookie(name) {
        const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value + ";path=/;SameSite=Lax";
    }

    function loadAnalytics() {
        // Dynamically load GA
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', gaId);

        console.log("Analytics Loaded via Consent Manager");
    }

    function showBanner() {
        addStyles();
        const div = document.createElement('div');
        div.id = 'cookie-overlay';
        div.innerHTML = `
            <div class="cookie-modal">
                <div class="c-en">
                    <h3>Compliance Check</h3>
                    <p>We use cookies to ensure ensuring legal compliance and analyzing traffic. External scripts (Google Analytics) are blocked until you accept.</p>
                </div>
                <div class="c-de">
                    <h3>Compliance Check</h3>
                    <p>Wir verwenden Cookies zur Sicherstellung der Rechtssicherheit und Analyse. Externe Skripte (Google Analytics) sind blockiert, bis Sie zustimmen.</p>
                </div>
                
                <div class="cookie-actions">
                    <a href="legal.html" class="btn-link">
                        <span class="c-en">Legal Notice</span>
                        <span class="c-de">Impressum</span>
                    </a>
                    <button class="btn-accept" id="accept-cookies">
                        <span class="c-en">Accept & Continue</span>
                        <span class="c-de">Akzeptieren & Weiter</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('accept-cookies').addEventListener('click', () => {
            setCookie(cookieName, 'true', 30);
            document.getElementById('cookie-overlay').remove();
            loadAnalytics();
        });
    }

    // Main Logic
    const path = window.location.pathname;
    // index.html, or root, or /de/index.html (if applicable, but sticking to basic check)
    // Checking if filename is empty or index.html
    const isHomepage = path === '/' || path.endsWith('/') || path.endsWith('index.html');

    if (getCookie(cookieName) === 'true') {
        loadAnalytics();
    } else if (isHomepage) {
        showBanner();
    }
});
