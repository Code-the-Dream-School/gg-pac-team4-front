
import React from 'react';
import GreenBlobImage from '../../assets/blob_green.png';
import PurpleBlobImage from '../../assets/blob_dusty_purple2.png';
import YellowBlobImage from '../../assets/blob_yellow.png';
import teamMembers from '../../data/teamData';
import ScrollToTop from '../layouts/ScrollToTop';
import MentorCard from './team-members-cards/MentorCard';
import MemberCard from './team-members-cards/MemberCard';


const TeamPage = () => {

  return (
    <>
      <section className="flex flex-col items-center justify-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl items-center font-spartan font-semibold tracking-wide leading-tight pt-3 mb-10">
          Meet Our Team
        </h1>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl"> Team Mentors</h2>
        <div className="w-full flex flex-wrap items-center justify-center mb-4">
          <MentorCard BlobImage={GreenBlobImage} teamMemberData={teamMembers[0]} cardShift="0" imgShift="24" textShift="8" />
          <MentorCard BlobImage={YellowBlobImage} teamMemberData={teamMembers[1]} cardShift="2" />
          <MentorCard BlobImage={PurpleBlobImage} teamMemberData={teamMembers[2]} cardShift="6" />
        </div>

        <h2 className="font-spartan font-semibold text-2xl lg:text-3xl mb-6">Team Members</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-10 mb-10">
          {[...Array(teamMembers.length).keys()]
            .filter(i => teamMembers[i].title.includes('Developer'))
            .filter(i => teamMembers[i].title.includes('Full-Stack'))
            .map(i => <MemberCard teamMemberData={teamMembers[i]} />)}
        </div>
        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-10 mb-10">
          {[...Array(teamMembers.length).keys()]
            .filter(i => teamMembers[i].title.includes('Developer'))
            .filter(i => teamMembers[i].title.includes('Front-End'))
            .map(i => <MemberCard teamMemberData={teamMembers[i]} />)}
        </div>
      </section >
      <ScrollToTop />
    </>
  );
};

export default TeamPage;
