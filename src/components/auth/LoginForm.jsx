import FormInput from "../common/FormInput";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit, formErrors, formData, handleChange }) => {
    return(
        <form className=" w-2/3 md:w-1/2 lg:w-1/3 xl:w-3/12" onSubmit={onSubmit}>
            <p className="font-spartan mb-4">Don't have an account? <span><Link to="/register" className="underline">Sign Up</Link></span></p>
            {/* without passing the empty string in the placeholder attribute the floating label doesn't go back into the input */}
            {formErrors.email && <p className="text-red text-sm font-spartan">{formErrors.email}</p>}
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
            {formErrors.password && <p className="text-red text-sm font-spartan">{formErrors.password}</p>}
            {formErrors.form && <p className="text-red text-sm font-spartan">{formErrors.form}</p>}
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
    );
};

export default LoginForm;