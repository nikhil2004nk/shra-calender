export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  type: string;
  description?: string;
  imageUrl?: string;
  location?: string;
  isMovie?: boolean;
  isFunction?: boolean;
}

export interface MovieEvent extends Event {
  isMovie: true;
  director: string;
  cast: string[];
  duration: number; // in minutes
}

export interface FunctionEvent extends Event {
  isFunction: true;
  organizer: string;
  attendees: string[];
}

export type EventType = 'movie' | 'function' | 'other';

export interface MonthData {
  id: number;
  name: string;
  shortName: string;
  days: number;
}
