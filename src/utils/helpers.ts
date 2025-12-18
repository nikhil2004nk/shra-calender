import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names or class name objects
 * @returns A single string of combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a specified length and adds an ellipsis if needed
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}…`;
}

/**
 * Formats a date to a readable string
 * @param date - Date object or date string
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a time range
 * @param start - Start time
 * @param end - End time
 * @returns Formatted time range (e.g., "2:00 PM - 3:30 PM")
 */
export function formatTimeRange(start: Date | string, end: Date | string): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  
  const startTime = new Date(start).toLocaleTimeString('en-US', formatOptions);
  const endTime = new Date(end).toLocaleTimeString('en-US', formatOptions);
  
  return `${startTime} - ${endTime}`;
}
