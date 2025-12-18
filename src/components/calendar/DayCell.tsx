import React from "react";
import type { CalendarItem } from "../../utils/types";
import { EventBadge } from "../events/EventBadge";
import { cn } from "../../utils";

interface DayCellProps {
  day: number;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  events: CalendarItem[];
  onClick?: (e: React.MouseEvent) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  day,
  isCurrentMonth = true,
  isToday = false,
  events = [],
  onClick
}) => {
  const hasEvents = events.length > 0;
  const visibleEvents = events.slice(0, 2);
  const hasMore = events.length > 2;
  
  const dayNumberClasses = cn(
    "flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium transition-colors",
    isToday 
      ? "bg-blue-600 text-white" 
      : isCurrentMonth 
        ? "text-white hover:bg-slate-700/50" 
        : "text-gray-500 hover:bg-slate-800/30"
  );

  const cellClasses = cn(
    "group flex flex-col rounded-lg p-1 text-xs transition-all duration-200 ease-in-out",
    "border hover:shadow-md overflow-hidden h-20 sm:h-32",
    hasEvents
      ? "border-pink-500/40 bg-slate-900/70 hover:bg-slate-800/60"
      : "border-transparent bg-slate-900/40 hover:bg-slate-800/40",
    !isCurrentMonth && "opacity-60"
  );

  return (
    <div 
      className={cellClasses}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      role="button"
      aria-label={`${isToday ? 'Today, ' : ''}${day}${!isCurrentMonth ? ' (not in current month)' : ''}${hasEvents ? `, ${events.length} events` : ''}`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={dayNumberClasses}>
          {day}
        </span>
        {hasEvents && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/90 text-[11px] font-bold text-white shadow-sm">
            {events.length}
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar -mx-0.5">
        <div className="space-y-0.5">
          {visibleEvents.map((event) => (
            <EventBadge key={event.id} event={event} />
          ))}
          {hasMore && (
            <div className="text-[10px] text-slate-400 font-medium px-1 py-0.5 bg-slate-800/40 rounded">
              +{events.length - 2} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
