
import React from 'react';
import GreenBlobImage from '../../assets/blob_green.png';
import PurpleBlobImage from '../../assets/blob_dusty_purple.png';
import YellowBlobImage from '../../assets/blob_yellow.png';
import teamMembers from '../../data/teamData';
import ScrollToTop from '../layouts/ScrollToTop';


const TeamPage = () => {

  return (
    <>
      <section className="flex flex-col items-center justify-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl items-center font-spartan font-semibold tracking-wide leading-tight pt-3 mb-10">
          Meet Our Team
        </h1>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl"> Team Mentors</h2>
        <div className="w-full flex flex-wrap items-center justify-center">
          <div
            className="w-full h-96 basis-full md:basis-1/3 flex flex-col items-center gap-1 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${GreenBlobImage})`,
            }}
          >
            <img
              src={teamMembers[0].src}
              alt={teamMembers[0].alt}
              className='w-40 h-40 rounded-full border-solid border-4 border-pureWhite mt-10 ms-16'
            />
            <p className='w-full font-spartan font-semibold text-white text-2xl lg:text-3xl text-center ms-10'>{teamMembers[0].name}</p>
            <p className='w-full font-spartan font-semibold text-white text-xl lg:text-2xl text-center ms-10'>{teamMembers[0].title}</p>
          </div>

          <div
            className="w-full h-96 basis-full md:basis-1/3 flex flex-col items-center gap-1 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${YellowBlobImage})` }}
          >
            <img
              src={teamMembers[1].src}
              alt={teamMembers[1].alt}
              className='w-40 h-40 rounded-full border-solid border-4 border-pureWhite mt-10'
            />
            <p className='w-full font-spartan font-semibold text-white text-2xl lg:text-3xl text-center'>{teamMembers[1].name}</p>
            <p className='w-full font-spartan font-semibold text-white text-xl lg:text-2xl text-center'>{teamMembers[1].title}</p>
          </div>

          <div
            className="w-full h-96 basis-full md:basis-1/3 flex flex-col items-center gap-1 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${PurpleBlobImage})` }}
          >
            <img
              src={teamMembers[2].src}
              alt={teamMembers[2].alt}
              className='w-40 h-40 rounded-full border-solid border-4 border-pureWhite mt-10'
            />
            <p className='w-full font-spartan font-semibold text-white text-2xl lg:text-3xl text-center'>{teamMembers[2].name}</p>
            <p className='w-full font-spartan font-semibold text-white text-xl lg:text-2xl text-center'>{teamMembers[2].title}</p>
          </div>
        </div>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl">Team Members</h2>
        <div className="w-full flex flex-col lg:flex-row lg:flex-wrap items-center justify-center">
          <div
            className="lg:basis-2/6 h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${GreenBlobImage})`, }}
          >
          </div>

          <div
            className="lg:basis-2/6 h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${YellowBlobImage})` }}
          >
          </div>

          <div
            className="lg:basis-2/6 h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${PurpleBlobImage})` }}
          >
          </div>

          <div
            className="lg:basis-2/6 h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${YellowBlobImage})` }}
          >
          </div>

          <div
            className="lg:basis-2/6 h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${PurpleBlobImage})` }}
          >
          </div>
        </div>
      </section >
      <ScrollToTop />
    </>
  );
};

export default TeamPage;
