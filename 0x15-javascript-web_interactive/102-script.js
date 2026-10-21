document.addEventListener('DOMContentLoaded', () => {
  const hello = document.querySelector('#hello');
  const input = document.querySelector('#language_code');
  const baseUrl = 'https://hellosalut.stefanbohacek.dev/?lang=';

  async function translate () {
    const code = input.value.trim();
    try {
      const response = await fetch(baseUrl + encodeURIComponent(code));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      hello.textContent = data.hello;
    } catch (error) {
      hello.textContent = 'Error: could not load translation';
    }
  }

  document.querySelector('#btn_translate').addEventListener('click', translate);
});
