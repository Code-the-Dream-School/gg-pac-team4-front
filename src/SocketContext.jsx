import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';
import NotificationModal from './components/common/NotificationModal';

const SocketContext = createContext();

const setupSocketListeners = (
  socketIo,
  userId,
  setNotificationMessage,
  setIsModalOpen
) => {
  const handleNotification = (data) => {
    setNotificationMessage(data.content);
    setIsModalOpen(true);
  };

  socketIo.on(`applications-${userId}`, handleNotification);
  socketIo.on(`approveMessage-${userId}`, handleNotification);
  socketIo.on(`rejectMessage-${userId}`, handleNotification);
  socketIo.on(`newLesson-${userId}`, handleNotification);  
  socketIo.on(`editLesson-${userId}`, handleNotification);
  socketIo.on(`deleteLesson-${userId}`, handleNotification);

  socketIo.on('disconnect', () => {
    console.info('Disconnected');
  });
};

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
      console.info('Connected with socket ID:', socketIo.id);
    });

    setupSocketListeners(
      socketIo,
      userId,
      setNotificationMessage,
      setIsModalOpen
    );

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
