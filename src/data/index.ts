// src/data/index.ts
import movies from './movies/movies-2026.json';
import events from './events/events-2026.json';
import functions from './functions/functions-2026.json';
import months from './months.json';
import eventTypes from './eventTypes.json';

export interface EventType {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface MonthData {
  id: number;
  name: string;
  shortName: string;
  days: number;
}

export interface MovieEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
  imageUrl?: string;
  director: string;
  cast: string[];
  duration: number;
  isMovie: true;
}

export interface FunctionEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
  location?: string;
  organizer: string;
  attendees: string[];
  isFunction: true;
  imageUrl?: string;
}

export interface GenericEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
  location?: string;
  imageUrl?: string;
}

export type Event = MovieEvent | FunctionEvent | GenericEvent;

// Combine all events
export const allEvents: Event[] = [
  ...movies,
  ...events,
  ...functions,
];

export { 
  movies,
  events,
  functions,
  months,
  eventTypes,
};

// Helper functions
export const getEventsByMonth = (year: number, month: number): Event[] => {
  const result: Event[] = [];
  
  allEvents.forEach(event => {
    const eventDate = new Date(event.date);
    const eventYear = eventDate.getFullYear();
    const eventMonth = eventDate.getMonth();
    const eventDay = eventDate.getDate();
    
    // Add the original event if it's in the requested month
    if (eventYear === year && eventMonth === month) {
      result.push(event);
    }
    
    // For movies, add anniversary events for each year after release
    if ('isMovie' in event && event.isMovie && eventYear < year) {
      const yearsPassed = year - eventYear;
      // Only add if we're in the same month and day as the original release
      if (eventMonth === month) {
        const anniversaryEvent = {
          ...event,
          id: `${event.id}-anniv-${year}`,
          date: new Date(year, eventMonth, eventDay).toISOString().split('T')[0],
          isAnniversary: true,
          originalDate: event.date,
          yearsPassed: yearsPassed
        };
        result.push(anniversaryEvent as Event);
      }
    }
  });
  
  return result;
};

export const getEventsByDate = (date: Date): Event[] => {
  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });
};

export const getEventById = (id: string): Event | undefined => {
  return allEvents.find(event => event.id === id);
};

export const getEventType = (typeId: string): EventType | undefined => {
  return eventTypes.find(type => type.id === typeId);
};

export const getMonthData = (monthIndex: number): MonthData | undefined => {
  return months[monthIndex];
};