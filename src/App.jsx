import Button from './components/Button/Button';
import './App.css';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList.jsx/JournalList';
import JournalAddButton from './components/JournalAdd/JournalAdd';
import { useState } from 'react';
import JournalForm from './components/JournalForm/JournalForm';




function App() {
	const INITIAL_DATA = [
		// {
		// 	id: 1,
		// 	title: 'Подготовка к обновлению курсов',
		// 	text: 'Горные походы открывают удивительные природные ландшафты',
		// 	date: new Date()
		// },
		// {
		// 	id: 2,
		// 	title: 'Поход в горы',
		// 	text: 'Думал что очень много времени',
		// 	date: new Date()
		// }
	];

	const [items, setItems] = useState(INITIAL_DATA);
	const addItem = (newItems) => {
		setItems(oldItems => [...oldItems, {
			text: newItems.text,
			title: newItems.title,
			date: new Date(newItems.date),
			id: Math.max(...oldItems.map(e => e.id)) + 1
		}]);
	};

	const sortItems = (a, b) => {
		if (a.date > b.date){
			return -1;
		}
		else {
			return 1;
		}
	};

	return (
		<div className='app'>
		  <LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{items.length == 0 && <p>Записей пока нет, добавьте первую</p>}
					{items.length > 0 && items.sort(sortItems).map((el) => (
						<CardButton key={el.id}>
							<JournalItem
								title = {el.title}
								text = {el.text}
								date = {el.date}
							/>
						</CardButton>
					))}
					
					
				</JournalList>
			</LeftPanel>

			<Body>
				<JournalForm
					onSubmit = {addItem}
				/>
			</Body>
		
		</div>
	);
}

export default App;
