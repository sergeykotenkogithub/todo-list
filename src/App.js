import { useState } from 'react'
import './App.css'
import { Title } from './components/common/Title'
import { Button } from './components/UI/button/Button'
import { Modal } from './components/UI/Modal/Modal'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'

export const App = () => {
	const [todo, setTodo] = useState([])

	const [editTask, setEditTask] = useState({
		title: '',
		description: '',
		data: ' ',
		fileName: '',
		completed: false,
	})

	/**
	 * @typedef {Object} Todo
	 * @property {string} id
	 * @property {string} title
	 * @property {string} description
	 * @property {string} data
	 * @property {string} fileName,
	 * @property {boolean} completed,
	 */

	/**
	 * useState for modal and form
	 */
	const [modal, setModal] = useState(false)
	const [editForm, setEditForm] = useState(false)

	/**
	 * remove todo
	 * @param {Todo} chooseTodo
	 */
	const removeTodo = chooseTodo => {
		setTodo(todo.filter(element => element.id !== chooseTodo.id))
	}

	/**
	 * edit todo
	 * @param {Todo} e
	 */
	const editTodo = e => {
		const edit = todo.filter(element => element.id === e.id)
		setEditTask(edit[0])
		setEditForm(true)
		setModal(true)
	}
	/**
	 * Create todo
	 * @param {Todo} newTodo
	 */
	const createTodo = newTodo => {
		setTodo([...todo, newTodo])
		setModal(false)
	}

	/**
	 * Find the desired todo by id and change to the new properties
	 * @param {Todo} e
	 */
	const editNew = e => {
		const newTodo = todo.map(edit =>
			edit.id === e.id ? { ...edit, ...e } : edit
		)
		setTodo(newTodo)
		setModal(false)
	}

	/**
	 * Open Modal and set that it is not editing
	 */
	const handleButtonCreate = () => {
		setModal(true)
		setEditForm(false)
	}

	return (
		<div className='app'>
			<Title title={'Todo List'} />

			<div>
				<div className='button-wrapper'>
					<Button onClick={() => handleButtonCreate()}>Создать задачу</Button>
				</div>

				<div>
					<h2 className='subtitle'> Список дел : </h2>
				</div>
			</div>

			<Modal visible={modal} setVisible={setModal}>
				{editForm ? (
					<TodoForm
						create={editNew}
						edit={true}
						editElement={editTask}
						setEditTask={setEditTask}
					/>
				) : (
					<TodoForm create={createTodo} edit={false} />
				)}
			</Modal>

			{todo.length ? (
				todo.map(e => (
					<TodoItem
						key={e.id}
						task={e}
						editTodo={editTodo}
						removeTodo={removeTodo}
						todo={todo}
						setTodo={setTodo}
					/>
				))
			) : (
				<div className='not-found-todo'>
					{' '}
					Все задания сделаны. Создайте новое.{' '}
				</div>
			)}
		</div>
	)
}

export default App
