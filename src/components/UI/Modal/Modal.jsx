import styles from './Modal.module.css'

export const Modal = ({ children, visible, setVisible }) => {
	const rootClasses = [styles.modal]
	visible && rootClasses.push(styles.active)

	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
