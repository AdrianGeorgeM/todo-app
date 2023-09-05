import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState('all');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch('http://localhost:3000/tasks');
				if (!response.ok) {
					const text = await response.text();
					throw new Error(`Failed to fetch tasks: ${text}`);
				}
				const data = await response.json();
				setTasks(data);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};

		fetchTasks();
	}, []);

	const addTodo = (task) => {
		setTasks([...tasks, task]);
	};

	const deleteTodo = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const toggleTodo = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const filteredTasks = tasks.filter(
		(task) =>
			filter === 'all' ||
			(filter === 'completed' && task.completed) ||
			(!task.completed && filter === 'active')
	);

	return (
		<div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<TodoForm addTodo={addTodo} />
			<div>
				Filter:
				<button onClick={() => setFilter('all')}>All</button>
				<button onClick={() => setFilter('active')}>Active</button>
				<button onClick={() => setFilter('completed')}>Completed</button>
			</div>
			{filteredTasks.map((task) => (
				<TodoItem
					key={task.id}
					task={task}
					deleteTodo={deleteTodo}
					toggleTodo={toggleTodo}
				/>
			))}
		</div>
	);
}

export default TodoList;
