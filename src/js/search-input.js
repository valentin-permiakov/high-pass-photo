const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');
const closeSearchBtn = document.getElementById('close-search');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  searchContainer.classList.add('header-search__input-container--active');
});

closeSearchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchContainer.classList.remove('header-search__input-container--active');
});
