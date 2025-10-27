// src/components/calendar/MonthView.tsx
'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { CalendarEvent } from '@/types/event';
import { useCalendarContext } from '@/context/CalendarContext';
import { areDatesSame, getMonthDays, isDateInMonth, isDateToday } from '@/lib/utils/date';
import { getEventsForDay } from '@/lib/utils/calendar';
import { EventCard } from './EventCard';

interface MonthViewProps {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  events,
  onDateClick,
  onEventClick,
}) => {
  const { currentDate, selectedDate } = useCalendarContext();
  const monthDays = getMonthDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Week day headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {weekDays.map(day => (
          <Box
            key={day}
            sx={{
              p: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              borderRight: 1,
              borderColor: 'divider',
              '&:last-child': { borderRight: 0 },
            }}
          >
            <Typography variant="body2">{day}</Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: `repeat(${Math.ceil(monthDays.length / 7)}, 1fr)`,
          overflow: 'auto',
        }}
      >
        {monthDays.map(day => {
          const dayEvents = getEventsForDay(events, day);
          const isCurrentMonth = isDateInMonth(day, currentDate);
          const isToday = isDateToday(day);
          const isSelected = selectedDate ? areDatesSame(day, selectedDate) : false;

          const getBackgroundColor = () => {
            if (isSelected) return 'lightblue';
            if (!isCurrentMonth) return 'action.hover';
            return 'background.default';
          }

          return (
            <Paper
              key={day.toString()}
              elevation={0}
              onClick={() => onDateClick(day)}
              sx={{
                border: 1,
                borderColor: 'divider',
                p: 1,
                cursor: 'pointer',
                bgcolor: getBackgroundColor(),
                '&:hover': {
                  bgcolor: 'action.selected',
                },
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isToday ? 'bold' : 'normal',
                  color: !isCurrentMonth ? 'text.disabled' : isToday ? 'primary.main' : 'text.primary',
                  mb: 0.5,
                }}
              >
                {format(day, 'd')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {dayEvents.slice(0, 3).map(event => (
                  <Box
                    key={event._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <EventCard event={event} onClick={() => {}} compact />
                  </Box>
                ))}
                {dayEvents.length > 3 && (
                  <Typography variant="caption" sx={{ pl: 0.5, color: 'text.secondary' }}>
                    +{dayEvents.length - 3} more
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
