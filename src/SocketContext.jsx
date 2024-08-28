import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';
import NotificationModal from '../src/components/common/notificationModal';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { userData } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (!userData) {
      console.error('No user data found');
      return;
    }

    const userId = userData._id;

    const socketIo = io('http://localhost:8000', {
      query: { userId: userId },
    });

    socketIo.on('connect', () => {
      console.log('Connected with socket ID:', socketIo.id);
    });

    socketIo.on(`applications-${userId}`, (data) => {
      console.log('Received notification:', data.content);
      setNotificationMessage(data.content);
      setIsModalOpen(true);
    });

    socketIo.on('disconnect', () => {
      console.log('Disconnected');
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
      setSocket(null); // Set socket to null on cleanup
    };
  }, [userData]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
      <NotificationModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={notificationMessage}
      />
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
