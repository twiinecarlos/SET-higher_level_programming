const character = document.querySelector('#character');
const url = 'https://swapi-api.alx-tools.com/api/people/5/?format=json';

async function fetchCharacter () {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    character.textContent = data.name;
  } catch (error) {
    character.textContent = 'Error: could not load character';
  }
}

fetchCharacter();
