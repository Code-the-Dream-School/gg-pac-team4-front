import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from './UseSearch';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import FilterContainer from './FilterContainer';
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
    setCategory,
    loading,
  } = useSearch();

  useEffect(() => {
    if (initialSearchTerm) {
      handleSearch(initialSearchTerm);
    }
    if (category) {
      setCategory(category);
    }
  }, [initialSearchTerm, category]);

  return (
    <div>
      <SearchBar
        onSearch={(searchTerm) => {
          handleSearch(searchTerm);
          setSearchParams({ query: searchTerm });
        }}
        initialSearchTerm={initialSearchTerm}
      />
      <FilterContainer setCategory={setCategory} />
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
