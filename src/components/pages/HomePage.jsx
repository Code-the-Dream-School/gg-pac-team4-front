import { useNavigate } from 'react-router-dom';
import Footer from "../layouts/Footer"
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
    <div className="flex flex-col min-h-screen">
   <main className="flex-grow p-4">
      <h1 className="text-3xl font-spartan font-bold">HOME PAGE</h1>
      <button onClick={search}>Search classes</button>
      <button onClick={login}>Log In</button>
      <button className='bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg' 
              onClick={register}>Join</button>
        </main>
        <Footer />
    </div>
 
    
  );
};

export default HomePage;