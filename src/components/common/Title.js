import styles from './Title.module.css'

export const Title = ({ title }) => {
	return (
		<div className={styles.title}>
			<h1 className='ww'>{title}</h1>
		</div>
	)
}
