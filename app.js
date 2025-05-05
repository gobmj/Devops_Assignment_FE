const apiUrl = 'http://13.235.82.197:3000/api/todos';

// Fetch todos when page loads
document.addEventListener("DOMContentLoaded", getTodos);

// Fetch and display all todos
function getTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todos');
            todoList.innerHTML = ''; // Clear existing list

            todos.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.innerHTML = `
                    <span class="${todo.completed ? 'done' : ''}">${todo.title}</span>
                    <div>
                        <button class="complete" onclick="toggleCompletion('${todo._id}', ${todo.completed})">
                            ${todo.completed ? 'Undo' : 'Done'}
                        </button>
                        <button class="delete" onclick="deleteTodo('${todo._id}')">Delete</button>
                    </div>
                `;
                todoList.appendChild(todoItem);
            });
        })
        .catch(error => console.error('Error fetching todos:', error));
}

// Create a new todo
function createTodo() {
    const title = document.getElementById('todoTitle').value.trim();

    if (!title) {
        alert('Please enter a task title!');
        return;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('todoTitle').value = ''; // Clear input
        getTodos(); // Refresh list
    })
    .catch(error => console.error('Error creating todo:', error));
}

// Toggle completion status
function toggleCompletion(id, completed) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }), // Toggle completed state
    })
    .then(response => response.json())
    .then(() => getTodos())
    .catch(error => console.error('Error updating todo:', error));
}

// Delete a todo
function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => getTodos())
    .catch(error => console.error('Error deleting todo:', error));
}
