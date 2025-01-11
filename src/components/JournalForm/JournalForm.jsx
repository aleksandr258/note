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

	const handleInputChange = (e) => {
		const {value, name} = e.target;
		dispatchForm({type: 'UPDATE_VALUE', payload: {name, value}});

	};

	useEffect(() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({type: 'CLEAR_FORM'});
		}
	}, [isFormReadyToSubmit] );

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type: 'SUBMIT', payload: formProps });
		
	};

	return (
		<form action="" className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-wrap']}>
				<input type="text" name='title' value={values.title} onChange={handleInputChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="date.svg" alt="icon date" className={styles['icon']}/>
					<span>Дата</span>
				</label>
				<input type="date" id='date' name='date' value={values.date} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.date
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="tag-icon.svg" alt="icon folder " className={styles['icon']}/>
					<span>Метки</span>
				</label>
				<input type='text' id='tag' name='tag' value={values.tag} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.tag
				})} />  
			</div> 			
			
			<textarea name="post" id="" value={values.post} className={cn(styles['input-title'], {
				[styles['invalid']]: !isValid.post
			})}/>
			<Button text={'Сохранить'}/>
		</form>
 
	);
}

export default JournalForm; 