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
      <h1>HOME PAGE</h1>
      <button onClick={search}>Search classes</button>
      <button onClick={login}>Log In</button>
      <button onClick={register}>Join</button>
    </>
  );
};

export default HomePage;