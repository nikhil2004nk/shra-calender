import React, { useMemo } from "react";
import type { Event, MonthMeta } from "../../utils/types";
import { buildDateKey, cn } from "../../utils";
import { DayCell } from "./DayCell";
import { format } from "date-fns";

interface MonthlySummaryProps {
  eventsByDate: Record<string, Event[]>;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ eventsByDate }) => {
  // Calculate summary statistics
  const summary = useMemo(() => {
    const allEvents = Object.values(eventsByDate).flat();
    const totalEvents = allEvents.length;
    
    // Count events by type
    const eventsByType: Record<string, number> = {};
    allEvents.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    });

    // Count events by weekday
    const eventsByWeekday: Record<string, number> = {};
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => eventsByWeekday[day] = 0);
    
    Object.entries(eventsByDate).forEach(([date, events]) => {
      const dayOfWeek = new Date(date).getDay();
      eventsByWeekday[weekdays[dayOfWeek]] += events.length;
    });

    return {
      totalEvents,
      eventsByType,
      eventsByWeekday,
      weekdays: weekdays.map(day => ({
        day,
        count: eventsByWeekday[day],
        percentage: Math.round((eventsByWeekday[day] / totalEvents) * 100) || 0
      }))
    };
  }, [eventsByDate]);

  if (summary.totalEvents === 0) {
    return (
      <div className="mt-6 rounded-lg bg-slate-800/50 p-4 text-center text-slate-400">
        No events scheduled for this month.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <h3 className="mb-3 text-lg font-semibold text-white">Monthly Summary</h3>
      
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Total Events</span>
          <span className="rounded-full bg-blue-600/20 px-2.5 py-1 text-xs font-medium text-blue-400">
            {summary.totalEvents} {summary.totalEvents === 1 ? 'event' : 'events'}
          </span>
        </div>
      </div>

      {Object.keys(summary.eventsByType).length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-slate-300">By Event Type</h4>
          <div className="space-y-2">
            {Object.entries(summary.eventsByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{type}</span>
                <span className="text-sm font-medium text-slate-200">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="mb-2 text-sm font-medium text-slate-300">Events by Day</h4>
        <div className="grid grid-cols-7 gap-1 text-center">
          {summary.weekdays.map(({ day, count, percentage }) => (
            <div key={day} className="flex flex-col items-center">
              <div className="text-xs text-slate-400">{day[0]}</div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="mt-1 text-xs font-medium text-slate-300">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MonthCalendarProps {
  year: number;
  monthMeta: MonthMeta;
  eventsByDate: Record<string, Event[]>;
  onDayClick?: (date: string, events: Event[]) => void;
  onTodayClick?: () => void;
  className?: string;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  year,
  monthMeta,
  eventsByDate,
  onDayClick,
  onTodayClick,
  className,
}) => {
  const { days, firstWeekday, id: month } = monthMeta;
  const today = new Date();
  
  // Memoize the weeks calculation
  const weeks = useMemo(() => {
    const leadingEmpty = (firstWeekday + 6) % 7;
    const totalCells = Math.ceil((leadingEmpty + days) / 7) * 7; // Ensure full weeks
    const weeks: (number | null)[][] = [];
    let currentDay = 1;

    for (let i = 0; i < totalCells; i++) {
      const weekIndex = Math.floor(i / 7);
      if (!weeks[weekIndex]) weeks[weekIndex] = [];
      if (i < leadingEmpty || currentDay > days) {
        weeks[weekIndex].push(null);
      } else {
        weeks[weekIndex].push(currentDay++);
      }
    }
    return weeks;
  }, [firstWeekday, days]);

  const monthName = format(new Date(year, month - 1, 1), 'MMMM yyyy');

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-white">{monthName}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onTodayClick}
            disabled={!onTodayClick}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              onTodayClick 
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
            )}
            title="Go to today"
          >
            Today
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/90 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-3 sm:py-4">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day[0]}</span>
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-slate-800 p-px">
          {weeks.flat().map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[4rem] bg-slate-900/50 sm:min-h-[6rem]" />;
            }

            const dateKey = buildDateKey(year, month, day);
            const eventsForDay = eventsByDate[dateKey] || [];
            const isToday = 
              day === today.getDate() && 
              month - 1 === today.getMonth() && 
              year === today.getFullYear();

            return (
              <div 
                key={dateKey} 
                className={cn(
                  "group relative min-h-[4rem] bg-slate-900/50 transition-colors sm:min-h-[7rem]",
                  eventsForDay.length > 0 ? "cursor-pointer hover:bg-slate-800/50" : ""
                )}
                onClick={() => eventsForDay.length > 0 && onDayClick?.(dateKey, eventsForDay)}
              >
                <DayCell
                  day={day}
                  isToday={isToday}
                  isCurrentMonth={true}
                  events={eventsForDay}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Monthly Summary Section */}
      <MonthlySummary eventsByDate={eventsByDate} />
    </div>
  );
};
