import { useState, useCallback } from 'react';
import type { Event } from '../data';

export const useSearch = (events: Event[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchEvents = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simple case-insensitive search by title, description, and location
    const results = events.filter(event => {
      const searchableText = `${event.title} ${event.description || ''} ${event.location || ''}`.toLowerCase();
      return searchableText.includes(query.toLowerCase());
    });

    setSearchResults(results);
    setIsSearching(false);
  }, [events]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchEvents,
    clearSearch,
  };
};
