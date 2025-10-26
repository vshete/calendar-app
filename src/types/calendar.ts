import { CalendarEvent, CalendarView } from "./event";

// src/types/calendar.ts
export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  selectedDate: Date | null;
}

export interface MonthViewProps {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface WeekViewProps {
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface DayViewProps {
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}
