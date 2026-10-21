document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('ul.my_list');
  let items = ['Item'];

  function render () {
    list.textContent = '';
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  }

  document.querySelector('#add_item').addEventListener('click', () => {
    items.push('Item');
    render();
  });

  document.querySelector('#remove_item').addEventListener('click', () => {
    if (items.length === 0) {
      return;
    }
    items.pop();
    render();
  });

  document.querySelector('#clear_list').addEventListener('click', () => {
    items = [];
    render();
  });
});
