document.addEventListener('DOMContentLoaded', function () {
    // 1. Sound Toggle Logic
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', function () {
            const video = document.getElementById('testimonial-video');
            const icon = this.querySelector('i');

            if (video && icon) {
                if (video.muted) {
                    video.muted = false;
                    icon.classList.remove('fa-volume-xmark');
                    icon.classList.add('fa-volume-high');
                } else {
                    video.muted = true;
                    icon.classList.remove('fa-volume-high');
                    icon.classList.add('fa-volume-xmark');
                }
            }
        });
    }

    // 2. Close Widget Logic
    const closeBtn = document.querySelector('.close-video-widget');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const widget = document.getElementById('video-widget');
            if (widget) {
                widget.style.display = 'none';
            }
        });
    }
});
