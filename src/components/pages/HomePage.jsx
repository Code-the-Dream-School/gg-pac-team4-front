import React from 'react';
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/imgMainPage.jpg";
import GreenBlobImage from "../../assets/blob_green.jpg";
import YellowBlobImage from "../../assets/blob_yellow.jpg";
import PurpleBlobImage from "../../assets/blob_dusty_purple.jpg";
import items from "../../data/data"
import ArrowUp from "../../assets/icons/icons-arrow-up.png";
import ArrowSearch from "../../assets/icons/icon-search.svg";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const HomePage = () => {
  const navigate = useNavigate();

  const search = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col my-auto lg:mx-auto lg:px-8 sm:mx-10 sm:my-12">
      <section className="flex flex-col lg:flex-row lg:justify-between justify-center sm:pl-2">
        <div className="lg:pt-36 pt-4 sm:pt-10 lg:text-left text-center items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-spartan font-semibold tracking-wide leading-tight pt-3 mb-8">
            Helping unlock
            <br />
            your talent with
            <br />
            the best teachers
          </h1>
          <div className="flex justify-center lg:justify-start">
          <button
            className="flex items-center bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-2xl py-4 px-8 rounded-lg"
            onClick={search}
          >
            Get started
            <img src={ArrowSearch} alt="Arrow Right" className="ml-4 w-6 h-6" />
          </button>
          </div>
         
        </div>

        <div className="m-10">
          <img className="w-[700px]" src={mainImage} alt="art skills image" />
        </div>
      </section>
      <section className="flex grow flex-col lg:flex-row items-center justify-center pt-2 lg:pt-16">
      <div
        className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${GreenBlobImage})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl lg:text-2xl xl:text-3xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white text-center">
            Courses for
            <br /> every age
          </div>
        </div>
      </div>
        <div
        className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${YellowBlobImage})` }}
      >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl lg:text-2xl xl:text-3xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white">
              Over 100
              <br /> subject taught
            </div>
          </div>
        </div>
        
        <div
        className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PurpleBlobImage})` }}
      >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl lg:text-2xl xl:text-3xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white text-left pl-10">
              1000+
              <br />
              experienced teachers
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div key={index} className="flex items-center text-center p-6 rounded-lg ">
                <img src={item.src} alt={item.alt} className="w-16 h-16 m-4" />
                <p className="text-2xl font-medium  transition-colors duration-300 hover:text-darkGreen hover:cursor-pointer transition-shadow">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute bottom-2 right-4 bg-darkGreen rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-lightGreen"
          onClick={scrollToTop}
        >
          <img src={ArrowUp} alt="Arrow Up" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
