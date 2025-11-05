let scrollY = 0;

document.querySelectorAll('.card').forEach(card => {
  const hoverSrc = card.getAttribute('data-hover');
  const responsiveImage = card.querySelector('.responsive-image');

  // Crear clase única para cada tarjeta
  const uniqueClass = `hover-${Math.random().toString(36).substr(2, 5)}`;
  responsiveImage.classList.add(uniqueClass);

  // Inyectar regla CSS dinámica para ::before
  const style = document.createElement('style');
  style.innerHTML = `
    .${uniqueClass}::before {
      background-image: url('${hoverSrc}');
    }
  `;
  document.head.appendChild(style);

  // Abrir popup al hacer clic
  card.addEventListener('click', (e) => {
    e.preventDefault(); // Evita scroll al top por <a href="#">
    scrollY = window.scrollY;

    const fullSrc = card.getAttribute('data-full');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    popupImg.src = fullSrc;
    popup.classList.add('active');

    // Congelar scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  });
});

function closePopup(event) {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const closeBtn = document.querySelector('.close-btn');

  if (event.target === popup || event.target === closeBtn) {
    popup.classList.remove('active');
    popupImg.src = '';

    // Restaurar scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }
}
