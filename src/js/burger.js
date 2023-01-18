const burgerBtn = document.getElementById('burger-btn');
const headerNav = document.getElementById('header-nav');
const links = document.querySelectorAll('.nav-list__link');

burgerBtn.addEventListener('click', (e) => {
  e.preventDefault();

  burgerBtn.classList.toggle('header__burger-btn--opened');
  headerNav.classList.toggle('nav-list--visible');
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('header__burger-btn--opened');
    headerNav.classList.remove('nav-list--visible');
  });
});
