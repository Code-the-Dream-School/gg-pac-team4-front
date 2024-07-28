import { Link } from "react-router-dom";
import img from '../../assets/notFound.png';

const NotFound = () => {
  return (
    <div className="bg-lightGreen w-full h-screen flex flex-col items-center pt-5">
      <img src={img} alt="Error 404" height="350px"/>
      <Link className="text-white font-medium text-2xl font-spartan" to="/">Back to main page</Link>
    </div>
  );
};

export default NotFound;