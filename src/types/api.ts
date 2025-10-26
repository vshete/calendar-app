import { CalendarEvent } from "./event";

// src/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EventsResponse {
  success: boolean;
  data: CalendarEvent[];
  count: number;
}

export interface EventResponse {
  success: boolean;
  data: CalendarEvent;
}
