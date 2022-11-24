import { useState } from 'react'

export const TodoForm = ({ create, edit, editElement, setEditTask }) => {
	console.log('111', editElement)

	const [tasks, setTasks] = useState({
		title: '',
		description: '',
		data: '',
		fileName: '',
		completed: false,
	})

	const createTodo = e => {
		e.preventDefault()
		const newTodo = {
			...tasks,
			id: Date.now(),
			completed: false,
		}
		const newTodo2 = {
			...tasks,
			id: editElement?.id,
		}
		if (edit) {
			console.log('1111wwwwwwwwwwwwwwwwA', editElement)
			create({ ...tasks })
		} else {
			create(newTodo)
		}
		// console.log('11')
		// const todoAll = {
		// 	title,
		// 	description,
		// 	data,
		// }
		// setTodo([...todo, { ...tasks, id: Date.now(), completed: false }])
	}

	return (
		<div>
			<form>
				<div>
					<p>Заголовок</p>
					<input
						type='text'
						value={editElement ? editElement.title : tasks.title}
						onChange={e => {
							if (editElement) {
								setEditTask({
									...tasks,
									title: e.target.value,
									id: editElement.id,
								})
							} else {
								setTasks({ ...tasks, title: e.target.value })
							}
						}}
					/>
				</div>
				<div>
					<p>Описание</p>
					<input
						value={tasks.description}
						type='text'
						onChange={e => setTasks({ ...tasks, description: e.target.value })}
					/>
				</div>
				<div>
					<p>Дата завершения</p>
					<input
						value={tasks.data}
						type='date'
						onChange={e => setTasks({ ...tasks, data: e.target.value })}
					/>
				</div>
				<div>
					<p>Прикрепить файл</p>
					<input
						type='file'
						onChange={e =>
							setTasks({ ...tasks, fileName: e.target.files[0].name })
						}
					/>
				</div>

				<button onClick={createTodo}>Создать</button>
			</form>
		</div>
	)
}
