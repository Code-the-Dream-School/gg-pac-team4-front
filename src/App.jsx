import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import SearchForm from './components/search/SearchForm.jsx';
import PaymentForm from './components/payment/PaymentForm.jsx';
import './App.css';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
