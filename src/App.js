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

	const [modal, setModal] = useState(false)
	const [editForm, setEditForm] = useState(false)

	const removeTodo = chooseTodo => {
		setTodo(todo.filter(element => element.id !== chooseTodo.id))
	}

	const editTodo = e => {
		const wwww = todo.filter(element => element.id === e.id)
		setEditTask(wwww[0])
		setEditForm(true)
		setModal(true)
	}

	const createTodo = newTodo => {
		setTodo([...todo, newTodo])
		setModal(false)
	}

	const editNew = e => {
		const newTodo = todo.map(post =>
			post.id === e.id ? { ...post, ...e } : post
		)
		setTodo(newTodo)
		setModal(false)
	}

	const handleButtonCreate = () => {
		setModal(true)
		setEditForm(false)
	}

	return (
		<div className='App'>
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
				<div className='notFoundTodo'>
					{' '}
					Все задания сделаны. Создайте новое.{' '}
				</div>
			)}
		</div>
	)
}

export default App
