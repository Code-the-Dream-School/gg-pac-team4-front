import React from 'react';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './AuthProvider';
import { SocketProvider } from './SocketContext';

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
