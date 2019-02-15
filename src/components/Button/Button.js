import React from 'react';
import './Button.scss';

const button = (props) => (
	<button
		className={props.className ? 'Button ' + props.className : 'Button'}
		onClick={props.clicked}
		value={props.value}
		disabled={props.disabled} >
			{props.name}
			<span></span>
	</button>
);

export default button;