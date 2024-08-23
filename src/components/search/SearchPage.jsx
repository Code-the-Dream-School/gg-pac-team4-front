import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from './UseSearch';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Loader from '../common/Loader';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  const {
    classes,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    loading,
  } = useSearch();

  return (
    <div>
      <SearchBar
        //still need this functionality as it is connected with  searchBar input element and its clearing
        onSearch={(searchTerm) => {
          handleSearch(searchTerm);
          setSearchParams({ query: searchTerm });
        }}
        initialSearchTerm={initialSearchTerm}
      />
      {loading ? (
        <Loader />
      ) : (
        <SearchResults
          classes={classes}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
