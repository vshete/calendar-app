// src/hooks/useModal.ts
import { CalendarEvent } from '@/types/event';
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [initialDate, setInitialDate] = useState<Date | undefined>();

  const openModal = (event?: CalendarEvent, date?: Date) => {
    setSelectedEvent(event);
    setInitialDate(date);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEvent(undefined);
    setInitialDate(undefined);
  };

  return {
    isOpen,
    selectedEvent,
    initialDate,
    openModal,
    closeModal,
  };
};
