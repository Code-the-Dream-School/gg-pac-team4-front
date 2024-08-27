import { useSearchParams } from 'react-router-dom';
import useSearch from './UseSearch';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Loader from '../common/Loader';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('query') || '';

  const {
    classes,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    isLoading,
  } = useSearch();

  return (
    <div>
      <SearchBar initialSearchTerm={initialSearchTerm} />
      {isLoading ? (
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
