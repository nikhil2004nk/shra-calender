import { EventCard } from './EventCard';
import type { Event } from '../../data';

interface EventListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  emptyMessage?: string;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  emptyMessage = 'No events found',
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick?.(event)}
        />
      ))}
    </div>
  );
};
