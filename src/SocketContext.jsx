import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { userData } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

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
      setNotifications((prevNotifications) => [...prevNotifications, data.content]);
    });

    socketIo.on('disconnect', () => {
      console.log('Disconnected');
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
      setNotifications([]); 
    };
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
