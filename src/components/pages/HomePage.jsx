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
    <div className="flex flex-col my-auto lg:mx-auto lg:px-8 sm:mx-10 sm:my-12">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center sm:pl-2">
        <div className="lg:pt-36 pt-4 sm:pt-10 lg:text-left text-center items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-spartan font-semibold tracking-wide leading-tight pt-3 mb-8">
            Helping unlock<br/>
          your talent with<br/>
           the best teachers
          </h1>
          <button
            className="bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-2xl py-4 px-20 rounded-lg"
            onClick={search}
          >
            Get started
          </button>
        </div>

        <div className="m-10">
          <img className="w-[700px]" src={mainImage} alt="art skills image" />
        </div>
      </div>
     
      <div className="flex flex-col lg:flex-row items-center md:m-auto justify-center pt-16">
        <div className="relative w-full lg:max-w-lg md:pb-16 md:pl-4">
          <img
            className="scale-90 md:scale-110 lg:scale-100 -ml-4"
            src={GreenBlobImage}
            alt="green blob"
          />
          <div
            className="absolute top-1/3 left-1/8 transform -translate-y-1/2
        "
          >
            <div className="text-2xl lg:text-3xl  md:text-3xl sm:text-2xl  font-spartan font-semibold text-white text-left pl-32 lg:pl-24">
              Courses for<br/> every age
            </div>
          </div>
        </div>
        <div className="relative  w-full lg:max-w-lg md:pb-20">
          <img
          className="scale-125 md:scale-125 lg:scale-125"

            src={YellowBlobImage}
            alt="yellow blob"
          />
          <div className="absolute top-1/3 left-1/4 transform -translate-y-1/2 -ml-3">
            <div className="text-2xl lg:text-3xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white">
              More than 100+
              <br /> subject taught
            </div>
          </div>
        </div>
        <div className="relative  w-full lg:max-w-lg">
          <img
            className="scale-100 sm:scale-125 md:scale-125 lg:scale-125"
            src={PurpleBlobImage}
            alt="green blob"
          />
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -ml-6">
            <div className="text-2xl lg:text-3xl md:text-3xl  sm:text-2xl font-spartan font-semibold text-white text-left pl-3">
              1000+
              <br />
              experienced teachers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
