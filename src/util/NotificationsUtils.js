export const sortClassesByApplicationDate = (classes) => {
  return classes.map((classInfo) => ({
    ...classInfo,
    applications: classInfo.applications
      .slice()
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)), // Descending
  }));
};

export const sortClassesByEarliestApplicationDate = (classes) => {
  return classes.slice().sort((a, b) => {
    const earliestDateA =
      a.applications.length > 0
        ? new Date(
            Math.min(...a.applications.map((app) => new Date(app.appliedAt)))
          )
        : new Date();
    const earliestDateB =
      b.applications.length > 0
        ? new Date(
            Math.min(...b.applications.map((app) => new Date(app.appliedAt)))
          )
        : new Date();

    return earliestDateB - earliestDateA; // Descending order
  });
};

export const formatDateWithWeekday = (dateString) => {
  const date = new Date(dateString);
  const optionsWithoutWeekday = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsWeekday = {
    weekday: 'long',
  };

  const dateWithoutWeekday = date.toLocaleDateString(
    'en-US',
    optionsWithoutWeekday
  );

  const weekday = date.toLocaleDateString('en-US', optionsWeekday);

  return `${dateWithoutWeekday}; ${weekday}`;
};

export const formatDateWithoutWeekday = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
