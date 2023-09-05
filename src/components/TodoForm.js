import React, { useState } from 'react';

function TodoForm({ addTodo }) {
	const [task, setTask] = useState('');
	const [error, setError] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (task) {
			const newTask = { title: task, completed: false };
			try {
				const response = await fetch('http://localhost:3000/tasks', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				});

				if (!response.ok) {
					const text = await response.text();
					throw new Error(`Failed to add task: ${text}`);
				}

				const result = await response.json();
				addTodo(result);
				setTask('');
			} catch (error) {
				console.error('Error adding task:', error);
				setError(error.message);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<input
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				placeholder='Add new todo'
			/>
			<button type='submit'>Add</button>
		</form>
	);
}

export default TodoForm;
