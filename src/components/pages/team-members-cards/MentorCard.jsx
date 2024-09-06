const MentorCard = ({
  BlobImage,
  teamMemberData,
  cardShift,
  imgShift,
  textShift
}) => {
  return (
    <div
      className={`w-full h-96 basis-full lg:basis-1/3 flex flex-col items-center gap-1 bg-contain bg-center bg-no-repeat ${cardShift ? 'pe-' + cardShift : ''}`}
      style={{
        backgroundImage: `url(${BlobImage})`,
      }}
    >
      <img
        src={teamMemberData.src}
        alt={teamMemberData.alt}
        className={`w-40 h-40 rounded-full border-solid border-4 border-pureWhite mt-14 ${imgShift ? 'ms-' + imgShift : ''}`}
      />
      <p className={`w-full font-spartan font-semibold text-white text-2xl lg:text-3xl text-center ${textShift ? 'ms-' + textShift : ''}`}>
        {teamMemberData.name}
      </p>
      <p className={`w-full font-spartan font-semibold text-white text-xl lg:text-2xl text-center ${textShift ? 'ms-' + textShift : ''}`}>
        {teamMemberData.title}
      </p>
    </div>
  );
};

export default MentorCard;
