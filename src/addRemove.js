import todoList from './TodoList.js';

const todos = document.querySelector('.todos');
const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';

export const removeTask = (currentItem) => {
  todoList.splice(
    0,
    todoList.length,
    ...todoList.filter((todo) => todo.index !== Number(currentItem)),
  );
  if (todoList) {
    todoList.splice(
      0,
      todoList.length,
      ...todoList.sort((a, b) => a.index - b.index),
    );
    todoList.forEach((td, i) => {
      td.index = i + 1;
    });
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
  const removeList = document.getElementById(currentItem);
  removeList?.remove();
};

export const add = (item, currentItem) => {
  const clearRemove = document.querySelectorAll('.clear');
  clearRemove.forEach((cl) => cl.remove());
  todoList.push({
    description: item,
    completed: false,
    index: todoList.length + 1,
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  const li = document.createElement('li');
  li.classList.add('list-field');
  li.id = todoList.length + 1;
  li.innerHTML = `
<div class="list-label">
<input type="checkbox" name="task" />
<input
  type="text"
  name="task"
  class="list-input"
  value="${item}"
/>
</div>
`;
  const icon = document.createElement('span');
  icon.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
  li.appendChild(icon);

  icon.addEventListener(
    'click',
    () => icon.getAttribute('icon') === 'delete' && removeTask(currentItem),
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
  todos.appendChild(clear);
};