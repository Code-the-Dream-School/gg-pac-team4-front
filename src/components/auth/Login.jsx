import { useEffect, useState } from 'react';

import LoginForm from './LoginForm';
import { login } from '../../util/DataBaseRequests';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const { isLoggedIn, setUserSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormErrors({
        ...formErrors,
        email: !formData.email ? 'Email is required' : null,
        password: !formData.password ? 'Password is required' : null,
      });
      return;
    }

    try {
      const result = await login(formData);
      if (result.status === 200) {
        setUserSession(true, result.data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        form: 'Invalid email or password',
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn]);

  const handleRequestPasswordResetForm = () => navigate('/forgot-password');

  return (
    <div className="flex flex-col gap-5 mt-16 items-center">
      <h1 className="font-spartan text-3xl">Log In</h1>
      <LoginForm
        onSubmit={handleSubmit}
        formErrors={formErrors}
        formData={formData}
        handleChange={handleChange}
        onRequestPasswordResetForm={handleRequestPasswordResetForm}
      />
    </div>
  );
};

export default Login;
