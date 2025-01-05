import cn from 'classnames';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';


function JournalForm({onSubmit}) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (formProps.title?.trim().length == 0){
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
			isFormValid = true;
		}
		if (formProps.text?.trim().length == 0){
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, text: true}));
			isFormValid = true;
		}
		if (!formProps.date){
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		}else {
			setFormValidState(state => ({...state, date: true}));
			isFormValid = true;
		}
		if (!isFormValid){
			return;
		}
	  onSubmit(formProps);
	};

	return (
		<form action="" className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-wrap']}>
				<input type="text" name='title' className={cn(styles['input-title'], {
					[styles['invalid']]: !formValidState.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="date.svg" alt="icon date" className={styles['icon']}/>
					<span>Дата</span>
				</label>
				<input type="date" id='date' name='date' className={cn(styles['input-title'], {
					[styles['invalid']]: !formValidState.date
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="tag-icon.svg" alt="icon folder " className={styles['icon']}/>
					<span>Метки</span>
				</label>
				<input type='text' id='tag' name='tag' className={cn(styles['input-title'], {
					[styles['invalid']]: !formValidState.title
				})} />  
			</div> 			
			
			<textarea name="text" id="" className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}></textarea>
			<Button text={'Сохранить'}/>
		</form>

	);
}

export default JournalForm;