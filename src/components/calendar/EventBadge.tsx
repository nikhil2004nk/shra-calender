import type { Event, MovieEvent, FunctionEvent } from '../../data';

interface EventBadgeProps {
  event: Event;
}

export const EventBadge: React.FC<EventBadgeProps> = ({ event }) => {
  const getEventColor = () => {
    if (isMovieEvent(event)) return 'bg-purple-100 text-purple-800';
    if (isFunctionEvent(event)) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  // Type guards
  function isMovieEvent(event: Event): event is MovieEvent {
    return 'isMovie' in event && event.isMovie === true;
  }

  function isFunctionEvent(event: Event): event is FunctionEvent {
    return 'isFunction' in event && event.isFunction === true;
  }

  return (
    <div 
      className={`text-xs px-2 py-1 rounded truncate ${getEventColor()}`}
      title={event.title}
    >
      {event.title}
    </div>
  );
};
