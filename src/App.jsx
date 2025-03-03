import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList.jsx/JournalList';
import JournalAddButton from './components/JournalAdd/JournalAdd';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './components/Hooks/ use-localstorage.hook';
import { UserContext, UserContextProvider } from './context/user.context';
import { useState } from 'react';


function App() { 
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setItem] = useState({});
	 
	const mapItems = (items) => {
		if (!items){
			return [];
		}
		return items.map(e => ({
			...e,
			date: new Date(e.date)
		}));
	};

	const removeItem = (itemId) => {
		console.log(itemId);
		setItems([...mapItems(items).filter(e => e.id !== itemId)]);
	};


	const addItem = (item) => {
		if (!item.id)	{
			setItems([...mapItems(items), {
				...item,
				id: items.length > 0 ? Math.max(...items.map(e => e.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(e => e.id === item.id ? {...item, date: new Date(item.date)} : e)]);
		}
	}; 

	return (
		<>
			<UserContextProvider>
				<div className='app'>
		  <LeftPanel>
						<Header/>
						<JournalAddButton/>
						<JournalList 	items={mapItems(items)} setItem={setItem} />
					</LeftPanel>

					<Body>
						<JournalForm
							onSubmit = {addItem}
							removeItem = {removeItem}
							data = {selectedItem}
						/>
					</Body>
				</div>
			</UserContextProvider>
		</>
	);
}

export default App;
