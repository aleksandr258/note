import cn from 'classnames';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import { formReducer } from './JournalForm.state.js ';
import { INITIAL_STATE }  from './JournalForm.state.js ';

   


function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} =  formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef  = useRef();
	const tagRef = useRef();
	
	const focusError = (isValid) => {
		switch(true){
		case(!isValid.title): 
			titleRef.current.focus();
			break;  
		case(!isValid.date): 
			dateRef.current.focus();
			break; 
		case(!isValid.post): 
			postRef.current.focus();
			break; 
		case(!isValid.tag): 
			tagRef.current.focus();
			break; 
		}
	
	};

	useEffect(() => {
		let timerId; 
		 if (!isValid.date || !isValid.post || !isValid.title || !isValid.tag){
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		 }
		 return (() => { 
			 clearTimeout(timerId);
		 });
	}, [isValid]);

	const handleInputChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});

	};

	useEffect(() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({type: 'CLEAR_FORM'});
		}
	}, [isFormReadyToSubmit, values, onSubmit] );

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
		
	};

	return (
		<form action="" className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['title-wrap']}>
				<input type="text" name='title' ref={titleRef} value={values.title} onChange={handleInputChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="date.svg" alt="icon date" className={styles['icon']}/>
					<span>Дата</span>
				</label>
				<input type="date" id='date' name='date' ref={dateRef} value={values.date} onChange={handleInputChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.date
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="tag-icon.svg" alt="icon folder " className={styles['icon']}/>
					<span>Метки</span>
				</label>
				<input type='text' id='tag' name='tag' ref={tagRef} value={values.tag} onChange={handleInputChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.tag
				})} />  
			</div> 			
			
			<textarea name="post" id="" ref={postRef} value={values.post} onChange={handleInputChange} className={cn(styles['input-title'], {
				[styles['invalid']]: !isValid.post
			})}/>
			<Button text={'Сохранить'}/>
		</form>
 
	);
} 

export default JournalForm; 