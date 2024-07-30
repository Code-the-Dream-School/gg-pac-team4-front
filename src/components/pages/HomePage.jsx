import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from '../../assets/imgMainPage.jpg'

const HomePage = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="flex space-between px-20 py-10">
      <div className="pt-36 pr-28">
        <h1 className="text-7xl font-spartan font-semibold text-left mb-8">Helping unlock<br /> your talent with<br /> the best teachers</h1>
        <button
          className="bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-lg py-1 px-7 rounded-lg"
          onClick={register}
        >
          Get started
        </button>
      </div>
      <div>
      <img src={mainImage} alt="" className="" />
      </div>
    </div>
  );
};

export default HomePage;
