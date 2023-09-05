import React from 'react';

function TodoItem({ task, deleteTodo, toggleTodo }) {
	const handleDelete = async () => {
		await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
		deleteTodo(task.id);
	};

	const handleToggle = async () => {
		await fetch(`http://localhost:3000/tasks/${task.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: !task.completed }),
		});
		toggleTodo(task.id);
	};

	return (
		<div>
			<input type='checkbox' checked={task.completed} onChange={handleToggle} />
			<span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
				{task.title}
			</span>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}

export default TodoItem;
