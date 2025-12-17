import { EventCard } from '../events/EventCard';
import type { CalendarItem } from '../../utils/types';

interface SearchResultsProps {
  results: CalendarItem[];
  query: string;
  onEventClick: (event: CalendarItem) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onEventClick,
}) => {
  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="mt-2 text-lg font-medium text-gray-900">Search for events</p>
          <p className="mt-1 text-sm">
            Type in the search bar to find events, movies, or functions
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-lg font-medium text-gray-900">No results found</p>
          <p className="mt-1 text-sm">
            We couldn't find any events matching "{query}"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={() => onEventClick(event)} 
          />
        ))}
      </div>
    </div>
  );
};
