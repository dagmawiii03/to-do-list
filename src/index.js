import './style.css';
import { add, removeTask } from './addRemove.js';
import renderList from './renderList.js';
import todoList from './TodoList.js';

renderList(todoList);

let currentTask = '';

let inputDesc = '';

const addBtn = document.querySelector('.add-btn');

const input = document.getElementById('input');

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  add(inputDesc, currentTask);
  inputDesc = '';
  input.value = inputDesc;
});

input.addEventListener('keyup', (e) => {
  inputDesc = e.target.value;
});

const todos = document.querySelector('.todos');

todoList
  .sort((a, b) => a.index - b.index)
  .forEach((todo) => {
    const li = document.createElement('li');
    li.classList.add('list-field');
    li.id = todo.index;
    li.innerHTML = `
<div class="list-label">
  <input type="checkbox" name="task" ${todo.completed ? 'checked' : ''} />
    <input
      type="text"
      name="task"
      class="list-input"
      value="${todo.description}"
    />
</div>
  `;
    const icon = document.createElement('span');
    icon.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
    li.appendChild(icon);

    icon.addEventListener(
      'click',
      () => icon.getAttribute('icon') === 'delete' && removeTask(currentTask),
    );

    li.addEventListener('click', () => {
      currentTask = li.id;
      const allInput = document.querySelectorAll('span');
      allInput.forEach((i) => {
        i.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
        i.setAttribute('icon', 'move');
        i.style.color = 'black';
      });
      icon.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
      icon.setAttribute('icon', 'delete');
      icon.style.color = 'red';
    });
    todos.appendChild(li);
    todos.append(clear);
    li.addEventListener('keyup', (e) => {
      const update = todoList.map((todo) => {
        if (todo.index === Number(li.id)) {
          todo.description = e.target.value;
          return todo;
        }
        return todo;
      });
      todoList.splice(0, todoList.length, ...update);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    });
  });