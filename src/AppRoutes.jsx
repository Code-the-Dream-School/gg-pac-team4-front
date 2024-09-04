import {
  AddClass,
  Classes,
  EditProfile,
  Lessons,
  Messages,
  Notifications,
  Payments,
  Students,
} from './components/pages/dashboard-pages/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard.jsx';
import Footer from './components/layouts/Footer.jsx';
import Header from './components/layouts/Header.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import PaymentForm from './components/payment/PaymentForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import React from 'react';
import Register from './components/auth/Register.jsx';
import RequestPasswordResetForm from './components/auth/RequestPasswordResetForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';
import SearchPage from './components/search/SearchPage';
import TeacherInfoPage from './components/pages/teacher-info-page/TeacherInfoPage.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/teacher-info/:teacherId"
            element={<TeacherInfoPage />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="classes" element={<Classes />} />
              <Route path="add-class" element={<AddClass />} />
              <Route path="students" element={<Students />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="notifications" element={<Notifications />} />
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
