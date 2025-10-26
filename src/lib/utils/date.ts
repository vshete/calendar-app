// src/lib/utils/date.ts
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd'): string => {
  return format(date, formatStr);
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  
  const days: Date[] = [];
  let currentDay = start;
  
  while (currentDay <= end) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }
  
  return days;
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const days: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }
  
  return days;
};

export const getHoursInDay = (): number[] => {
  return Array.from({ length: 24 }, (_, i) => i);
};

export const isDateInMonth = (date: Date, month: Date): boolean => {
  return isSameMonth(date, month);
};

export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};

export const areDatesSame = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const parseDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const getEventDuration = (startDate: Date, endDate: Date): string => {
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    return `${diffMins} min`;
  }
  
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  
  if (mins === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${mins} min`;
};

export const isEventInDay = (eventStart: Date, eventEnd: Date, day: Date): boolean => {
  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);
  
  return (
    (eventStart >= dayStart && eventStart <= dayEnd) ||
    (eventEnd >= dayStart && eventEnd <= dayEnd) ||
    (eventStart <= dayStart && eventEnd >= dayEnd)
  );
};
