import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getClassesData } from '../../util/DataBaseRequests';

const useSearch = (clearSearchTerm) => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchTerm = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  const fetchClasses = async (searchTerm = '', page = 1) => {
    setIsLoading(true);
    try {
      const limit = 5;
      const sortBy = 'classTitle';
      const sortOrder = 'asc';
      const data = await getClassesData(
        searchTerm,
        '',
        '',
        category,
        page,
        limit,
        sortBy,
        sortOrder
      );
      setClasses(data.classes || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error('Failed to fetch classes:', error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchClasses(searchTerm, currentPage);
  }, [searchTerm, currentPage, category]);

  const handleSearch = (searchTerm) => {
    setSearchParams({ query: searchTerm });
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event, searchTerm) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
      navigate(`/search?query=${searchTerm}`);
      clearSearchTerm();
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    classes,
    currentPage,
    totalPages,
    handleSearch,
    handleSearchSubmit,
    handlePageChange,
    isLoading,
  };
};

export default useSearch;
