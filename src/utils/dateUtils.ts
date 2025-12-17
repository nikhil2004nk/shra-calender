import type { CalendarItem, MonthMeta as MonthMetaType } from "./types";
import { months } from "../data";

export const getMonthMeta = (monthId: number): MonthMetaType | undefined =>
  months.find((m) => m.id === monthId);

export const groupEventsByDate = (items: CalendarItem[]) =>
  items.reduce<Record<string, CalendarItem[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

export const buildDateKey = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
