import React, { useState, useEffect } from 'react'; // Added useEffect
import { getClassesData } from '../../util/DataSearchRequests';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  const fetchClasses = async (page = 1) => {
    try {
      const data = await getClassesData(search, page);
      setClasses(data.classes);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Failed to fetch classes:', error.message);
    }
  };

  // Fetch classes when search term or current page changes
  useEffect(() => {
    fetchClasses(currentPage);
  }, [search, currentPage]);

  // Handle search action
  const handleSearch = () => {
    fetchClasses(1); // Reset to first page on new search
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
