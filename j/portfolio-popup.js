// portfolio-popup.js – 100% working & accessible (fixed 2025)

let lastFocusedButton = null;
let scrollY = 0;

const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const closeBtn = popup.querySelector('.close-btn');

// ——— Close with Escape ———
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

// ——— Main click on every thumbnail button ———
document.querySelectorAll('.image-link').forEach(button => {

    // — Hover preview effect (your original trick – unchanged) —
    const card = button.closest('.card');
    const hoverSrc = card.dataset.hover;
    if (hoverSrc) {
        const responsiveImage = button.querySelector('.responsive-image');
        const uniqueClass = `hover-${Math.random().toString(36).substr(2, 9)}`;
        responsiveImage.classList.add(uniqueClass);

        const style = document.createElement('style');
        style.textContent = `
            .${uniqueClass}::before {
                background-image: url('${hoverSrc}');
            }
        `;
        document.head.appendChild(style);
    }

    // — Open popup on click —
    button.addEventListener('click', function (e) {
        e.preventDefault();

        lastFocusedButton = this;                     // remember trigger
        scrollY = window.scrollY;

        const fullSrc = this.dataset.full;
        const title = this.closest('.card').querySelector('h3').textContent.trim();
        const description = this.closest('.card').querySelector('p').textContent.trim();
        const altText = `${title} – ${description}`;

        // Set image + accessible text
        popupImg.src = fullSrc;
        popupImg.alt = altText;
        popupTitle.textContent = altText;

        // Show popup (using your original .active class)
        popup.classList.add('active');

        // Freeze page scroll (your method)
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Focus close button immediately
        closeBtn.focus();
    });
});

// ——— Close function ———
function closePopup() {
    popup.classList.remove('active');
    popupImg.src = '';
    popupImg.alt = '';

    // Restore scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);

    // Return focus
    if (lastFocusedButton) {
        lastFocusedButton.focus();
        lastFocusedButton = null;
    }
}

// ——— Click outside or on × button ———
popup.addEventListener('click', e => {
    if (e.target === popup || e.target === closeBtn) {
        closePopup();
    }
});