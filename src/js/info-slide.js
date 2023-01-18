const openInfoBtn = document.getElementById('info-btn');
const infoContainer = document.getElementById('contacts-info');
const closeInfoBtn = document.getElementById('close-info-btn');

closeInfoBtn.addEventListener('click', (e) => {
  e.preventDefault();

  infoContainer.classList.remove('contacts__info-wrapper--active');
  openInfoBtn.classList.add('contacts__info-btn--active');
});

openInfoBtn.addEventListener('click', (e) => {
  e.preventDefault();

  infoContainer.classList.add('contacts__info-wrapper--active');
  openInfoBtn.classList.remove('contacts__info-btn--active');
});
