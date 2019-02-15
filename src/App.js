import React, { Component } from 'react';
import Search from './components/Search/Search';
import List from './components/List/List';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import Warning from './components/Warning/Warning';
import Controls from './components/Controls/Controls';
import './App.scss';

class App extends Component {

	state = {
		categories: {
			movie: 'Movie',
			book: 'Book',
			game: 'Game',
			music: 'Music'
		},
		list: [
			{
				id:0,
				category: 'movie',
				title: 'Titanic'
			},
			{
				id:1,
				category: 'book',
				title: 'Bible'
			},
			{
				id:2,
				category: 'game',
				title: 'Tetris'
			},
			{
				id:3,
				category: 'music',
				title: 'Bohemian Rapsody'
			},
			{
				id:4,
				category: 'movie',
				title: 'Godfather'
			},
			{
				id:5,
				category: 'book',
				title: 'Communist Manifesto'
			},
			{
				id:6,
				category: 'game',
				title: 'Super Mario'
			},
			{
				id:7,
				category: 'game',
				title: 'ET'
			},
			{
				id:8,
				category: 'movie',
				title: 'ET'
			},
			{
				id:9,
				category: 'movie',
				title: 'Bohemian Rapsody'
			},
			{
				id:10,
				category: 'movie',
				title: 'Predator'
			},
			{
				id:11,
				category: 'game',
				title: 'Aliens vs Predator'
			},
			{
				id:12,
				category: 'music',
				title: 'Swan Lake'
			},
			{
				id:13,
				category: 'book',
				title: 'Tools of Titans'
			}
		],
		filteredList: [],
		selectedCategory: 'all',
		searchQuery: '',
		modalOpened: false,
		showWarning: false,
		newItem: {
			category: null,
			title: ''
		},
		selectedItemId: null,
		deviceWidth: window.innerWidth,
		charsLeft: 150
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	handleWindowSizeChange() {
		this.setState({ deviceWidth: window.innerWidth });
	};
	

	handleOpenModal = this.handleOpenModal.bind(this);
	handleOpenModal() {
		if(!this.state.modalOpened) {
			this.setState(prevState => ({
				modalOpened:!prevState.modalOpened,
				selectedItemId: null
			}))
		}
	}

	handleCloseModal = this.handleCloseModal.bind(this);
	handleCloseModal() {
		let updatedNewItem = {...this.state.newItem}

		updatedNewItem.title = ''
		updatedNewItem.category = null

		if(this.state.modalOpened) {
			this.setState(prevState => ({
				modalOpened:!prevState.modalOpened,
				newItem: updatedNewItem,
				selectedItemId: null
			}))
		}
	}

	handleCancelSearch = this.handleCancelSearch.bind(this);
	handleCancelSearch() {
		let updatedFilteredList = [];
		let updatedSelectedCategory = 'all';
		let updatedSearchQuery = '';

		updatedFilteredList = [...this.state.list]

		this.setState({
			filteredList:updatedFilteredList,
			selectedCategory: updatedSelectedCategory,
			searchQuery:updatedSearchQuery,
			selectedItemId: null
		})
	}

	matchItem = this.matchItem.bind(this)
	matchItem(selectedCategory, searchQuery) {
		let updatedFilteredList = []

		if(selectedCategory === 'all' && searchQuery === '') {
			updatedFilteredList = [...this.state.list]
		} 
		if(selectedCategory === 'all' && searchQuery !== '') {
			updatedFilteredList = this.state.list.filter(listItem => listItem.title.toUpperCase().indexOf((searchQuery).toUpperCase()) > -1)
		} 
		if(selectedCategory !== 'all' && searchQuery === '') {
			updatedFilteredList = this.state.list.filter(listItem => listItem.category === selectedCategory)
		}
		if(selectedCategory !== 'all' && searchQuery !== '') {
			updatedFilteredList = this.state.list.filter(listItem => listItem.category === selectedCategory && listItem.title.toUpperCase().indexOf((searchQuery).toUpperCase()) > -1)
		}

		this.setState({
			filteredList:updatedFilteredList
		})
	}

	handleCategorySelect = this.handleCategorySelect.bind(this);
	handleCategorySelect(e) {

		this.setState({
			selectedCategory: e.target.value
		})
		this.matchItem(e.target.value, this.state.searchQuery)
	}

	handleSearchInput = this.handleSearchInput.bind(this)
	handleSearchInput(e) {
		this.setState({
			searchQuery: e.target.value
		})
		this.matchItem(this.state.selectedCategory, e.target.value)
	}

	handleSearchFocus = this.handleSearchFocus.bind(this)
	handleSearchFocus() {
		this.setState({
			selectedItemId: null
		})
	}

	handleNewItemCategory = this.handleNewItemCategory.bind(this);
	handleNewItemCategory(e) {
		let updatedNewItem = {...this.state.newItem}

		updatedNewItem.category = e.target.value;

		this.setState({
			newItem: updatedNewItem
		})
	}

	handleNewItemTitle = this.handleNewItemTitle.bind(this);
	handleNewItemTitle(e) {
		let updatedNewItem = {...this.state.newItem}

		updatedNewItem.title = e.target.value;

		this.setState({
			newItem: updatedNewItem,
		})
	}

	handleSaveItem = this.handleSaveItem.bind(this);
	handleSaveItem() {
		let updatedList = [...this.state.list];
		let updatedNewItem = {...this.state.newItem}
		let indexToEdit = this.state.list.map(item => item.id).indexOf(this.state.selectedItemId);

		let newListItem = {
			id: this.state.selectedItemId !== null ? this.state.selectedItemId : Math.max.apply(Math, this.state.list.map(item => item.id))+1,
			category: this.state.newItem.category,
			title: this.state.newItem.title
		}

		if(this.state.selectedItemId !== null) {
			updatedList[indexToEdit] = newListItem
		} else {
			updatedList.push(newListItem)
		}
		
		updatedNewItem.title = ''
		updatedNewItem.category = null

		this.setState({
			modalOpened: false,
			list: updatedList,
			newItem: updatedNewItem,
			selectedItemId: null
		})
	}

	handleListItemSelected = this.handleListItemSelected.bind(this)
	handleListItemSelected(item) {

		if(this.state.selectedItemId !== null && this.state.selectedItemId === item.id) {
			this.setState({
				selectedItemId: null
			})
		} else {
			this.setState({
				selectedItemId: item.id
			})
		}
	}

	handleItemEditClicked = this.handleItemEditClicked.bind(this);
	handleItemEditClicked() {
		let updatedItem = {...this.state.newItem}
		let indexToEdit = this.state.list.map(item => item.id).indexOf(this.state.selectedItemId);
		
		updatedItem.title = this.state.list[indexToEdit].title
		updatedItem.category = this.state.list[indexToEdit].category

		this.setState({
			modalOpened: true,
			newItem: updatedItem
		})
	}
	
	handleItemRemoveClicked = this.handleItemRemoveClicked.bind(this);
	handleItemRemoveClicked() {
		this.setState({
			showWarning: true
		})
	}

	handleCloseWarningClicked = this.handleCloseWarningClicked.bind(this)
	handleCloseWarningClicked() {
		this.setState({
			showWarning: false,
			selectedItemId: null
		})	
	}

	handleConfirmWarningClicked = this.handleConfirmWarningClicked.bind(this)
	handleConfirmWarningClicked() {
		let updatedList = [...this.state.list]
		let indexToRemove = updatedList.map(item => item.id).indexOf(this.state.selectedItemId);

		updatedList.splice(indexToRemove, 1)

		this.setState({
			list: updatedList,
			showWarning: false,
			selectedItemId: null
		})
	}


	render() {
		const isMobile = this.state.deviceWidth <= 768;

		if(isMobile) {
			return (
				<main>
					<Search
						isMobile={isMobile}
						searchQuery={this.state.searchQuery}
						selectedCategory={this.state.selectedCategory}
						categories={this.state.categories}
						handleCategorySelect={this.handleCategorySelect}
						handleSearchInput={this.handleSearchInput}
						handleSearchFocus={this.handleSearchFocus} />
					<List
						list={(this.state.selectedCategory !== 'all' || this.state.searchQuery) ? this.state.filteredList : this.state.list}
						searchQuery={this.state.searchQuery}
						selectedCategory={this.state.selectedCategory}
						itemClicked={this.handleListItemSelected}
						itemSelected={this.state.selectedItemId}
						handleItemEditClicked={this.handleItemEditClicked}
						handleItemRemoveClicked={this.handleItemRemoveClicked} />
	
					<Controls>
						<Button 
							className='Cancel'
							name='Cancel Search'
							disabled={(this.state.selectedCategory !== 'all' || this.state.searchQuery) ? '' : 'disabled'}
							clicked={this.handleCancelSearch} />
						<Button
							className='Add-Item'
							name='Add New'
							clicked={this.handleOpenModal} />
					</Controls>
	
					<Backdrop
						showBackdrop={this.state.modalOpened || this.state.showWarning} >
						<Modal
							newItemCategory={this.state.newItem.category}
							newItemTitle={this.state.newItem.title}
							handleNewItemTitle={this.handleNewItemTitle}
							handleNewItemCategory={this.handleNewItemCategory}
							closeClicked={this.handleCloseModal}
							modalOpened={this.state.modalOpened}
							categories={this.state.categories}
							disabled={(this.state.newItem.category && this.state.newItem.title !== '') ? '' : 'disabled'}
							handleSaveItem={this.handleSaveItem}
							charsLeft={this.state.charsLeft} />
						
						<Warning
							showWarning={this.state.showWarning}
							selectedItemId={this.state.selectedItemId}
							list={this.state.list}
							closeWarningClicked={this.handleCloseWarningClicked}
							confirmWarningClicked={this.handleConfirmWarningClicked} />
					</Backdrop>
				</main>
			);
		} else {
			return(
				<main>
					<div className='LeftCol'>
						<Search
							isMobile={isMobile}
							searchQuery={this.state.searchQuery}
							selectedCategory={this.state.selectedCategory}
							categories={this.state.categories}
							handleCategorySelect={this.handleCategorySelect}
							handleSearchInput={this.handleSearchInput}
							handleSearchFocus={this.handleSearchFocus} />

						<Button 
							className='Cancel notMobile'
							name='Cancel'
							disabled={(this.state.selectedCategory !== 'all' || this.state.searchQuery) ? '' : 'disabled'}
							clicked={this.handleCancelSearch} />
					</div>


					<div className='RightCol'>
						<Button
							className='Add-Item'
							name='Add New'
							clicked={this.handleOpenModal} />

						<List
							isMobile={isMobile}
							list={(this.state.selectedCategory !== 'all' || this.state.searchQuery) ? this.state.filteredList : this.state.list}
							searchQuery={this.state.searchQuery}
							itemClicked={this.handleListItemSelected}
							itemSelected={this.state.selectedItemId}
							handleItemEditClicked={this.handleItemEditClicked}
							handleItemRemoveClicked={this.handleItemRemoveClicked} />		
					</div>
					
					<Backdrop
						showBackdrop={this.state.modalOpened || this.state.showWarning} >
						<Modal
							newItemCategory={this.state.newItem.category}
							newItemTitle={this.state.newItem.title}
							handleNewItemTitle={this.handleNewItemTitle}
							handleNewItemCategory={this.handleNewItemCategory}
							closeClicked={this.handleCloseModal}
							modalOpened={this.state.modalOpened}
							categories={this.state.categories}
							disabled={(this.state.newItem.category && this.state.newItem.title !== '') ? '' : 'disabled'}
							handleSaveItem={this.handleSaveItem}
							charsLeft={this.state.charsLeft} />
						
						<Warning
							showWarning={this.state.showWarning}
							selectedItemId={this.state.selectedItemId}
							list={this.state.list}
							closeWarningClicked={this.handleCloseWarningClicked}
							confirmWarningClicked={this.handleConfirmWarningClicked} />
					</Backdrop>
				</main>
				
			);
		}

		
	}
}

export default App;