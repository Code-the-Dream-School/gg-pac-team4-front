import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getClassesData } from '../../util/DataBaseRequests';

const useSearch = (clearSearchTerm) => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const searchTerm = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  const fetchClasses = async (searchTerm = '', page = 1) => {
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
    } finally {
      setLoading(false);
    }
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
      setLoading(true);
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
    loading,
  };
};

export default useSearch;
