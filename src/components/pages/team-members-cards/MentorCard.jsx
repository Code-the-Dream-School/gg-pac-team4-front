const MentorCard = ({
  BlobImage,
  teamMemberData,
  cardClassName,
  imgClassName,
  textClassName
}) => {
  return (
    <div
      className={`w-full h-96 basis-full lg:basis-1/3 flex flex-col items-center gap-1 bg-contain bg-center bg-no-repeat ${cardClassName}`}
      style={{
        backgroundImage: `url(${BlobImage})`,
      }}
    >
      <img
        src={teamMemberData.src}
        alt={teamMemberData.alt}
        className={`w-40 h-40 rounded-full border-solid border-4 border-pureWhite mt-14 ${imgClassName}`}
      />
      <p className={`w-full font-spartan font-semibold text-white text-2xl lg:text-3xl text-center ${textClassName}`}>
        {teamMemberData.name}
      </p>
      <p className={`w-full font-spartan font-semibold text-white text-xl lg:text-2xl text-center ${textClassName}`}>
        {teamMemberData.title}
      </p>
    </div>
  );
};

export default MentorCard;
