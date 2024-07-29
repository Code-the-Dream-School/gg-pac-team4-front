import { Link } from "react-router-dom";
import img from '../../assets/imgPage404.jpg';

const NotFound = () => {
  return (
    <div className="bg-pureWhite w-full h-screen flex flex-col gap-7 items-center mt-24">
      <h1 className="text-red font-bold text-2xl sm:text-4xl font-spartan uppercase">Page not found</h1>
      <img src={img} alt="Error 404" className="w-[350px] sm:w-[550px]"/>
      <Link className="text-black font-medium text-xl sm:text-2xl font-spartan" to="/">Back to main page</Link>
    </div>
  );
};

export default NotFound;