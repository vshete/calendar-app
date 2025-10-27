// src/lib/utils/calendar.ts

import { CalendarEvent } from '@/types/event';
import { isEventInDay } from './date';

export const getEventsForDay = (events: CalendarEvent[], day: Date): CalendarEvent[] => {
  return events.filter(event => 
    isEventInDay(new Date(event.startDate), new Date(event.endDate), day)
  );
};

export const sortEventsByStart = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
};

export const getEventPosition = (
  event: CalendarEvent,
  day: Date
): { top: number; height: number } => {
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);
  
  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);
  
  const startTime = eventStart > dayStart ? eventStart : dayStart;
  const endTime = eventEnd < dayEnd ? eventEnd : dayEnd;
  
  const startHour = startTime.getHours() + startTime.getMinutes() / 60;
  const endHour = endTime.getHours() + endTime.getMinutes() / 60;
  
  const top = (startHour / 24) * 100;
  const height = ((endHour - startHour) / 24) * 100;
  
  return { top, height };
};

export const EVENT_COLORS = [
  '#1976d2', // Blue
  '#dc004e', // Pink
  '#f50057', // Hot Pink
  '#9c27b0', // Purple
  '#673ab7', // Deep Purple
  '#3f51b5', // Indigo
  '#2196f3', // Light Blue
  '#03a9f4', // Cyan Blue
  '#00bcd4', // Cyan
  '#009688', // Teal
  '#4caf50', // Green
  '#8bc34a', // Light Green
  '#ff9800', // Orange
  '#ff5722', // Deep Orange
];

export const getDefaultEventColor = (): string => {
  return EVENT_COLORS[0];
};
