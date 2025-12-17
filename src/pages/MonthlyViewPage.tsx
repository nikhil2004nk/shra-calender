import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import { EventDetailsModal } from '../components/events/EventDetailsModal';
import { getEventsByMonth } from '../data';
import type { Event } from '../data';

export const MonthlyViewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? new Date(dateParam) : new Date();
  });

  // Get the start and end of the current month
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  
  // Generate all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Get events for the current month
  const monthEvents = getEventsByMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Group events by day
  const eventsByDay = monthEvents.reduce<Record<string, Event[]>>((acc, event) => {
    const dateStr = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {});

  // Handle navigation to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    updateUrl(newDate);
  };

  // Handle navigation to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    updateUrl(newDate);
  };

  // Update URL with current month
  const updateUrl = (date: Date) => {
    setCurrentMonth(date);
    navigate(`/monthly?date=${format(date, 'yyyy-MM-dd')}`, { replace: true });
  };

  // Handle event click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  // Handle day click
  const handleDayClick = (day: Date) => {
    navigate(`/calendar?date=${format(day, 'yyyy-MM-dd')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageContainer className="py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Month Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {daysInMonth.map((day) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const dayEvents = eventsByDay[dayStr] || [];
              const isToday = isSameDay(day, new Date());
              
              return (
                <div 
                  key={dayStr}
                  onClick={() => handleDayClick(day)}
                  className={`min-h-24 p-2 bg-white border border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-medium ${
                      isToday 
                        ? 'flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white'
                        : 'text-gray-900'
                    }`}>
                      {format(day, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div 
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        className="text-xs p-1 rounded truncate bg-blue-50 text-blue-800 hover:bg-blue-100"
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Details Modal */}
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </PageContainer>
    </div>
  );
};
