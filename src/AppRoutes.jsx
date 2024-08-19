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
import SearchBar from './components/search/SearchBar.jsx';
import RequestPasswordResetForm from './components/auth/RequestPasswordResetForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';
import Loader from './components/common/Loader.jsx'; //for testing purposes

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loader" element={<Loader />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="classes" element={<Classes />} />
              <Route path="add-class" element={<NewClassForm />} />
              <Route path="students" element={<Students />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="payments" element={<Payments />} />
            </Route>
          </Route>
          <Route path="/search" element={<SearchBar />} />
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
