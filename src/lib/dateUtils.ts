export const getAnniversaryText = (releaseDate: string, currentDate: Date): string | null => {
  const release = new Date(releaseDate);
  const releaseYear = release.getFullYear();
  const currentYear = currentDate.getFullYear();
  const yearsPassed = currentYear - releaseYear;

  // Check if it's the same month and day
  const isAnniversary = 
    release.getMonth() === currentDate.getMonth() &&
    release.getDate() === currentDate.getDate();

  if (isAnniversary && yearsPassed > 0) {
    return `${yearsPassed} year${yearsPassed > 1 ? 's' : ''} of ${release.getFullYear()}`;
  }

  return null;
};
