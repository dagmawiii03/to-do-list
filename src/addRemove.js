import todoList from './TodoList.js';
//import module
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
  // const removeList = document.getElementById(currentItem);
  // removeList?.remove();
};

export const add = (item) => {
  // const clearRemove = document.querySelectorAll('.clear');
  // clearRemove.forEach((cl) => cl.remove());
  todoList.push({
    description: item,
    completed: false,
    index: todoList.length + 1,
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
};