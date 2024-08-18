import { getClassesData } from '../../util/DataBaseRequests';
import { useState, useEffect } from 'react';
const useSearch = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

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
    }
  };

  useEffect(() => {
    fetchClasses(search, currentPage);
  }, [search, currentPage, category]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setCurrentPage(1);
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
    handlePageChange,
    setCategory,
  };
};

export default useSearch;
