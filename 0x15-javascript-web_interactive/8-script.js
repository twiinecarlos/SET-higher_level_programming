const list = document.querySelector('#list_movies');
const url = 'https://swapi-api.alx-tools.com/api/films/?format=json';

function addItem (text) {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
}

async function fetchMovies () {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    data.results.forEach((movie) => addItem(movie.title));
  } catch (error) {
    addItem('Error: could not load movies');
  }
}

fetchMovies();
