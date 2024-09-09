const MemberCard = ({ teamMemberData }) => {
  return (
    <div className="w-60 basis-60 flex flex-col items-center gap-3">
      <img
        src={teamMemberData.src}
        alt={teamMemberData.alt}
        className="w-36 h-36 rounded-full border-solid border-4 border-darkGreen"
      />
      <p className="w-full font-spartan font-semibold text-xl lg:text-2xl text-center">
        {teamMemberData.name}
      </p>
      <p className="w-full font-spartan font-semibold text-lg lg:text-xl text-center">
        {teamMemberData.title}
      </p>
    </div>
  );
};

export default MemberCard;
