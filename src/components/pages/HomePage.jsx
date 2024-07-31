import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/imgMainPage.jpg";
import GreenBlobImage from "../../assets/blob_green.jpg";
import YellowBlobImage from "../../assets/blob_yellow.jpg";
import PurpleBlobImage from "../../assets/blob_dusty_purple.jpg";
import Music from "../../assets/icons/icons-musical.png";
import Acting from "../../assets/icons/icons8-acting.png";
import Storytelling from "../../assets/icons/icons8-storytelling.png";
import Arts from "../../assets/icons/icons-art.png";
import Photography from "../../assets/icons/icons8-photography.png";
import Games from "../../assets/icons/icons-chess.png";
import Films from "../../assets/icons/icons8-film.png";
import Animation from "../../assets/icons/icons8-3d.png";
import Handicraft from "../../assets/icons/icons8-hand-holding.png"

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
      </section>
     
      <section className="flex flex-col lg:flex-row items-center md:m-auto justify-center pt-16">
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
        <div className="relative  w-full lg:max-w-lg pb-20 md:pb-20">
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
            className="scale-100 sm:scale-125 md:scale-125 lg:scale-125 mt-0 lg:-mt-24"
            src={PurpleBlobImage}
            alt="green blob"
          />
          <div className="absolute top-1/4 left-1/4 transform -translate-y-1/2">
            <div className="text-2xl lg:text-3xl md:text-3xl sm:text-2xl font-spartan font-semibold text-white text-left pl-3 mt-24">
              1000+
              <br />
              experienced teachers
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
      <div className="container mx-auto px-4">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Music} alt="Music Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Music</p>
          </div>
          <div className="flex items-center text-center p-6 rounded-lg">
            <img src={Acting} alt="Acting Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Acting Skills</p>
          </div>
          <div className="flex items-center text-center p-6 rounded-lg">
            <img src={Storytelling} alt="Storytelling Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Storytelling</p>
          </div>
          <div className="flex items-center text-center p-6 rounded-lg">
            <img src={Arts} alt="Arts Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Arts</p>
          </div>
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Photography} alt="Photography Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Photography</p>
          </div>
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Games} alt="Games Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Games & Hobbies</p>
          </div>
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Films} alt="Tape Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Film production</p>
          </div>
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Animation} alt="Cube Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">3D & Animation</p>
          </div>
          <div className="flex  items-center text-center p-6 rounded-lg">
            <img src={Handicraft} alt="Hands Icon" className="w-16 h-16 mb-4" />
            <p className="text-2xl font-medium pl-2">Handicraft</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HomePage;
