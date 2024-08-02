import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/imgMainPage.jpg";
import GreenBlobImage from "../../assets/blob_green.png";
import YellowBlobImage from "../../assets/blob_yellow.png";
import PurpleBlobImage from "../../assets/blob_dusty_purple.png";
import items from "../../data/data";
import ArrowUp from "../../assets/icons/icons-arrow-up.png";
import ArrowSearch from "../../assets/icons/icon-search.svg";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const HomePage = () => {
  const navigate = useNavigate();

  const search = () => {
    navigate("/search");
  };

  return (
    <div className="flex flex-col w-10/12 my-auto lg:mx-auto mt-4 md:mt-12 my-12">
      <section className="flex flex-col lg:flex-row lg:justify-between xl:justify-between justify-center items-center">
        <div className="lg:text-left text-center lg:w-2/5 items-center justify-center xl:justify-between">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl items-center font-spartan font-semibold tracking-wide leading-tight pt-3 mb-8">
            Helping unlock your talent with the best teachers
          </h1>
          <div className="flex justify-center lg:justify-start">
            <button
              className="flex items-center bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-2xl py-2 w-3/5 justify-center rounded-lg"
              onClick={search}
            >
              Get started
              <img
                src={ArrowSearch}
                alt="Arrow Right"
                className="ml-4 w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 xl:mt-0">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl pt-0 lg:pt-20 xl:pt-0"
            src={mainImage}
            alt="art skills image"
          />
        </div>
      </section>
      <section className="flex flex-col lg:flex-row items-center justify-center">
        <div
          className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${GreenBlobImage})`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/12 lg:w-1/3 md:w-1/4 text-2xl lg:text-2xl xl:text-2xl md:text-3xl sm:text-2xl  font-spartan font-semibold text-white text-left">
              Courses for every age
            </div>
          </div>
        </div>
        <div
          className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${YellowBlobImage})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2/5 md:w-1/3 text-2xl lg:text-2xl xl:text-2xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white">
              Over 100 subject taught
            </div>
          </div>
        </div>

        <div
          className="relative w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${PurpleBlobImage})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/5 md:w-5/12 text-2xl lg:text-2xl xl:text-2xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white text-left pl-0 md:pl-10">
              1000+ experienced teachers
            </div>
          </div>
        </div>
      </section>
      <section className="relative px-4 py-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-center rounded-lg"
              >
                <img src={item.src} alt={item.alt} className="mr-2" />
                <p className="text-2xl font-spartan font-medium hover:text-darkGreen hover:cursor-pointer">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-2 bottom-8 bg-darkGreen rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-lightGreen"
          onClick={scrollToTop}
        >
          <img src={ArrowUp} alt="Arrow Up" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
