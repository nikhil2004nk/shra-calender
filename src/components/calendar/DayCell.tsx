import React from "react";
import type { CalendarItem } from "../../utils/types";
import { EventBadge } from "../events/EventBadge";

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
  const textColor = isCurrentMonth ? (isToday ? 'text-blue-500 font-bold' : 'text-white') : 'text-gray-500';

  return (
    <div 
      className={`flex h-28 flex-col rounded-xl border px-2 py-1.5 text-left text-xs transition ${
        hasEvents
          ? "border-pink-500/60 bg-slate-900/90 hover:bg-slate-900"
          : "border-transparent hover:border-gray-600 hover:bg-slate-900/50"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      <div className="text-right">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${textColor} ${
            isToday ? 'bg-blue-100 dark:bg-blue-900' : ''
          }`}
        >
          {day}
        </span>
      </div>
      <div className="mt-1 flex-1 overflow-y-auto">
        {events.map((event) => (
          <EventBadge key={event.id} event={event} />
        ))}
        {events.length > 2 && (
          <div className="text-[10px] text-slate-400">
            +{events.length - 2} more…
          </div>
        )}
      </div>
    </div>
  );
};
