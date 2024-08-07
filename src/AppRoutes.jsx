import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  EditProfile,
  Messages,
  Notifications,
  StudentLessons,
  StudentPayments,
  TeacherClasses,
  TeacherNewClassForm,
  TeacherSchedule,
  TeacherStudents,
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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="teacher-classes" element={<TeacherClasses />} />
                <Route path="teacher-add-class" element={<TeacherNewClassForm />} />
                <Route path="teacher-students" element={<TeacherStudents />} />
                <Route path="teacher-schedule" element={<TeacherSchedule/>} />
                <Route path="student-lessons" element={<StudentLessons />} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="messages" element={<Messages/>} />
                <Route path="student-payments" element={<StudentPayments/>} />
              </Route>
            </Route>
            <Route path="/search" element={<SearchBar />} />
            <Route path="/payment" element={<PaymentForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;