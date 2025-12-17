// src/components/calendar/MonthCalendar.tsx
import type { Event } from '../../data';
import { MonthGrid } from './MonthGrid';
import { format } from 'date-fns';
interface MonthCalendarProps {
  events: Event[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({ 
  events, 
  currentDate,
  onDateChange 
}) => {
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          &larr;
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          &rarr;
        </button>
      </div>
      
      <MonthGrid 
        month={currentDate.getMonth()}
        year={currentDate.getFullYear()}
        events={events}
        onDateSelect={(date) => onDateChange(date)}
      />
    </div>
  );
};