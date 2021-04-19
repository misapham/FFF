import React, { Component } from 'react';
import './BookDescription.css';

export default class BookDescription extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  }

  render(){
    const book = this.props.book;

    if(!this.props.show) {
      return null;
    }
    return (
      <div className="bookDescription">
         <button 
          className="bookDescription__close" 
          onClick={ e => {
            this.onClose(e);
          }}
        />
        <div className="bookDescription__content">
          <h2>{book.title} by {book.author}</h2>
          <h3>About the Book</h3>
          <p>{book.description}</p>
        </div>
      </div>
    )
  }
}

