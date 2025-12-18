// src/components/events/EventDetailsModal.tsx
import React, { useMemo } from "react";
import type { Event } from "../../utils/types";
import { getMovieById } from "../../data/movies";


export interface Movie {
  id: string;
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
  director?: string;
  cast?: string[];
  duration?: number;
  isMovie?: boolean;
}

interface EventDetailsModalProps {
  date: string;
  events: Event[];
  onClose: () => void;
}

interface EventWithMovie {
  event: Event;
  movie?: Movie;
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
        const movie = baseMovieId ? getMovieById(baseMovieId) : undefined;
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r px-6 py-4 border-b border-slate-700 ${getTypeColor(events[0]?.type || 'event')}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Event Details</h2>
              <p className="text-sm text-white/90">{formatDisplayDate(date)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
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
        <div className="max-h-[70vh] overflow-y-auto">
          {eventsWithMovie.map(({ event, movie }: EventWithMovie) => {
            const typeColor = getTypeColor(event.type);
            
            return (
              <div
                key={event.id}
                className="border-b border-slate-800 last:border-b-0"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-1.5 h-16 rounded-full bg-gradient-to-b ${typeColor}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {event.title}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} text-white`}>
                          {event.type.replace("-", " ")}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {movie ? (
                          <div className="flex gap-4">
                            {movie.imageUrl && (
                              <div className="flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden border-2 border-slate-700/50 shadow-lg">
                                <img
                                  src={movie.imageUrl}
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="space-y-2 flex-1">
                              {movie.description && (
                                <p className="text-sm text-slate-300">
                                  {movie.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          event.description && (
                            <p className="text-sm text-slate-300">{event.description}</p>
                          )
                        )}

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-xs text-slate-400 mb-1">Event Date</p>
                            <p className="text-slate-200 font-medium">{formatDisplayDate(event.date)}</p>
                          </div>
                          
                          {movie?.date && (
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Release Date</p>
                              <p className="text-slate-200 font-medium">{movie.date}</p>
                            </div>
                          )}

                          {movie?.director && (
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Director</p>
                              <p className="text-slate-200 font-medium">{movie.director}</p>
                            </div>
                          )}

                          {movie?.duration && (
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Duration</p>
                              <p className="text-slate-200 font-medium">{movie.duration} minutes</p>
                            </div>
                          )}

                          {event.meta?.anniversaryYears && (
                            <div className={`bg-gradient-to-br ${typeColor}/20 p-3 rounded-lg border-l-4 ${typeColor.split(' ')[1]}`}>
                              <p className="text-xs text-slate-300 mb-1">Anniversary</p>
                              <p className="text-white font-medium">
                                {event.meta.anniversaryYears} year
                                {event.meta.anniversaryYears > 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                        </div>

                        {movie?.cast && movie.cast.length > 0 && (
                          <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-xs text-slate-400 mb-2">Cast</p>
                            <div className="flex flex-wrap gap-2">
                              {movie?.cast?.slice(0, 5).map((actor: string, idx: number) => (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/80 text-slate-200"
                                >
                                  {actor}
                                </span>
                              ))}
                              {movie?.cast && movie.cast.length > 5 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400">
                                  +{movie.cast.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};