import CardButton from '../CardButton/CardButton';
import './JournalAdd.css';

function JournalAddButton() {
	return (
		<CardButton className='journal-add'>
			<img className='add-button' src="/Frame.svg" alt="Кнопка добавить" />
			Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;