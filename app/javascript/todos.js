document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    document.getElementById('add-btn').addEventListener('click', addTodo);
});

const apiEndpoint = 'http://localhost:3000/todos';

function addTodo() {
    const title = document.getElementById('new-todo').value;
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({todo: {title}})
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('new-todo').value = '';
        fetchTodos();
    });
}

function fetchTodos() {
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        data.todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            listItem.innerHTML = `
                ${todo.title}
                <button onclick="deleteTodo(${todo.id})">削除</button>
            `;
            todoList.appendChild(listItem);
        });
    });
}

function deleteTodo(id) {
    fetch(`${apiEndpoint}/${id}`, {method: 'DELETE'})
    .then(() => fetchTodos());
}
