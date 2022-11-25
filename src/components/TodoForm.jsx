import { useEffect, useRef, useState } from 'react'
import styles from './TodoForm.module.css'
import { Button } from './UI/button/Button'

export const TodoForm = ({ create, edit, editElement, setEditTask }) => {
	const [tasks, setTasks] = useState({
		title: '',
		description: '',
		data: '',
		fileName: '',
		completed: false,
	})

	/**
	 * Clicking a button instead of input
	 */
	const hiddenFileInput = useRef(null)
	const handleClick = event => {
		event.preventDefault()
		hiddenFileInput.current.click()
	}

	/**
	 * Create a task
	 * @param {React.MouseEvent<HTMLElement>} element
	 */
	const createTodo = element => {
		element.preventDefault()
		const newTodo = {
			...tasks,
			id: Date.now(),
			completed: false,
		}

		if (edit) {
			create({ ...tasks })
		} else {
			create(newTodo)
			setTasks({
				title: '',
				description: '',
				data: '',
				fileName: '',
				completed: false,
			})
		}
	}

	useEffect(() => {
		setTasks({ ...editElement })
	}, [editElement])

	return (
		<div>
			<form>
				<div className={styles.wrapperField}>
					<p>Заголовок</p>
					<input
						type='text'
						value={tasks.title || ''}
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									title: e.target.value,
								})
							} else {
								setTasks({ ...tasks, title: e.target.value })
							}
						}}
					/>
				</div>
				<div className={styles.wrapperField}>
					<p>Описание</p>
					<input
						value={tasks.description || ''}
						type='text'
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									description: e.target.value,
								})
							} else {
								setTasks({ ...tasks, description: e.target.value })
							}
						}}
					/>
				</div>
				<div className={styles.wrapperField}>
					<p>Дата завершения</p>
					<input
						value={tasks.data || ''}
						type='date'
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									data: e.target.value,
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
						onChange={e => {
							if (editElement) {
								setTasks({
									...tasks,
									fileName: e.target.files[0].name,
								})
							} else {
								setTasks({ ...tasks, fileName: e.target.files[0].name })
							}
						}}
					/>
				</div>

				<div className='button-wrapper'>
					<Button onClick={createTodo}>
						{edit ? 'Редактировать' : 'Создать'}{' '}
					</Button>
				</div>
			</form>
		</div>
	)
}
