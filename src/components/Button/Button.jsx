import cn from 'classnames';
import styles from '../Button/Button.module.css';

function Button({children, onClick, iconClass}) {
	return (
		<button className={cn(styles['button'], {
			[styles['accent']]: !iconClass,
			[styles['icon']]: iconClass
		})}
		onClick={onClick}>{children}</button>
	);
}

export default Button;