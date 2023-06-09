import todoList from './TodoList.js';
import { add, removeTask } from './addRemove.js';

const todos = document.querySelector('.todos');

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';

let currentItem = '';

let inputDesc = '';

const input = document.getElementById('input');

input.addEventListener('keyup', (e) => {
  inputDesc = e.target.value;
});

input.addEventListener('change', (e) => {
  inputDesc = e.target.value;
});

export const toggleCompleted = (todoList, id, status) => {
  const update = todoList.map((todo) => {
    if (todo.index === Number(id)) {
      todo.completed = status;
      return todo;
    }
    return todo;
  });
  todoList.splice(0, todoList.length, ...update);
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

export const handleUpdate = (todoList, id, e) => {
  const update = todoList.map((todo) => {
    if (todo.index === Number(id)) {
      todo.description = e.target.value;
      return todo;
    }
    return todo;
  });
  todoList.splice(0, todoList.length, ...update);
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

const renderList = (list) => {
  const handleRemoveTask = (currentItem) => {
    removeTask(currentItem);
    renderList(todoList);
  };

  const oldList = document.querySelectorAll('.task-item');
  oldList.forEach((ti) => ti.remove());
  list
    .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      clear.remove();
      const li = document.createElement('li');
      li.classList.add('list-field');
      li.classList.add('task-item');
      li.id = todo.index;
      const div = document.createElement('div');
      div.classList.add('list-label');
      const inputCheck = document.createElement('input');
      inputCheck.id = `${todo.index}c`;
      inputCheck.type = 'checkbox';
      inputCheck.checked = !!todo.completed;
      const inputField = document.createElement('input');
      inputCheck.addEventListener('change', () => {
        toggleCompleted(todoList, li.id, inputCheck.checked);
        inputField.style.textDecoration = todo.completed
          ? 'line-through'
          : 'none';
      });

      inputField.classList.add('list-input');
      inputField.value = todo.description;
      inputField.style.textDecoration = todo.completed
        ? 'line-through'
        : 'none';
      div.appendChild(inputCheck);
      div.appendChild(inputField);
      li.appendChild(div);
      const icon = document.createElement('span');
      icon.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
      li.appendChild(icon);

      icon.addEventListener(
        'click',
        () => icon.getAttribute('icon') === 'delete'
          && handleRemoveTask(currentItem),
      );

      li.addEventListener('click', () => {
        currentItem = li.id;
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
      ['keyup', 'change'].forEach((eventItem) => {
        inputField.addEventListener(eventItem, (e) => handleUpdate(todoList, li.id, e));
      });
    });
};

const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const ph = document.getElementById('input');
  if (inputDesc === '') {
    ph.placeholder = 'Please enter a title here!!!';
    ph.classList.add('redNotice');
  } else {
    add(inputDesc);
    inputDesc = '';
    input.value = inputDesc;
    ph.placeholder = 'Add to your list ...';
    ph.classList.remove('redNotice');
    renderList(todoList);
  }
});

export const handleClear = (todoList) => {
  const removeCompleted = todoList.filter((todo) => todo.completed === true);
  removeCompleted.forEach((todo) => {
    const removeTodo = document.getElementById(todo.index);
    removeTodo?.remove();
  });
  const update = todoList
    .filter((todo) => todo.completed !== true)
    .sort((a, b) => a.index - b.index);

  update.forEach((td, i) => {
    td.index = i + 1;
  });

  todoList.splice(0, todoList.length, ...update);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderList(todoList);
};

clear.addEventListener('click', () => handleClear(todoList));

export default renderList;