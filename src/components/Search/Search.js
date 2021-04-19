import React from 'react';
import './Search.css'

const Search = ({ handleSearch }) => {
  return(
    <div>
      <div className="search">
        <input 
          type="search"
          id="searchField" 
          onChange={e => handleSearch(e.target.value)}
          placeholder="Find a book..."
          autoComplete="off"
          autoCorrect="off"
          className="search__input"
        />
      </div>
    </div>
  )
}

export default Search;