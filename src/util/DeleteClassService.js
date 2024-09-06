import { deleteClass, getUserData } from './DataBaseRequests';

import { useAuth } from '../AuthProvider';
import { useState } from 'react';

const useDeleteClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (token, classId, onRequestClose, onError, onSelectedClass, onSelectedId) => {
    try {
        setIsLoading(true);
      let response = await deleteClass(token, classId);
      if (response.status === 200) {
        const result = await getUserData(userData._id, token);
        if(result.data.myClasses.length === 0) {
          onSelectedId(null);
          onSelectedClass(null);
        } else {
          onSelectedId(result.data.myClasses[0]);
        }
        setUserData((userData) => ({
          ...userData,
          myClasses: result.data.myClasses,
        }));
        setIsLoading(false);
        onError(''); 
        onRequestClose();//close modal
        
      }
    } catch (error) {
      onError('Failed to delete this class. Please try again later.');
      setIsLoading(false);
      onRequestClose();//close modal
      console.error('Error deleting class:', error);
    }
  };
  
  return {
    isModalOpen,
    openModal,
    closeModal,
    handleDelete,
    //deleteClassError,
  };
};

export default useDeleteClass;
