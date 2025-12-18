import React, { useMemo } from "react";
import type { Event, MonthMeta } from "../../utils/types";
import { buildDateKey, cn } from "../../utils";
import { DayCell } from "./DayCell";
import { format } from "date-fns";

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
                className="group relative min-h-[4rem] sm:min-h-[7rem] bg-slate-900/50 transition-colors hover:bg-slate-800/50"
                onClick={() => onDayClick?.(dateKey, eventsForDay)}
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
    </div>
  );
};
