import { useEffect, useRef, useState } from 'react'
import './App.css'
import remove from './image/remove.svg'
import edit from './image/edit.svg'
import { Title } from './components/common/Title'
import { Button } from './components/UI/button/Button'
import { Modal } from './components/UI/Modal/Modal'
import { TodoForm } from './components/TodoForm'

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
		console.log('www')
		setTodo(todo.filter(element => element.id !== chooseTodo.id))
	}

	const editTodo = e => {
		console.log('edit')
		const wwww = todo.filter(element => element.id === e.id)
		console.log(wwww[0])
		setEditTask(wwww[0])
		console.log('editrttt', editTask.id)
		setEditForm(true)
		setModal(true)
	}

	const createTodo = newTodo => {
		setTodo([...todo, newTodo])
		setModal(false)
		console.log('newww todo', todo)
	}

	const editNew = e => {
		console.log('edit new')
		console.log('2222', e)
		// const wwww = todo.filter(element => element.id === e.id)
		// console.log('33333', wwww)
		// console.log('444', editTask)
		console.log('www111', editTask)
		// const newPosts = todo.map(post => ({

		// 	...post,
		// 	...editTask,
		// }))
		const newPosts = todo.map(post =>
			post.id === e.id ? { ...post, ...e } : post
		)

		// console.log(newPosts)
		setTodo(newPosts)
		setModal(false)
	}

	const handleButtonCreate = () => {
		console.log('11')
		setModal(true)
		setEditForm(false)
	}

	const hiddenFileInput = useRef(null)

	const handleChange = event => {
		const fileUploaded = event.target.files[0].name
		console.log(fileUploaded)
	}

	const handleClick = event => {
		hiddenFileInput.current.click()
	}

	return (
		<div className='App'>
			{/* <TestUpload /> */}

			<Title title={'Todo List'} />

			{/* <div class='input__wrapper'>
				<input
					type='file'
					name='file'
					id='input__file'
					class='input input__file'
				/>
				<label for='input__file'>Выберите файл</label>
			</div> */}

			<div>
				<div className='button-wrapper'>
					{/* <Button onClick={() =>  setModal(true)}>Создать задачу</Button> */}
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
				{/* <TodoForm create={createTodo} edit={false} /> */}
			</Modal>

			{todo.length ? (
				todo.map(e => (
					<div key={e.id}>
						<div className='todo-wrapper'>
							<div className='todo'>
								<p>{e.title}</p>
								<p>{e.description}</p>
								<p>{e.data}</p>
								<p>{e.fileName}</p>
								<p>{e.completed}</p>
							</div>
							<div className='edit-delete-wrapper'>
								<img
									onClick={() => editTodo(e)}
									className='img edit'
									src={edit}
									alt='edit'
								/>

								<img
									onClick={() => removeTodo(e)}
									className='img'
									src={remove}
									alt='remove'
								/>
							</div>
						</div>
					</div>
				))
			) : (
				<div> Дел нету. Создайте новое дело </div>
			)}

			{/* //////////////////////////////////////////////// */}

			{/* <form>
				<div>
					<p>Заголовок</p>
					<input
						type='text'
						value={editTask.title}
						onChange={e => setEditTask({ ...editTask, title: e.target.value })}
					/>
				</div>
				<div>
					<p>Описание</p>
					<input
						value={editTask.description}
						type='text'
						onChange={e =>
							setEditTask({ ...editTask, description: e.target.value })
						}
					/>
				</div>
				<div>
					<p>Дата завершения</p>
					<input
						value={editTask.data}
						type='date'
						onChange={e => setEditTask({ ...editTask, data: e.target.value })}
					/>
				</div>
				<div>
					<p>Прикрепить файл</p>
					<input
						type='file'
						onChange={e =>
							setEditTask({ ...tasks, fileName: e.target.files[0].name })
						}
					/>
				</div>

				<button onClick={createTodo}>Создать</button>
			</form> */}
		</div>
	)
}

export default App
