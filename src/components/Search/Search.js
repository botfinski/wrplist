import React from 'react';
import './Search.scss';

const search = (props) => {
	if(props.isMobile) {
		return (
			<div className='Search'>
				<input
					type='text'
					placeholder='Search...'
					value={props.searchQuery}
					onChange={props.handleSearchInput}
					onFocus={props.handleSearchFocus} />

				<select
					value={props.selectedCategory}
					onChange={props.handleCategorySelect}
					onFocus={props.handleSearchFocus} >
					
					<option value='all'>All</option>
					{
						Object.keys(props.categories).map((key, index) => {
							return <option value={key} key={key+index}>{props.categories[key]}</option>
						})
					}
				</select>
			</div>	
		)	
	} else {
		return (
			<div className='Search'>
				<input
					type='text'
					placeholder='Search...'
					value={props.searchQuery}
					onChange={props.handleSearchInput}
					onFocus={props.handleSearchFocus} />

					<ul>
						<li>
							<button
								value='all'
								className={props.selectedCategory === 'all' ? 'selected' : ''}
								onClick={props.handleCategorySelect}> 
									All
							</button>
						</li>
						{
							Object.keys(props.categories).map((key, index) => {
								return <li key={key+index}>
										<button value={key}
											className={props.selectedCategory === key ? 'selected' : ''}
											onClick={props.handleCategorySelect}>
												{props.categories[key]}
										</button>
									</li>
							})
						}
					</ul>
			</div>
		)
	}
};

export default search;