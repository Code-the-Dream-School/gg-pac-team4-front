import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const userId = user?._id;
    

    if (userId) {
      const socketIo = io('http://localhost:8000', {
        query: { userId: userId },
      });

      socketIo.on('connect', () => {
        console.log('Connected with socket ID:', socketIo.id);
      });

      socketIo.on(`applications-${userId}`, (data) => {
        console.log('Received notification:', data.content);
      });

      socketIo.on('disconnect', () => {
        console.log('Disconnected');
      });

      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
        // Clear notifications when socket disconnects
        setNotifications([]);
      };
    } else {
      console.error('No user data found in sessionStorage');
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
