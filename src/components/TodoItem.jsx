import remove from '../image/remove.svg'
import edit from '../image/edit.svg'
import styles from './TodoItem.module.css'
import { useEffect } from 'react'
const dayjs = require('dayjs')

export const TodoItem = ({ task, editTodo, removeTodo, todo, setTodo }) => {
	/**
	 * Add a plugin to be able to compare the date
	 */
	const relativeTime = require('dayjs/plugin/relativeTime')
	dayjs.extend(relativeTime)

	/**
	 * Changes the checkbox if the task is completed
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const changeCheckbox = e => {
		const newTodo = todo.map(todo =>
			todo.id === task.id ? { ...todo, completed: e.target.checked } : todo
		)
		setTodo(newTodo)
	}

	/**
	 * Check the date today and the date at the task, if the date has already passed, then the field completed is changed
	 *
	 */
	useEffect(() => {
		if (task.data) {
			const reg = /ago/.test(dayjs(task.data).fromNow())
			const newTodo = todo.map(todo =>
				todo.id === task.id ? { ...todo, completed: reg } : todo
			)
			setTodo(newTodo)
		}
	}, [task.data])

	return (
		<div>
			<div
				className={
					task.completed
						? `${styles.todoWrapper} ${styles.completed}`
						: styles.todoWrapper
				}
			>
				<div className={styles.todo}>
					<div className={styles.field}>
						<p>Заголовок:</p>
						<p>{task.title}</p>
					</div>
					<div className={styles.field}>
						<p>Описание:</p>
						<p>{task.description}</p>
					</div>
					<div className={styles.field}>
						<p>Дата завершения:</p>
						<p>{task.data}</p>
					</div>
					<div className={styles.field}>
						<p>Файл:</p>
						<p>{task.fileName}</p>
					</div>
				</div>
				<div className={styles.editDeleteWrapper}>
					<img
						onClick={() => editTodo(task)}
						className={styles.icon}
						src={edit}
						alt='edit'
					/>

					<img
						onClick={() => removeTodo(task)}
						className={`${styles.remove} ${styles.icon}`}
						src={remove}
						alt='remove'
					/>

					<input
						className={styles.inputFile}
						type='checkbox'
						checked={task.completed}
						onChange={changeCheckbox}
					/>
				</div>
			</div>
		</div>
	)
}
