import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

test('should render form correctly', () => {
	render(<TodoForm />);
	const inputElement = screen.getByPlaceholderText(/Add new todo/i);
	const buttonElement = screen.getByText(/Add/i);
	expect(inputElement).toBeInTheDocument();
	expect(buttonElement).toBeInTheDocument();
});

test('should handle submit correctly', () => {
	const mockAddTodo = jest.fn();
	render(<TodoForm addTodo={mockAddTodo} />);

	const inputElement = screen.getByPlaceholderText(/Add new todo/i);
	fireEvent.change(inputElement, { target: { value: 'Test Todo' } });

	const buttonElement = screen.getByText(/Add/i);
	fireEvent.click(buttonElement);

	expect(mockAddTodo).toHaveBeenCalledWith('Test Todo');
});
