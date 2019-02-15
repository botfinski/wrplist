import React from 'react';
import './Modal.scss';
import Button from '../Button/Button';
import Controls from '../Controls/Controls';

const modal = (props) => (
	<div className={props.modalOpened ? 'Modal visible' : 'Modal'}>
		<div className='Category-Controls'>
			{
				Object.keys(props.categories).map(category => {
					return <Button
						key={category}
						className={props.newItemCategory === category ? 'selected' : ''}
						value={category}
						clicked={props.handleNewItemCategory}
						name={props.categories[category]} />
				})
			}	
		</div>

		<div className='Modal-Content'>
			<p>Title:</p>
			
			<textarea
				maxLength="150"
				value={props.newItemTitle}
				onChange={props.handleNewItemTitle}></textarea>
			<p className='charsLeft'>Characters left: {props.charsLeft - props.newItemTitle.length}</p>
		</div>
		
		<Controls>
			<Button
				name='Close'
				className='Cancel'
				clicked={props.closeClicked} />
			<Button
				name='Save'
				className='Save-Item'
				clicked={props.handleSaveItem}
				disabled={props.disabled} />
		</Controls>
	</div>
);

export default modal;