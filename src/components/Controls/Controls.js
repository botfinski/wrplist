import React from 'react';
import './Controls.scss';

const controls = (props) => (
	<div className='Controls'>
		{props.children}
	</div>
);

export default controls;