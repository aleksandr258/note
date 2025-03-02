import { useCallback, useContext } from 'react';
import './JournalItem.css';
import { UserContext } from '../../context/user.context';

function JournalItem({post, title, date}) {
	const {dispatchForm} = useContext(UserContext);
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(new Date(date));
	const maxLength = 30;
	const trimmedText = post.slice(0, maxLength) + '...';

	const showItem = (data) => {
		console.log(data);
		dispatchForm({type: 'SET_LIST', payload: data});
	};
	return (
		<div className="journal-item" onClick={() => showItem({post, title, date})}>
			<h2 className="journal-item__header">{title}</h2>
			<h2 className="journal-item__body">
				<div className="journal-item__date">{formatedDate}</div>
				<div className="journal-item__text">{trimmedText}</div>
			</h2>
		</div>
	);
}

export default JournalItem;