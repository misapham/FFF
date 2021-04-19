import React from 'react';
import './BookTile.css';

const BookTile = ({
	title,
	author,
	image,
  description,
  onClickDescription,
  itemIndex
}) => {
  return(
  	<article className="bookTile">
      <div className="bookTile__image-wrapper" 
          data-index={itemIndex}
          onClick={onClickDescription}>
        <img className="bookTile__image" 
              src={image} 
              alt={title}/>
      </div>
      <div className="bookTile__title" data-index={itemIndex} onClick={onClickDescription}>
        {title}
  		</div>
      <div className="bookTile__author" data-index={itemIndex} onClick={onClickDescription}>
        {author}
      </div>
    </article>
  )	
} 

export default BookTile;