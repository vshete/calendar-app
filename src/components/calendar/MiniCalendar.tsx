// src/components/calendar/MiniCalendar.tsx
'use client';

import React, { useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, addMonths } from 'date-fns';
import { areDatesSame, getMonthDays, isDateInMonth, isDateToday } from '@/lib/utils/date';
import { useCalendarContext } from '@/context/CalendarContext';

export const MiniCalendar: React.FC = () => {
  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } = useCalendarContext();
  const [displayMonth, setDisplayMonth] = React.useState(currentDate);
  
  const monthDays = getMonthDays(displayMonth);
  const weekDays = useMemo(() => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], []);

  const handlePrevMonth = () => {
    setDisplayMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(prev => addMonths(prev, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  };

  return (
    <Box>
      {/* Month navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <IconButton size="small" onClick={handlePrevMonth}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {format(displayMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton size="small" onClick={handleNextMonth}>
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>

      {/* Week day headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {weekDays.map(day => (
          <Box key={day} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
        }}
      >
        {monthDays.map(day => {
          const isCurrentMonth = isDateInMonth(day, displayMonth);
          const isToday = isDateToday(day);
          const isSelected = selectedDate ? areDatesSame(day, selectedDate) : false;

          return (
            <Box
              key={day?.toString()}
              onClick={() => handleDateClick(day)}
              sx={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 1,
                bgcolor: isSelected ? 'green' : isToday ? 'primary.light' : 'transparent',
                color: !isCurrentMonth ? 'text.disabled' : isSelected || isToday ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                {format(day, 'd')}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
