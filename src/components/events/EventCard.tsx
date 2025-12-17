import type { Event, MovieEvent, FunctionEvent } from '../../data';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

// Type guards
function isMovieEvent(event: Event): event is MovieEvent {
  return 'isMovie' in event && event.isMovie === true;
}

function isFunctionEvent(event: Event): event is FunctionEvent {
  return 'isFunction' in event && event.isFunction === true;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getEventTypeColor = () => {
    if (isMovieEvent(event)) return 'bg-purple-100 text-purple-800';
    if (isFunctionEvent(event)) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getEventType = () => {
    if (isMovieEvent(event)) return 'Movie';
    if (isFunctionEvent(event)) return 'Function';
    return 'Event';
  };

  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {event.imageUrl && (
        <div className="h-32 bg-gray-200 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor()}`}>
            {getEventType()}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()}
        </p>
        {event.location && (
          <p className="mt-2 text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {event.location}
          </p>
        )}
        {(isMovieEvent(event) || isFunctionEvent(event)) && (
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">•</span>
            <span>{isMovieEvent(event) ? 'Movie' : 'Function'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
