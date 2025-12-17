import type { Event } from '../../data';

interface EventBadgeProps {
  event: Event;
}

export const EventBadge: React.FC<EventBadgeProps> = ({ event }) => {
  const getEventColor = () => {
    if ('isMovie' in event && event.isMovie) return 'bg-purple-100 text-purple-800';
    if ('isFunction' in event && event.isFunction) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div 
      className={`text-xs px-2 py-1 rounded truncate ${getEventColor()}`}
      title={event.title}
    >
      {event.title}
    </div>
  );
};
