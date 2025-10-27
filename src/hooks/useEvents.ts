// src/hooks/useEvents.ts
import useSWR from 'swr';
import axios from 'axios';
import { CalendarEvent } from '@/types/event';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export const useEvents = (startDate?: Date, endDate?: Date) => {
  const params = new URLSearchParams();
  if (startDate) params.append('start', startDate.toISOString());
  if (endDate) params.append('end', endDate.toISOString());

  const { data, error, mutate } = useSWR<CalendarEvent[]>(
    `/api/events?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const createEvent = async (event: Omit<CalendarEvent, '_id'>) => {
    try {
      const response = await axios.post('/api/events', event);
      mutate(); // Revalidate data
      return response.data.data;
    } catch (error) {
      // ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error((error as any).response?.data?.error || 'Failed to create event');
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      const response = await axios.put(`/api/events/${id}`, updates);
      mutate(); // Revalidate data
      return response.data.data;
    } catch (error) {
      // ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error((error as any).response?.data?.error || 'Failed to update event');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`/api/events/${id}`);
      mutate(); // Revalidate data
    } catch (error) {
      // ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error((error as any).response?.data?.error || 'Failed to delete event');
    }
  };

  return {
    events: data || [],
    isLoading: !error && !data,
    isError: error,
    createEvent,
    updateEvent,
    deleteEvent,
    mutate,
  };
};
