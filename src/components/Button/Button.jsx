import './Button.css';


function Button({text, onClick}) {
	
	return (
		<button className='button accent'> {text}</button>
	);
}

export default Button;