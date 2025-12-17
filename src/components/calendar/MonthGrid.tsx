// src/components/calendar/MonthGrid.tsx
import { isToday, isSameMonth, isSameDay } from 'date-fns';
import { DayCell } from './DayCell';
import { cn } from '../../lib/utils';
import type { Event } from '../../data';

interface MonthGridProps {
  month: number;
  year: number;
  events: Event[];
  onDateSelect?: (date: Date) => void;  // Made optional
  highlightToday?: boolean;
}

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  date: Date;
}

export const MonthGrid: React.FC<MonthGridProps> = ({ 
  month, 
  year, 
  events,
  onDateSelect,
  highlightToday = false 
}) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const days: DayInfo[] = [];
  
  // Add previous month's days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = prevMonthLastDay - prevMonthDays + 1; i <= prevMonthLastDay; i++) {
    const date = new Date(year, month - 1, i);
    days.push({ 
      day: i, 
      isCurrentMonth: false,
      date
    });
  }
  
  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({ 
      day: i, 
      isCurrentMonth: true,
      isToday: highlightToday && isToday(date),
      date
    });
  }
  
  // Add next month's days to complete the grid (6 rows x 7 days)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ 
      day: i, 
      isCurrentMonth: false,
      date
    });
  }
  
  // Filter events for the current month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return isSameMonth(eventDate, firstDayOfMonth);
  });

  // Helper function to get events for a specific day
  const getEventsForDay = (dayDate: Date) => {
    return currentMonthEvents.filter(event => 
      isSameDay(new Date(event.date), dayDate)
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-semibold py-2 text-sm text-gray-500">
          {day}
        </div>
      ))}
      
      {days.map(({ day, isCurrentMonth, isToday, date }, index) => {
        const dayEvents = getEventsForDay(date);
        
        return (
          <div 
            key={`${date.getTime()}-${index}`}
            onClick={() => onDateSelect?.(date)}  // Added null check here
            className={cn(
              "cursor-pointer hover:bg-gray-50",
              isToday && "bg-blue-50"
            )}
          >
            <DayCell 
              day={day}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              events={dayEvents}
            />
          </div>
        );
      })}
    </div>
  );
};