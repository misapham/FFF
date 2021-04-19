import React, { Component } from 'react';
import Shelf from '../Shelf/Shelf';
import Search from '../Search/Search';
import BookDescription from '../BookDescription/BookDescription';
import './BookPage.css';

export default class BookPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			error: null,
			isSearchActive: false,
			searchResults: [],
			showDescription: false,
			selectedBook: null,
			searchCache: {}
		};
	}

	getBooks = () => {
		const url = "https://fakerapi.it/api/v1/books?_quantity=23";
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						books: result.data
					});
				},
				(error) => {
					this.setState({
						error: error
					});
				}
			)
	}

	componentDidMount() {
		this.getBooks();
	}

  search = (books, searchTerm) => {
  	var results = [];
  	var cache = this.state.searchCache;

  	for(var i = 0; i < books.length; i++) {
    	if (books[i].author.toLowerCase().includes(searchTerm) || books[i].title.toLowerCase().includes(searchTerm)) {
				results.push(books[i]);
			}
	  }

	  cache[searchTerm] = results;

	  this.setState({
	  	searchCache: cache
	  });

	  return results;
  }

  handleSearch = (input) => {
  	const cache = this.state.searchCache;
  	const books = this.state.books;
  	var results = [];
  	const searchTerm = input.toLowerCase();

  	if (searchTerm.length < 1) {
  		results = books;
  	} else if (cache[searchTerm] !== undefined) {
  		results = cache[searchTerm];
  	} else if (searchTerm.length > 1) {
  		if (cache[searchTerm[0]] !== undefined) {
  			results = this.search(cache[searchTerm[0]], searchTerm);
  		}
  	} else {
	  	results = this.search(books, searchTerm);
  	}

  	this.setState({
    	searchResults: results,
    	isSearchActive: true
    });
  }

  getDescription = e => {
  	const books = this.state.books;
  	const index = parseInt(e.currentTarget.getAttribute("data-index"),10);
  	if (!Number.isNaN(index)) {
  		var book = books[index];
  		this.setState({
	  		showDescription: true,
	  		selectedBook: book
	  	});
  	}
  };

  toggleDescription = e => {
  	this.setState({
  		showDescription: !this.state.showDescription
  	});
  }

	render() {
		const { error, books, isSearchActive, searchResults, showDescription, selectedBook } = this.state;
		const shelfContent = isSearchActive ? searchResults : books;
		const displayShelf = !showDescription;
		if (error) {
			return(
				<div className="bookPage__error">
					<h3>Oops! Please try again.</h3>
				</div>
			);
		} else {
			return(
				<div className="bookPage">
					<div className="bookPage__inner">
						<Search handleSearch={this.handleSearch}/>
						{displayShelf && <Shelf books={shelfContent} onClick={this.getDescription}/>}
						<div className="bookPage__description-container">
							<BookDescription
								show={showDescription} 
								book={selectedBook} 
								onClose={this.toggleDescription}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}
