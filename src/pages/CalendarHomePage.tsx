// src/pages/CalendarHomePage.tsx
import { useState } from 'react';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import { MonthCalendar } from '../components/calendar/MonthCalendar';
import { EventList } from '../components/events/EventList';
import { EventDetailsModal } from '../components/events/EventDetailsModal';
import { GlobalSearchBar } from '../components/search/GlobalSearchBar';
import { useSearch } from '../hooks/useSearch';
import { allEvents, getEventsByMonth, type Event } from '../data';

export const CalendarHomePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const {
    searchResults,
    searchEvents,
    clearSearch,
  } = useSearch(allEvents);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleSearch = (query: string) => {
    searchEvents(query);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  // Get events for the selected month
  const eventsForSelectedMonth = getEventsByMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  // Get events for the selected date
  const eventsForSelectedDate = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageContainer className="py-6">
        <div className="mb-6">
          <GlobalSearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            results={searchResults}
            onResultClick={handleEventClick}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthCalendar 
              events={eventsForSelectedMonth}
              currentDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              <EventList
                events={eventsForSelectedDate}
                onEventClick={handleEventClick}
                emptyMessage="No events for this date"
              />
            </div>
          </div>
        </div>

        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </PageContainer>
    </div>
  );
};