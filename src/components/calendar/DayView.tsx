// src/components/calendar/DayView.tsx
'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useCalendarContext } from '@/context/CalendarContext';
import { CalendarEvent } from '@/types/event';
import { getHoursInDay } from '@/lib/utils/date';
import { getEventsForDay, sortEventsByStart } from '@/lib/utils/calendar';
import { format } from 'date-fns';
import { EventCard } from './EventCard';

interface DayViewProps {
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  const { currentDate } = useCalendarContext();
  const hours = getHoursInDay();
  const dayEvents = sortEventsByStart(getEventsForDay(events, currentDate));

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: 1,
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Typography variant="h6">{format(currentDate, 'EEEE, MMMM d, yyyy')}</Typography>
      </Box>

      {/* Time grid */}
      <Box sx={{ display: 'flex' }}>
        {/* Time labels */}
        <Box sx={{ width: 80, flexShrink: 0 }}>
          {hours.map(hour => (
            <Box
              key={hour}
              sx={{
                height: 80,
                p: 1,
                borderBottom: 1,
                borderRight: 1,
                borderColor: 'divider',
                textAlign: 'right',
              }}
            >
              <Typography variant="caption">
                {format(new Date().setHours(hour, 0), 'HH:mm')}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Events column */}
        <Box sx={{ flex: 1 }}>
          {hours.map(hour => {
            const slotDate = new Date(currentDate);
            slotDate.setHours(hour, 0, 0, 0);
            
            const hourEvents = dayEvents.filter(event => {
              const eventHour = new Date(event.startDate).getHours();
              return eventHour === hour;
            });

            return (
              <Paper
                key={hour}
                elevation={0}
                onClick={() => onTimeSlotClick(slotDate)}
                sx={{
                  height: 80,
                  p: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {hourEvents.map(event => (
                  <Box
                    key={event._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    sx={{ mb: 1 }}
                  >
                    <EventCard event={event} onClick={() => {}} />
                  </Box>
                ))}
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
