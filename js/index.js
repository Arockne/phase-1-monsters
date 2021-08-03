//when page loads, show the first 50 monsters
  //each monster's name, age, and description
//above list of monsters
  //should have a form to create a new monster
    //should have fieelds for name, age, and description
    //create monster button
      //when clicked should be added the list and saved to the API
//at the end of the list of monsters
  //show a button
  //the button should load the next 50 monsters and show them
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

  return monsterCreator;
}

function getMonsters() {
  fetch('http://localhost:3000/monsters?_limit=100&_page=11')
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

document.addEventListener('DOMContentLoaded', () => {
  getMonsters();
  monsterForm();
});