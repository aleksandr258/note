import './JournalForm.css';

import Button from '../Button/Button';


function JournalForm({onSubmit}) {
	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
	  onSubmit(formProps);
	};

	return (
		<form action="" className='journal-form' onSubmit={addJournalItem}>
			<input type="text" name='date'/>
			<input type="date" name='date'/>
			<input type='text' name='tag' className=''></input>
			<textarea name="text" id=""></textarea>
			<Button text={'Сохранить'} onClick={() => {console.log('Нажали');}}/>
		</form>

	);
}

export default JournalForm;