import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard.jsx';
import Footer from './components/layouts/Footer.jsx'
import Header from './components/layouts/Header.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import PaymentForm from './components/payment/PaymentForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Register from './components/auth/Register.jsx';
import SearchBar from './components/search/SearchBar.jsx';
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/search" element={<SearchBar />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Routes> 
      </main>     
      <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;