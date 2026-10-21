document.addEventListener('DOMContentLoaded', () => {
  const hello = document.querySelector('#hello');
  const url = 'https://hellosalut.stefanbohacek.dev/?lang=fr';

  async function fetchHello () {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      hello.textContent = data.hello;
    } catch (error) {
      hello.textContent = 'Error: could not load translation';
    }
  }

  fetchHello();
});
