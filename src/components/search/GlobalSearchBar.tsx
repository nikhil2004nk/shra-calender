import { useState, useRef, useEffect } from 'react';
import type { Event } from '../../data';

interface GlobalSearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  results: Event[];
  onResultClick: (event: Event) => void;
  placeholder?: string;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSearch,
  onClear,
  results,
  onResultClick,
  placeholder = 'Search events...',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      onSearch(value);
    } else {
      onClear();
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {isFocused && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1 max-h-96 overflow-y-auto">
            {results.map((event) => (
              <button
                key={event.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  onResultClick(event);
                  setIsFocused(false);
                }}
              >
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                  {event.location && ` • ${event.location}`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
