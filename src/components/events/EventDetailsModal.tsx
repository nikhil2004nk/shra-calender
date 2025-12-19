// src/components/events/EventDetailsModal.tsx

import React, { useMemo } from "react";
import type { Event } from "../../utils/types";
import { getMovieById } from "../../data/movies";
import type { ShraddhaMovie } from "./ShraddhaMovieDetails";
import ShraddhaMovieDetails from "./ShraddhaMovieDetails";

interface EventDetailsModalProps {
  date: string;
  events: Event[];
  onClose: () => void;
}

interface EventWithMovie {
  event: Event;
  movie?: ShraddhaMovie;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  date,
  events,
  onClose
}) => {
  if (!events.length) return null;

  // Pre-resolve movie metadata for events that have baseMovieId
  const eventsWithMovie = useMemo<EventWithMovie[]>(
    () =>
      events.map((event: Event) => {
        const baseMovieId = event.meta?.baseMovieId;
        const movie = baseMovieId ? getMovieById(baseMovieId) as unknown as ShraddhaMovie : undefined;
        return { event, movie };
      }),
    [events]
  );

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'movie': return 'from-purple-600 to-purple-700';
      case 'function': return 'from-emerald-500 to-emerald-600';
      case 'movie-anniversary': return 'from-amber-500 to-amber-600';
      case 'event':
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r px-6 py-4 border-b border-slate-700 ${getTypeColor(events[0]?.type || 'event')}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Event Details</h2>
              <p className="text-sm text-white/90">{formatDisplayDate(date)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto">
          {eventsWithMovie.map(({ event, movie }) => (
            <div key={event.id} className="p-6">
              {movie ? (
                <ShraddhaMovieDetails movie={movie} />
              ) : (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  {event.description && (
                    <p className="text-gray-700 mb-4">{event.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Event Date</p>
                      <p className="font-medium text-gray-800">{formatDisplayDate(event.date)}</p>
                    </div>
                    {event.meta?.anniversaryYears && (
                      <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-yellow-700 font-medium">
                          {event.meta.anniversaryYears} Year{event.meta.anniversaryYears > 1 ? 's' : ''} Anniversary
                        </p>
                        <p className="text-xs text-yellow-600">
                          Since {new Date(event.date).getFullYear() - event.meta.anniversaryYears}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};