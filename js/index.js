let page = 1;

function monsterForm() {
  const monsterCreator = document.querySelector('#create-monster');
  monsterCreator.innerHTML = `
    <form>
      <input type="text" id="name" placeholder="name..."><!--
      --><input type="text" id="age" placeholder="age..."><!--
      --><input type="text" id="description" placeholder="description..."><!--
      --><input type="submit" value="create">
    </form>
  `
  const form = monsterCreator.querySelector('form');
  form.addEventListener('submit', addMonster);
}

function getMonsters(page) {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => monsters.forEach(createMonster))
  .catch(err => document.querySelector('#monster-container').textContent = err.message);
}

function addMonster(e) {
  e.preventDefault();
  const name = this.querySelector('#name').value;
  const age = this.querySelector('#age').value;
  const description = this.querySelector('#description').value;

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({name, age, description})
  })
  .then(resp => resp.json())
  .then(createMonster)
  .catch(err => document.querySelector('#monster-container').textContent = err.message);
  this.reset();
}

function createMonster(monster) {
  const h2 = document.createElement('h2');
  h2.textContent = monster.name;

  const h4 = document.createElement('h4');
  h4.textContent = `Age: ${monster.age}`;

  const p = document.createElement('p');
  p.textContent = `Bio: ${monster.description}`;

  const div = document.createElement('div');
  div.id = monster.id;

  div.append(h2, h4, p);
  document.querySelector('#monster-container').appendChild(div);
}

function removePreviousMonsters() {
  const monsters = document.querySelector('#monster-container');
  Array.from(monsters.children).forEach(monster => monster.remove())
}

function pageTurner() {
  const back = document.querySelector('#back');
  back.addEventListener('click', previous);
  const forward = document.querySelector('#forward');
  forward.addEventListener('click', next);
}

function previous() {
  page -= 1;
  if (page < 1) {
    alert('aint no monsters here!');
    page = 1;
    return;
  }
  removePreviousMonsters()
  getMonsters(page);
}

function next() {
  page += 1;
  removePreviousMonsters()
  getMonsters(page);
}

document.addEventListener('DOMContentLoaded', () => {
  getMonsters();
  monsterForm();
  pageTurner();
});