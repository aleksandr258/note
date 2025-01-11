import cn from 'classnames';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import { formReducer } from './JournalForm.state.js ';
import { INITIAL_STATE }  from './JournalForm.state.js ';

   


function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} =  formState;
	useEffect(() => {
		
		console.log(isValid.date);
	}, [isValid.date]);
	useEffect(() => {
		let timerId; 
		 if (!isValid.date || !isValid.post || !isValid.title || !isValid.tag){
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		 }
		 return (() => { 
			 clearTimeout(timerId);
		 });
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
		}
	}, [isFormReadyToSubmit] );

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(isValid);
		dispatchForm({type: 'SUBMIT', payload: formProps });
	};

	return (
		<form action="" className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-wrap']}>
				<input type="text" name='title' className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="date.svg" alt="icon date" className={styles['icon']}/>
					<span>Дата</span>
				</label>
				<input type="date" id='date' name='date' className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.data
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="tag-icon.svg" alt="icon folder " className={styles['icon']}/>
					<span>Метки</span>
				</label>
				<input type='text' id='tag' name='tag' className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.tag
				})} />  
			</div> 			
			
			<textarea name="post" id="" className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`}></textarea>
			<Button text={'Сохранить'}/>
		</form>
 
	);
}

export default JournalForm; 