// src/context/CalendarContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { CalendarView } from '@/types/event';

interface CalendarContextType {
  currentDate: Date;
  view: CalendarView;
  selectedDate: Date | null;
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  setSelectedDate: (date: Date | null) => void;
  goToToday: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToPrevious = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, -1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, -1));
        break;
    }
  };

  const goToNext = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        view,
        selectedDate,
        setCurrentDate,
        setView,
        setSelectedDate,
        goToToday,
        goToPrevious,
        goToNext,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within CalendarProvider');
  }
  return context;
};
