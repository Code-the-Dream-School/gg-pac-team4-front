import { deleteClass, getUserData } from './DataBaseRequests';

import { useAuth } from '../AuthProvider';
import { useState } from 'react';

const useDeleteClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClassError, setDeleteClassError] = useState({ message: '' });
  const { userData, setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (token, classId, onRequestClose) => {
    try {
        setIsLoading(true);
      let response = await deleteClass(token, classId);
      if (response.status === 200) {
        const result = await getUserData(userData._id, token);
        setUserData((userData) => ({
          ...userData,
          myClasses: result.data.myClasses,
        }));
        setDeleteClassError({message: ''});
        setIsLoading(false);
      }
      onRequestClose();
    } catch (error) {
      setDeleteClassError({ message: 'Failed to delete this class. Please try again later.' });
      setIsLoading(false);
      onRequestClose();
      console.error('Error deleting class:', error);
    }
  };
  return {
    isModalOpen,
    openModal,
    closeModal,
    handleDelete,
    deleteClassError,
  };
};

export default useDeleteClass;
