import type { Event } from '../data';

type FilterOptions = {
  searchQuery?: string;
  eventType?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
};

export const filterEvents = (events: Event[], options: FilterOptions): Event[] => {
  return events.filter(event => {
    // Filter by search query (title, description, location)
    if (options.searchQuery) {
      const searchLower = options.searchQuery.toLowerCase();
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        (event.description?.toLowerCase().includes(searchLower) ?? false) ||
        (event.location?.toLowerCase().includes(searchLower) ?? false);
      
      if (!matchesSearch) return false;
    }

    // Filter by event type
    if (options.eventType && event.type !== options.eventType) {
      return false;
    }

    // Filter by date range
    if (options.dateRange) {
      const eventDate = new Date(event.date);
      if (eventDate < options.dateRange.start || eventDate > options.dateRange.end) {
        return false;
      }
    }

    return true;
  });
};

export const groupEventsByDate = (events: Event[]): Record<string, Event[]> => {
  return events.reduce<Record<string, Event[]>>((groups, event) => {
    const dateStr = new Date(event.date).toISOString().split('T')[0];
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(event);
    return groups;
  }, {});
};

export const sortEventsByDate = (events: Event[], ascending = true): Event[] => {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const filterEventsByType = (events: Event[], type: string): Event[] => {
  return events.filter(event => event.type === type);
};
