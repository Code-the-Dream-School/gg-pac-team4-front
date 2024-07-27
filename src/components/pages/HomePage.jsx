import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const search = () => {
    navigate("/search");
  };
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };


  return (
    <>
      <h1 className="text-3xl font-spartan font-bold">HOME PAGE</h1>
      <button onClick={search}>Search classes</button>
      <button onClick={login}>Log In</button>
      <button className='bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg' 
              onClick={register}>Join</button>
    </>
  );
};

export default HomePage;