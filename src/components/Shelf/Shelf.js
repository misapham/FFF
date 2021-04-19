import React from 'react';
import BookTile from '../BookTile/BookTile.js';
import './Shelf.css';

const Shelf = ({ books, onClick }) =>  {
  const items = books.map((book,index) => (
    <div key={index} className="shelf__book-wrapper">
      <BookTile 
        title={book.title}
        author={book.author}
        image={book.image}
        description={book.description}
        onClickDescription={onClick}
        itemIndex={index}
      />
    </div>
  ));
	return(
    <div className="shelf">
      <div className="shelf__container">
  			<div className="shelf__content">
        {items}
        </div>
      </div>
    </div>
	);
}

export default Shelf;