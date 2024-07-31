import FormInput from "../common/FormInput";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormErrors({
        ...formErrors,
        email: !formData.email ? "Email is required" : null,
        password: !formData.password ? "Password is required" : null,
      });
      return;
    }
  }
  console.log(formErrors)
  return (
    <div className="flex flex-col gap-5 mt-16 items-center">
      <h1 className="font-spartan text-3xl">Log In</h1>
      <form className=" w-2/3 md:w-1/3" onSubmit={handleSubmit}>
        <p className="font-spartan mb-4">Don't have an account? <span><Link to="/register" className="underline">Sign Up</Link></span></p>
        {/* without passing the empty string in the placeholder attribute the floating label doesn't go back into the input */}
        <p className="text-red text-sm font-spartan">{formErrors.email}</p>
        <FormInput 
              type="email" 
              placeholder=" " 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              >
                Email address
        </FormInput>
        {formErrors.password && <p className="text-red text-sm font-spartan">{formErrors.password}</p>}
        <FormInput 
              type="password" 
              placeholder=" " 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              >
                Password
        </FormInput>
        <span className="flex items-center gap-1 mb-2">
          <input id="remember" type='checkbox' className="h-4 w-4 accent-red" />
          <label htmlFor="remember" className="font-spartan">Remember me</label>
        </span>
        <button type="submit" className="bg-red w-full hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg">Log In</button>
      </form>
    </div>
  );
};

export default Login;