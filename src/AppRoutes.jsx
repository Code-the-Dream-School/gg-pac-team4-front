import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import SearchBar from './components/search/SearchBar.jsx';
import PaymentForm from './components/payment/PaymentForm.jsx';
import Footer from './components/layouts/Footer.jsx'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
