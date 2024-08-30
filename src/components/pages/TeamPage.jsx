
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

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl items-center font-spartan font-semibold tracking-wide leading-tight pt-3 mb-8">
          Meet Our Team
        </h1>

        <h2> Team Mentors</h2>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
          <div
            className="w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${GreenBlobImage})`,
            }}
          >
          </div>

          <div
            className="w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${YellowBlobImage})` }}
          >
          </div>

          <div
            className="w-full h-80 md:h-96 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${PurpleBlobImage})` }}
          >
          </div>
        </div>

        <h2> Team Members</h2>
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
      </section>
      <ScrollToTop />
    </>
  );
};

export default TeamPage;
