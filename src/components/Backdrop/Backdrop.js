import React from 'react';
import './Backdrop.scss';

const backdrop = (props) => (
	<div className={props.showBackdrop ? 'Backdrop visible' : 'Backdrop'}>
		{props.children}
	</div>
);

export default backdrop;