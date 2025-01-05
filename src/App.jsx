import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList.jsx/JournalList';
import JournalAddButton from './components/JournalAdd/JournalAdd';
import { useEffect, useState } from 'react';
import JournalForm from './components/JournalForm/JournalForm';




function App() { 
	const [items, setItems] = useState([]);
	 
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data){
		 setItems(data.map(item => ({
			 ...item,
			 date: new Date(item.date)
		 })));
		} 
	},[]);
	
	useEffect(() => {
		if (items.length){
			localStorage.setItem('data', JSON.stringify(items)); 
		}
	
	}, [items]);

	const addItem = (newItems) => {
		setItems(oldItems => [...oldItems, {
			title: newItems.title,
			tag: newItems.tag,
			post: newItems.post,
			date: new Date(newItems.date),
			id: Math.max(...oldItems.map(e => e.id)) + 1
		}]);
	};

	return (
		<div className='app'>
		  <LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList 	items={items} />
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
