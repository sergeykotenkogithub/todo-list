import remove from '../image/remove.svg'
import edit from '../image/edit.svg'
import styles from './TodoItem.module.css'

export const TodoItem = ({ task, editTodo, removeTodo, todo, setTodo }) => {
	const changeCheckbox = e => {
		const newTodo = todo.map(post =>
			post.id === task.id ? { ...post, completed: e.target.checked } : post
		)
		setTodo(newTodo)
	}
	return (
		<div>
			<div
				className={
					task.completed
						? `${styles.todoWrapper} ${styles.completed}`
						: styles.todoWrapper
				}
			>
				<div className='todo'>
					<p>{task.title}</p>
					<p>{task.description}</p>
					<p>{task.data}</p>
					<p>{task.fileName}</p>
				</div>
				<div className='edit-delete-wrapper'>
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
