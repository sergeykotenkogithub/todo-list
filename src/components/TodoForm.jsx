import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './UI/button/Button'

export const TodoForm = ({ create, edit, editElement, setEditTask }) => {
	console.log('111', editElement)

	const [ed, setEd] = useState({})

	// useEffect(() => {
	// 	// setEd({ ...editElement })
	// 	console.log('wwwwwwww')
	// }, editElement)

	// console.log('neeeeeeeeeeeeeeww', ed)

	// const [tasks, setTasks] = useState({
	// 	// title: '',
	// 	title: editElement ? editElement.title : '',
	// 	description: editElement ? editElement.description : '',
	// 	data: editElement ? editElement.data : '',
	// 	fileName: editElement ? editElement.fileName : '',
	// 	completed: false,
	// })
	const [tasks, setTasks] = useState({
		// title: '',
		title: '',
		description: '',
		data: '',
		fileName: '',
		completed: false,
	})
	const hiddenFileInput = useRef(null)
	const handleClick = event => {
		event.preventDefault()
		hiddenFileInput.current.click()
	}

	const createTodo = e => {
		e.preventDefault()
		const newTodo = {
			...tasks,
			id: Date.now(),
			completed: false,
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

	const fetchBusinesses = useCallback(() => {
		return editElement
	}, [editElement])

	// useEffect(() => {
	// 	fetchBusinesses()
	// }, [fetchBusinesses])

	// useEffect(() => {
	// 	console.log('wwwwwwwwwwwadasdsa', tasks)
	// 	console.log('hkljk;l,;', editElement)
	// 	// if (!editElement?.fileName) {
	// 	// 	const aaa = { ...editElement, fileName: '' }
	// 	// 	console.log('wwwwwSda', aaa)
	// 	// 	setTasks({ ...editElement, fileName: '' })
	// 	// } else {
	// 	// 	setTasks({ ...editElement })
	// 	// }
	// 	if (!editElement?.data) {
	// 		setTasks({ ...editElement, fileName: '' })
	// 	} else {
	// 		setTasks({ ...editElement })
	// 	}
	// }, [editElement])

	let aaaw

	useEffect(() => {
		console.log('hkljk;l,;', editElement)
		// if (!editElement?.fileName) {
		// 	const aaa = { ...editElement, fileName: '' }
		// 	console.log('wwwwwSda', aaa)
		// 	setTasks({ ...editElement, fileName: '' })
		// } else {
		// 	setTasks({ ...editElement })
		// }
		// if (!editElement?.data) {
		// 	setTasks({ ...editElement, fileName: '' })
		// } else {
		// 	setTasks({ ...editElement })
		// }
		setTasks({ ...editElement })
	}, [editElement])

	console.log('awww', aaaw)

	return (
		<div>
			<form>
				<div>
					<p>Заголовок</p>
					<input
						type='text'
						value={tasks.title || ''}
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									title: e.target.value,
									// id: editElement.id,
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
						value={tasks.description || ''}
						type='text'
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									description: e.target.value,
									// id: editElement.id,
								})
							} else {
								setTasks({ ...tasks, description: e.target.value })
							}
						}}
					/>
				</div>
				<div>
					<p>Дата завершения</p>
					<input
						value={tasks.data || ''}
						type='date'
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									data: e.target.value,
									// id: editElement.id,
								})
							} else {
								setTasks({ ...tasks, data: e.target.value })
							}
						}}
					/>
				</div>
				<div>
					<p>Прикрепить файл</p>
					<button onClick={handleClick}>Upload a file</button>
					<input
						type='file'
						ref={hiddenFileInput}
						style={{ display: 'none' }}
						// onChange={e =>
						// 	setTasks({ ...tasks, fileName: e.target.files[0].name })
						// }
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									fileName: e.target.files[0].name,
									// id: editElement.id,
								})
							} else {
								setTasks({ ...tasks, fileName: e.target.files[0].name })
							}
						}}
					/>
				</div>

				<button onClick={createTodo}>
					{edit ? 'Редактировать' : 'Создать'}{' '}
				</button>
			</form>
		</div>
	)
}
