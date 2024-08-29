import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/icons/img_search.svg';
import deleteSearchIcon from '../../assets/icons/delete-search.svg';

const SearchBar = ({ onSearch, initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="py-6 bg-lightGreen h-auto sm:h-24 flex justify-center items-center">
      <form
        className="border-2 bg-white border-white rounded-full h-12 w-3/4 flex justify-between ml-6 gap-1"
        onSubmit={handleSearch}
      >
        <button type="submit">
          <img src={searchIcon} className="h-6 mx-3" alt="search icon" />
        </button>
        <input
          type="text"
          className="focus:outline-none w-2/3"
          aria-label="Search input"
          placeholder="Search online classes or teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleClear}>
          <img src={deleteSearchIcon} alt="clear search icon" />
        </button>
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
