import ArrowSearch from '../../assets/icons/icon-search.svg';
import GreenBlobImage from '../../assets/blob_green.png';
import PurpleBlobImage from '../../assets/blob_dusty_purple.png';
import React from 'react';
import ScrollToTop from '../layouts/ScrollToTop';
import YellowBlobImage from '../../assets/blob_yellow.png';
import items from '../../data/data';
import mainImage from '../../assets/imgMainPage.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const search = () => {
    navigate('/search');
  };
  return (
    <div className="flex flex-col w-full lg:w-11/12 lg:mx-auto mt-4">
      <section className="flex flex-col-reverse lg:flex-row lg:justify-between justify-center items-center">
        <div className="lg:text-left text-center lg:w-1/2 p-2">
          <h1 className="text-4xl md:text-5xl xl:text-6xl items-center font-spartan font-semibold tracking-wide pt-3 mb-8 xs:w-5/6 h-full">
            Helping unlock your talent with the best teachers
          </h1>
          <div className="flex justify-center lg:justify-start">
            <button
              className="flex items-center bg-red hover:bg-pureWhite hover:text-red hover:border-2 hover:border-red text-white font-spartan font-semibold text-xl md:text-2xl py-2 h-12 w-3/5 justify-center rounded-lg"
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
        <div className="w-4/5 md:w-5/12 flex justify-end">
          <img
            src={mainImage}
            alt="art skills image"
          />
        </div>
      </section>
      <section className="flex flex-col sm:flex-row items-center justify-center">
        <div
          className="w-full h-60 sm:h-80 md:h-96 bg-contain bg-center bg-no-repeat flex justify-center items-center"
          style={{
            backgroundImage: `url(${GreenBlobImage})`,
          }}
        >
          <p className='font-spartan font-semibold text-white text-2xl lg:text-3xl w-1/5 sm:w-1/3'>
            Courses for every age
          </p>
        </div>
        <div
          className="w-full h-60 sm:h-80 md:h-96  bg-contain bg-center bg-no-repeat flex justify-center items-center"
          style={{ backgroundImage: `url(${YellowBlobImage})` }}
        >
          <p className='font-spartan font-semibold text-white text-2xl lg:text-3xl w-1/5 sm:w-1/3'>
            Over 100 subject taught
          </p>
        </div>
        <div
          className="w-full h-60 sm:h-80 md:h-96 bg-contain bg-center bg-no-repeat flex justify-center items-center"
          style={{ backgroundImage: `url(${PurpleBlobImage})` }}
        >
          <p className='font-spartan font-semibold text-white text-2xl lg:text-3xl w-1/5 sm:w-1/3'>
            1000+ experienced teachers
          </p>
        </div>
      </section>
      <section className="px-4 py-8 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:w-10/12">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-center rounded-lg"
              >
                <img src={item.src} alt={item.alt} className="mr-2" />
                <p className="text-xl md:text-2xl font-spartan font-medium hover:text-darkGreen hover:cursor-pointer">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
      </section>
    <ScrollToTop/>
    </div>
  );
};

export default HomePage;
