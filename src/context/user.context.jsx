import { createContext, useState, useReducer } from 'react';


export const UserContext =  createContext({
	userId: 1 
});


const INITIAL_STATE = {
	isValid: {
		post: true,
		title: true,
		tag: true,
		date: true 
	},
	values: {
		post:  '',
		title: '',
		tag: '',
		date: '' 
	},
	isFormReadyToSubmit: false
};


export const UserContextProvider = ({children}) => {
	const [userId, setUserId] = useState(1);
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);


	function formReducer(state, action){
		switch(action.type){
		case ('RESET_VALIDITY'):
			return {...state, isValid: INITIAL_STATE.isValid};    
		case ('SET_VALUE'): {
			return {...state, values: {...state.values, ...action.payload}};
		}
		case ('SUBMIT'): {
			const titleValidity =  state.values.title?.trim().length;
			const postValidity = state.values.post?.trim().length;
			const tagValidity = state.values.tag?.trim().length;
			const dateValidity = state.values.date;
			return {
				...state,
				isValid: {
					post: postValidity,
					title: titleValidity,
					tag: tagValidity,
					date: dateValidity 
				},
				isFormReadyToSubmit: postValidity && titleValidity && tagValidity && dateValidity
			};
		}
		case ('SET_LIST'): {
			return {...state, values: {...action.payload}};
		}
		case ('CLEAR_FORM'): 
			return{...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false};
		}

	
	}
	return (
		<UserContext.Provider value={ {userId, setUserId, formState, dispatchForm, formReducer, INITIAL_STATE} }>
			 {children}
		</UserContext.Provider>
	);
};