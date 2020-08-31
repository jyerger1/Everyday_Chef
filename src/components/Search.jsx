import React from "react";
import '../style/Search.css';

function Search({ search, handleChange, handleSubmit }) {
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className='search-box'
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search a Dish!"
        />
      </form>
    </div>
  );
}

export default Search;
