import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { MonthGrid } from '../components/calendar/MonthGrid';
import { EventList } from '../components/events/EventList';
import { events as mockEvents } from '../data/events';
import { movies as mockMovies } from '../data/movies';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CurrentMonthView: React.FC = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = React.useState<Date>(currentDate);

  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd
  });

  // Filter events for the current month
  const monthEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth.getMonth() && 
           eventDate.getFullYear() === currentMonth.getFullYear();
  });

  // Filter movies for the current month
  const monthMovies = mockMovies.filter(movie => {
    const releaseDate = new Date(movie.releaseDate);
    return releaseDate.getMonth() === currentMonth.getMonth() && 
           releaseDate.getFullYear() === currentMonth.getFullYear();
  });

  // Combine and sort all events and movies by date
  const allEvents = [...monthEvents, ...monthMovies].sort((a, b) => {
    const dateA = new Date('date' in a ? a.date : a.releaseDate);
    const dateB = new Date('date' in b ? b.date : b.releaseDate);
    return dateA.getTime() - dateB.getTime();
  });

  // Group events by day
  const eventsByDay = allEvents.reduce<Record<string, any[]>>((acc, event) => {
    const date = 'date' in event ? event.date : event.releaseDate;
    const dayKey = format(new Date(date), 'yyyy-MM-dd');
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(event);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MonthGrid 
            month={currentMonth.getMonth()}
            year={currentMonth.getFullYear()}
            events={monthEvents}
            highlightToday={true}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Events & Movies in {format(currentMonth, 'MMMM')}
          </h2>
          
          {allEvents.length === 0 ? (
            <p className="text-gray-500">No events or movie releases scheduled for this month.</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(eventsByDay).map(([date, events]) => (
                <div key={date} className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {format(new Date(date), 'EEEE, MMMM d')}
                  </h3>
                  <div className="space-y-2">
                    {events.map((event, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        {'title' in event ? (
                          <>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(event.date), 'h:mm a')} • {event.location}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-medium">🎬 {event.name}</div>
                            <div className="text-sm text-gray-500">
                              Movie Release • {event.genre}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
