// portfolio-popup.js – Final version (2025) – works with card as button

let lastFocusedCard = null;
let scrollY = 0;

const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const closeBtn = popup.querySelector('.close-btn');

// Close with Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

// Make every card interactive
document.querySelectorAll('.card').forEach(card => {
    // 1. Hover preview effect (your genius ::before trick – untouched)
    const hoverSrc = card.dataset.hover;
    if (hoverSrc) {
        const responsiveImage = card.querySelector('.responsive-image');
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

    // 2. Open popup on click OR Enter/Space (keyboard)
    const open = () => {
        lastFocusedCard = card;
        scrollY = window.scrollY;

        const fullSrc = card.dataset.full;
        const title = card.querySelector('h3').textContent.trim();
        const description = card.querySelector('p').textContent.trim();
        const altText = `${title} – ${description}`;

        popupImg.src = fullSrc;
        popupImg.alt = altText;
        popupTitle.textContent = altText;

        popup.classList.add('active');

        // Freeze scroll
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        closeBtn.focus(); // trap focus
    };

    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    });
});

// Close function
function closePopup() {
    popup.classList.remove('active');
    popupImg.src = '';
    popupImg.alt = '';

    // Restore scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);

    // Return focus to the card that opened it
    if (lastFocusedCard) {
        lastFocusedCard.focus();
        lastFocusedCard = null;
    }
}

// Close when clicking overlay or ×
popup.addEventListener('click', e => {
    if (e.target === popup || e.target === closeBtn) {
        closePopup();
    }
});