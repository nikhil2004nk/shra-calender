import React from "react";
import type { Event } from "../../utils/types";
import { EventBadge } from "./EventBadge";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      className="w-full min-w-0 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-sm cursor-pointer hover:bg-slate-800/70 transition-colors break-words" 
      onClick={onClick}
      style={{ maxWidth: '100%' }}
    >
      <div className="flex items-start justify-between mb-1 gap-2 w-full">
        <h3 className="font-semibold text-slate-100 flex-1 min-w-0">
          <span className="break-words line-clamp-2">{event.title}</span>
        </h3>
        <div className="flex-shrink-0 ml-2">
          <EventBadge event={event} />
        </div>
      </div>
      <p className="text-xs text-slate-400 truncate">{event.date}</p>
      {event.description && (
        <p className="mt-1 text-xs text-slate-300 line-clamp-2 break-words">
          {event.description}
        </p>
      )}
    </div>
  );
};
