// src/components/calendar/DayCell.tsx
import { cn } from '../../lib/utils';
import { getEventType } from '../../data';
import type { Event } from '../../data';
import { getAnniversaryText } from '../../lib/dateUtils';
import { Popcorn } from 'lucide-react';

interface DayCellProps {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  events: Event[];
  onEventClick?: (event: Event) => void;  // Make it optional
}

export const DayCell: React.FC<DayCellProps> = ({ 
  day, 
  isCurrentMonth, 
  isToday = false, 
  events = [],
  onEventClick 
}) => {
  return (
    <div 
      className={cn(
        "p-2 min-h-[100px] border border-gray-200 relative",
        "flex flex-col",
        isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
        isToday && 'bg-blue-50 border-blue-300'
      )}
    >
      <div className="flex justify-between items-start">
        <span 
          className={cn(
            "text-sm font-medium",
            isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
            isToday && 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
          )}
        >
          {day}
        </span>
        {events.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
            {events.length}
          </span>
        )}
      </div>
      <div className="mt-1 space-y-1 flex-1 overflow-y-auto max-h-32">
        {events.slice(0, 3).map((event) => {
          const eventType = getEventType(event.type);
          const isMovie = 'isMovie' in event && event.isMovie;
          const bgColor = eventType?.color ? `${eventType.color}20` : 'bg-gray-100';
          const textColor = eventType?.color || 'text-gray-800';
          const borderColor = eventType?.color ? `border-${eventType.color}-500` : 'border-gray-500';
          
          // Get anniversary text for movies
          const anniversaryText = isMovie && event.date 
            ? getAnniversaryText(event.date, new Date())
            : null;
          
          return (
            <div 
              key={event.id}
              className={`text-xs p-1.5 rounded ${bgColor} ${textColor} border-l-4 ${borderColor} hover:shadow-sm transition-shadow`}
              title={event.title}
              onClick={(e) => {
  e.stopPropagation();
  onEventClick?.(event);
}}
            >
              <div className="flex items-start">
                {isMovie && (
                  <Popcorn className="flex-shrink-0 w-3 h-3 mt-0.5 mr-1 text-amber-600" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate group relative">
                    {event.title}
                    {'director' in event && (
                      <div className="absolute left-0 -top-20 bg-gray-800 text-white text-xs px-2 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none shadow-lg min-w-[200px] transform -translate-x-1/2 left-1/2">
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-gray-300">Directed by {event.director}</div>
                        {'cast' in event && event.cast.length > 0 && (
                          <div className="text-gray-400 truncate">Starring: {event.cast.join(', ')}</div>
                        )}
                      </div>
                    )}
                  </div>
                  {anniversaryText && (
                    <div className="mt-1 text-xs font-medium text-yellow-800 bg-yellow-100 border border-yellow-200 px-2 py-1 rounded-md flex items-center shadow-sm">
                      <span className="text-yellow-600 mr-1">🎉</span>
                      <span className="font-medium">{anniversaryText}</span>
                      {'releaseYear' in event ? (
                        <span className="ml-1 text-yellow-700">• Released in {new Date(event.date).getFullYear()}</span>
                      ) : (
                        <span className="ml-1 text-yellow-700">• {new Date(event.date).getFullYear()}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {events.length > 3 && (
          <div className="text-xs text-gray-500 text-center py-1">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};