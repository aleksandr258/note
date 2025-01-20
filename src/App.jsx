import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList.jsx/JournalList';
import JournalAddButton from './components/JournalAdd/JournalAdd';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './components/Hooks/ use-localstorage.hook';



function App() { 
	const [items, setItems] = useLocalStorage('data');
	 
	const mapItems = (items) => {
		if (!items){
			return [];
		}
		return items.map(e => ({
			...e,
			date: new Date(e.date)
		}));
	};


	const addItem = (item) => {
		setItems([...mapItems(items), {
			title: item.title, 
			tag: item.tag, 
			post: item.post,
			date: new Date(item.date),
			id: items.length > 0 ? Math.max(...items.map(e => e.id)) + 1 : 1
		}]);
	}; 

	return (
		<div className='app'>
		  <LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList 	items={mapItems(items)} />
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
