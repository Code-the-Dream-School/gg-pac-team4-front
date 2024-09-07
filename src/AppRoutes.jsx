import {
  AddClass,
  Classes,
  EditClass,
  EditProfile,
  Lessons,
  Notifications,
  Students
} from './components/pages/dashboard-pages/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ClassInfoPage from './components/pages/info-pages/ClassInfoPage';
import Dashboard from './components/pages/Dashboard.jsx';
import Footer from './components/layouts/Footer.jsx';
import Header from './components/layouts/Header.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import React from 'react';
import Register from './components/auth/Register.jsx';
import RequestPasswordResetForm from './components/auth/RequestPasswordResetForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';
import SearchPage from './components/search/SearchPage';

const AppRoutes = ({ socket }) => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/class-info/:classId" element={<ClassInfoPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard socket={socket} />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="classes" element={<Classes />} />
              <Route path="add-class" element={<AddClass />} />
              <Route path="edit-class/:classId" element={<EditClass/>} />
              <Route path="students" element={<Students />} />
              <Route path="lessons" element={<Lessons />} />
              <Route
                path="applications"
                element={<Notifications socket={socket} />}
              />
            </Route>
          </Route>
          <Route path="/search" element={<SearchPage />} />
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