import { UserContext } from '../../context/user.context'; 
import { useContext } from 'react';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext); 
	const changeUserId = (e) => {
		setUserId(Number(e.target.value));
	};
	return (
		<>
			<select name="user" id="user" value={userId} onChange={changeUserId}>
				<option value="1 ">Антон</option>
				<option value="2">Вася</option>
				
			</select>
		</>
	);
}

export default SelectUser;