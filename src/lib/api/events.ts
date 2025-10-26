// src/lib/api/events.ts
import { CalendarEvent } from '@/types/event';
import axios from 'axios';

const API_BASE = '/api/events';

export const eventApi = {
  // Get all events
  getAll: async (startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate.toISOString());
    if (endDate) params.append('end', endDate.toISOString());
    
    const response = await axios.get(`${API_BASE}?${params.toString()}`);
    return response.data.data;
  },

  // Get single event
  getOne: async (id: string): Promise<CalendarEvent> => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data.data;
  },

  // Create event
  create: async (event: Omit<CalendarEvent, '_id'>): Promise<CalendarEvent> => {
    const response = await axios.post(API_BASE, event);
    return response.data.data;
  },

  // Update event
  update: async (id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    const response = await axios.put(`${API_BASE}/${id}`, updates);
    return response.data.data;
  },

  // Delete event
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },

  // Search events
  search: async (query: string): Promise<CalendarEvent[]> => {
    const response = await axios.get(`${API_BASE}?search=${encodeURIComponent(query)}`);
    return response.data.data;
  },
};
