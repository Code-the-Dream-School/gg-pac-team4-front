import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/imgMainPage.jpg";
import GreenBlobImage from "../../assets/blob_green.jpg";
import YellowBlobImage from "../../assets/blob_yellow.jpg";
import PurpleBlobImage from "../../assets/blob_dusty_purple.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const search = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col lg:justify-between lg:mx-20 sm:mx-10 my-6 sm:my-12 mx-4">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center sm:pl-2">
        <div className="lg:pt-36 lg:text-left text-center items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-spartan font-semibold tracking-wider leading-tight pt-3 sm:pt-20 mb-8">
            Helping unlock
            <br /> your talent with
            <br /> the best teachers
          </h1>
          <button
            className="bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-2xl py-4 px-20 rounded-lg"
            onClick={search}
          >
            Get started
          </button>
        </div>

        <div className="lg:my-0 sm:my-20">
          <img className="scale-75" src={mainImage} alt="art skills image" />
        </div>
      </div>
      <div className="flex grow flex-col lg:flex-row pt-3">
        <div className="relative w-full lg:max-w-lg">
          <img
            className="lg:scale-100 md:scale-125 md:pl-10 mb-10"
            src={GreenBlobImage}
            alt="green blob"
          />
          <div
            className="absolute inset-0 flex items-center justify-start md:pl-48 pl-24 pb-24
        "
          >
            <span className="text-3xl  font-spartan font-semibold text-white text-left">
              Courses for
              <br /> every age
            </span>
          </div>
        </div>
        <div className="relative w-full lg:max-w-lg pt-4">
          <img
            className="w-full scale-125  mb-10"
            src={YellowBlobImage}
            alt="yellow blob"
          />
          <div className="absolute inset-0 flex items-start lg:pt-32 pt-24 lg:pl-32 pl-20">
            <span className="text-3xl  font-spartan font-semibold text-white">
              More than 100+
              <br /> subject taught
            </span>
          </div>
        </div>
        <div className="relative w-full lg:max-w-lg">
          <img
            className="w-full scale-110"
            src={PurpleBlobImage}
            alt="green blob"
          />
          <div className="absolute inset-0 flex items-center justify-start pl-24 lg:pl-32 md:pl-48 pl-24">
            <span className="text-3xl  font-spartan font-semibold text-white text-left pl-3">
              1000+
              <br />
              experienced teachers
            </span>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default HomePage;
