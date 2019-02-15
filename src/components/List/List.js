import React from 'react';
import './List.scss';
import Button from '../Button/Button';

const list = (props) => {
	let currentCategories = [...new Set(props.list.map(listItem => listItem.category))]


		if(props.list.length) {

				return (
					<div className='List'>
						{
							currentCategories.map(currentCategory => {
								return (
									<ul className='List-Category' key={currentCategory}>
										<li className='List-Category-Title'>{currentCategory}</li>
										{
											props.list.filter(item => item.category === currentCategory).map((listItem, index) => {
												return (
													<li
														key={listItem.category+index}
														className={props.itemSelected === listItem.id ? 'List-Item selected' : 'List-Item'} >
															<div
																className='List-Item-Name'
																onClick={() => props.itemClicked(listItem)} >
																	{listItem.title}
															</div>
															
															<div className='List-Item-Controls'>
																<Button
																	name='Edit'
																	className='List-Item-Edit'
																	clicked={props.handleItemEditClicked} />
																<Button
																	name='Remove'
																	className='List-Item-Remove'
																	clicked={props.handleItemRemoveClicked} />
															</div>
													</li>
												)
											})
										}
									</ul>
								)
							})	
						}	
					</div>
				)	
			
			
		} else if(props.selectecCategory === 'all' || props.searchQuery === '') {
			return(
				<div className='List No-Results'>
					<p>List is empty</p>
				</div>
			)
		} else {
			return(
				<div className='List No-Results'>
					<p>No results with phrase "<strong>{props.searchQuery}</strong>"</p>
				</div>
			)
		}
};

export default list;