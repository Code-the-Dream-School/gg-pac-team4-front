import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Classes,
  EditProfile,
  Lessons,
  Messages,
  NewClassForm,
  Notifications,
  Payments,
  Schedule,
  Students,
} from './components/pages/dashboard-pages/index.js';

import Dashboard from './components/pages/Dashboard.jsx';
import Footer from './components/layouts/Footer.jsx';
import Header from './components/layouts/Header.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import PaymentForm from './components/payment/PaymentForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Register from './components/auth/Register.jsx';
import RequestPasswordResetForm from './components/auth/RequestPasswordResetForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';
import SearchPage from './components/search/SearchPage';

const AppRoutes = ({socket}) => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard socket={socket}/>}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="classes" element={<Classes />} />
              <Route path="add-class" element={<NewClassForm />} />
              <Route path="students" element={<Students />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="notifications" element={<Notifications socket={socket}/>} />
              <Route path="messages" element={<Messages />} />
              <Route path="payments" element={<Payments />} />
            </Route>
          </Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route
            path="/forgot-password"
            element={<RequestPasswordResetForm />}
          />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
