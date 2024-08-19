import React, { useState, useEffect } from 'react';
import useSearch from './UseSearch';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import FilterButtons from './FilterContainer';

const SearchPage = () => {
  const {
    classes,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    setCategory,
  } = useSearch();

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterButtons setCategory={setCategory} />
      <SearchResults
        classes={classes}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
