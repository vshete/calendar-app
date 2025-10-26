// src/types/event.ts
export interface CalendarEvent {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  color: string;
  isAllDay: boolean;
  recurring?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  color: string;
  isAllDay: boolean;
}

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface DateRange {
  start: Date;
  end: Date;
}
