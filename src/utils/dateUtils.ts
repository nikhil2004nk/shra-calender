/**
 * Format a date to a readable string
 * @param date Date object or ISO string
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get the start and end dates of a month
 * @param year Full year (e.g., 2023)
 * @param month Month (0-11)
 * @returns Object with start and end dates of the month
 */
export const getMonthRange = (year: number, month: number) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59);
  return { startDate, endDate };
};

/**
 * Check if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if the dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Add days to a date
 * @param date Original date
 * @param days Number of days to add (can be negative)
 * @returns New date with days added
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get an array of days in a month
 * @param year Full year (e.g., 2023)
 * @param month Month (0-11)
 * @returns Array of dates in the month
 */
export const getDaysInMonth = (year: number, month: number): Date[] => {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
};

/**
 * Get the week number of a date
 * @param date Date object
 * @returns Week number (1-53)
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
