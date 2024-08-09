import React, { useState } from 'react';
import searchIcon from '../../assets/icons/search.png';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="py-6 bg-lightGreen h-auto sm:h-24 flex justify-center items-center">
      <form
        className="border-2 bg-white border-white rounded-full h-12 w-3/4 flex justify-between ml-6 gap-1"
        onSubmit={handleSearch}
      >
        <button type="submit" aria-label="Search">
          <img src={searchIcon} className="h-6 mx-3" alt="search icon" />
        </button>
        <input
          type="text"
          className="focus:outline-none w-2/3"
          aria-label="Search"
          placeholder="Search online classes or teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-darkGreen text-white font-roboto text-lg sm:text-xl md:text-2xl lg:text-3xl w-2/5 sm:w-1/2 md:w-1/3 lg:w-1/6 rounded-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
