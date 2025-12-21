document.addEventListener('DOMContentLoaded', () => {
    // FAQs, Mobile Menu, and Sticky Header logic

    // 1. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-center');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            }
        });
    });

    // 4. Internationalization (i18n) Logic
    const userLang = navigator.language || navigator.userLanguage;
    const isGermanBrowser = userLang.startsWith('de');
    const hasLangPreference = localStorage.getItem('niogod_lang');
    const currentPath = window.location.pathname;

    // Check if we are currently in the /de/ directory
    // Adjusted check for local file system structures where path might end in /de/index.html
    const isInGermanSection = currentPath.includes('/de/');

    // Auto-redirect logic (First Visit Only)
    if (!hasLangPreference && isGermanBrowser && !isInGermanSection) {
        // User has German browser, no preference set, and is on English page -> Redirect to German
        // We need to map the current English page to its German equivalent
        const pageName = currentPath.split('/').pop() || 'index.html';

        // Handle root path case properly
        if (pageName === '' || pageName === '/') {
            window.location.href = 'de/index.html';
        } else {
            window.location.href = 'de/' + pageName;
        }

        // We do NOT set preference here to allow them to switch back manually if they want
    }

    // Language Switcher Click Event
    const langLinks = document.querySelectorAll('.lang-link');
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Store preference when user MANUALLY clicks a language switcher
            const targetLang = link.getAttribute('data-lang'); // 'en' or 'de'
            localStorage.setItem('niogod_lang', targetLang);
        });
    });

    // Handle "Home" Logo Link Correction relative to language
    const logoLink = document.querySelector('.logo');
    if (logoLink && isInGermanSection) {
        logoLink.setAttribute('href', 'index.html'); // Ensure it stays in /de/
    }

    // 5. Contact Form Submission (Google Apps Script)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formStatus = document.getElementById('form-status');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Optimistic UI: Show success immediately
            formStatus.innerText = isInGermanSection ? 'Nachricht erfolgreich gesendet!' : 'Message sent successfully!';
            formStatus.style.color = 'green';
            formStatus.style.display = 'block';

            // Capture data before resetting
            const formData = new FormData(this);
            const formElement = this; // reference for resetting

            // Clear form immediately for "fast" feel
            formElement.reset();

            // Send in background ("Fire and Forget" from user perspective)
            fetch('https://script.google.com/macros/s/AKfycbzn6xOG0P1uKLwoL4wZ5DD-2Zkot30-sTFEhMyEmH5CVZb5BCo4vEXsa0imj63qMd6n/exec', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    // We assume success in optimistic UI, but check if we need to log anything
                    // console.log("Backend confirmed receipt");
                })
                .catch(error => {
                    // Only interrupt the user if something actually went wrong
                    console.error('Error:', error);
                    formStatus.innerText = isInGermanSection ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Error sending message. Please try again.';
                    formStatus.style.color = 'red';
                    // Restore data? Complex without local storage, but simple error msg is standard.
                })
                .finally(() => {
                    // Hide status after 5 seconds regardless of backend time
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                });
        });
    }

    // 6. Subscribe Form Submission
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const input = this.querySelector('input[name="email"]');
            const originalBtnText = submitBtn.innerText;
            const originalBtnBg = submitBtn.style.background; // save original style

            // Optimistic UI: Show success immediately
            submitBtn.innerText = isInGermanSection ? 'Abonniert!' : 'Subscribed!';
            submitBtn.style.background = '#4CAF50'; // Green success feedback

            const formData = new FormData(this);
            formData.append('form_type', 'subscription');

            // Clear input immediately
            input.value = '';

            // Send in background
            fetch('https://script.google.com/macros/s/AKfycbzn6xOG0P1uKLwoL4wZ5DD-2Zkot30-sTFEhMyEmH5CVZb5BCo4vEXsa0imj63qMd6n/exec', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    // console.log("Backend confirmed subscription");
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Revert UI to error state if it fails
                    submitBtn.innerText = isInGermanSection ? 'Fehler' : 'Error';
                    submitBtn.style.background = '#f44336'; // Red error feedback
                })
                .finally(() => {
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalBtnText;
                        submitBtn.style.background = originalBtnBg;
                    }, 3000);
                });
        });
    }

    // 7. Video Widget Logic (Sound Toggle & Close)
    const videoWidget = document.getElementById('video-widget');
    const closeBtn = document.getElementById('close-video');
    const video = document.getElementById('testimonial-video');
    const soundToggleBtn = document.getElementById('sound-toggle');
    const muteIcon = document.getElementById('mute-icon');
    const unmuteIcon = document.getElementById('unmute-icon');

    if (videoWidget && video) {
        // Ensure default state is unmuted for attempt
        video.muted = false;

        // Close Button Logic
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent widget click if any

                // Explicitly stop video/audio first
                video.pause();
                video.currentTime = 0;
                video.muted = true; // Double safety

                videoWidget.style.opacity = '0';
                videoWidget.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    videoWidget.remove();
                }, 300);
            });
        }

        // Sound Toggle Logic
        if (soundToggleBtn) {
            soundToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                updateIcons();
            });
        }

        function updateIcons() {
            if (video.muted) {
                // Show Muted Icon (meaning audio is OFF)
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
            } else {
                // Show Unmuted Icon (meaning audio is ON)
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
            }
        }

        // Autoplay Logic
        // We attempt to play UNMUTED first.
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                // If browser allowed unmuted, great. If browser forced mute, video.muted will be true? 
                // Actually, if we set video.muted=false above, and browser blocks unmuted play, the promise usually REJECTS.
                // It doesn't silently switch to muted.
                updateIcons();
            }).catch(error => {
                console.log("Autoplay unmuted prevented. Fallback to muted.");
                // Fallback: Mute and play
                video.muted = true;
                video.play();
                updateIcons();
            });
        }
    }

    // 8. Cookie Consent Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        // Check if user has already accepted
        const hasAccepted = localStorage.getItem('cookieConsent');

        if (!hasAccepted) {
            // Show banner
            cookieBanner.style.display = 'block';
        }

        acceptCookiesBtn.addEventListener('click', () => {
            // Save preference
            localStorage.setItem('cookieConsent', 'true');
            // Hide banner with animation
            cookieBanner.style.opacity = '0';
            cookieBanner.style.transform = 'translateY(20px)';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 500);
        });
    }
});
