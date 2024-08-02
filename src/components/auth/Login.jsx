import FormInput from '../common/FormInput';
const Login = () => {
  return (
    <>
      <h1>Login Form</h1>
      {/* testing how the inputs looks like */}
      <form>
        <FormInput id="email" type="email" placeholder=" ">
          Email address
        </FormInput>
        <FormInput id="password  " type="password" placeholder=" ">
          Password
        </FormInput>
      </form>
    </>
  );
};

export default Login;
