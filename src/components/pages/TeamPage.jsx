
import React from 'react';
import GreenBlobImage from '../../assets/blob_green.png';
import PurpleBlobImage from '../../assets/blob_dusty_purple2.png';
import YellowBlobImage from '../../assets/blob_yellow.png';
import teamMembers from '../../data/teamData';
import ScrollToTop from '../layouts/ScrollToTop';
import MentorCard from './team-members-cards/MentorCard';


const TeamPage = () => {

  return (
    <>
      <section className="flex flex-col items-center justify-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl items-center font-spartan font-semibold tracking-wide leading-tight pt-3 mb-10">
          Meet Our Team
        </h1>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl"> Team Mentors</h2>
        <div className="w-full flex flex-wrap items-center justify-center mb-4">
          <MentorCard BlobImage={GreenBlobImage} teamMemberData={teamMembers[0]} imgShift="12" textShift="8"/>
          <MentorCard BlobImage={YellowBlobImage} teamMemberData={teamMembers[1]} cardShift="2"/>
          <MentorCard BlobImage={PurpleBlobImage} teamMemberData={teamMembers[2]} cardShift="6"/>
        </div>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl mb-6">Team Members</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-10 mb-10">

          <div className="w-60 basis-60 flex flex-col items-center gap-3">
            <img
              src={teamMembers[3].src}
              alt={teamMembers[3].alt}
              className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
            />
            <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">{teamMembers[3].name}</p>
            <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">{teamMembers[3].title}</p>
          </div>

          <div className="w-60 basis-60 flex flex-col items-center gap-3">
            <img
              src={teamMembers[4].src}
              alt={teamMembers[4].alt}
              className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
            />
            <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">{teamMembers[4].name}</p>
            <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">{teamMembers[4].title}</p>
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-10 mb-10">

          <div className="w-60 basis-60 flex flex-col items-center gap-3">
            <img
              src={teamMembers[5].src}
              alt={teamMembers[5].alt}
              className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
            />
            <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">{teamMembers[5].name}</p>
            <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">{teamMembers[5].title}</p>
          </div>

          <div className="w-60 basis-60 flex flex-col items-center gap-3">
            <img
              src={teamMembers[6].src}
              alt={teamMembers[6].alt}
              className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
            />
            <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">{teamMembers[6].name}</p>
            <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">{teamMembers[6].title}</p>
          </div>

          <div className="w-60 basis-60 flex flex-col items-center gap-3">
            <img
              src={teamMembers[7].src}
              alt={teamMembers[7].alt}
              className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
            />
            <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">{teamMembers[7].name}</p>
            <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">{teamMembers[7].title}</p>
          </div>
        </div>
      </section >
      <ScrollToTop />
    </>
  );
};

export default TeamPage;
