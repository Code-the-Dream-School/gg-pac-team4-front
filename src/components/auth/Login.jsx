import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FormInput from "../common/FormInput";
import { login } from "../../util/DataBaseRequests "
import { useAuth } from "../../AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { isLoggedIn, loginAction } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormErrors({
        ...formErrors,
        email: !formData.email ? "Email is required" : null,
        password: !formData.password ? "Password is required" : null,
      });
      return;
    }

    try {
      const result = await login(formData);
      if (result.status === 200) {
        let userData = result.data.user;
        loginAction(true, userData);
        navigate("/dashboard");
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        form: "Invalid email or password",
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col gap-5 mt-16 items-center">
      <h1 className="font-spartan text-3xl">Log In</h1>
      <form className=" w-2/3 md:w-1/2 lg:w-1/3 xl:w-3/12" onSubmit={handleSubmit}>
        <p className="font-spartan mb-4">Don't have an account? <span><Link to="/register" className="underline">Sign Up</Link></span></p>
        {/* without passing the empty string in the placeholder attribute the floating label doesn't go back into the input */}
        {formErrors.email &&<p className="text-red text-sm font-spartan">{formErrors.email}</p>}
        {formErrors.form && <p className="text-red text-sm font-spartan">{formErrors.form}</p>}
        <FormInput 
              type="email" 
              placeholder=" " 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              >
                Email address
        </FormInput>
        {formErrors.password &&<p className="text-red text-sm font-spartan">{formErrors.password}</p>}
        {formErrors.form && <p className="text-red text-sm font-spartan">{formErrors.form}</p> }
        <FormInput 
              type="password" 
              placeholder=" " 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              >
                Password
        </FormInput>
        {/* <span className="flex items-center gap-1 mb-2">
          <input id="remember" type='checkbox' className="h-4 w-4 accent-red" />
          <label htmlFor="remember" className="font-spartan">Remember me</label>
        </span> */}
        <button type="submit" className="bg-red w-full hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg">Log In</button>
      </form>
    </div>
  );
};

export default Login;