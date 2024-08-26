import React from 'react';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './AuthProvider';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000')

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes socket={socket}/>
    </AuthProvider>
  );
};

export default App;
