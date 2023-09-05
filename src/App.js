import './App.css';
import TodoList from './components/TodoList'; // Importing the TodoList component

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<TodoList /> {/* Embedding the TodoList component */}
			</header>
		</div>
	);
}

export default App;
