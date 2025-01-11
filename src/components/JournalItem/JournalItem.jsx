import './JournalItem.css';

function JournalItem({post, title, date}) {
	const formatedDate = new Intl.DateTimeFormat('RU-ru').format(date);
	console.log(post); 
	const maxLength = 30;
	const trimmedText = post.slice(0, maxLength) + '...';


	return (
		<div className="journal-item">
			<h2 className="journal-item__header">{title}</h2>
			<h2 className="journal-item__body">
				<div className="journal-item__date">{formatedDate}</div>
				<div className="journal-item__text">{trimmedText}</div>
			</h2>
		</div>
	);
}

export default JournalItem;