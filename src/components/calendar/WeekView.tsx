// src/components/calendar/WeekView.tsx
'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { CalendarEvent } from '@/types/event';
import { useCalendarContext } from '@/context/CalendarContext';
import { getHoursInDay, getWeekDays } from '@/lib/utils/date';
import { getEventsForDay, sortEventsByStart } from '@/lib/utils/calendar';
import { EventCard } from './EventCard';


interface WeekViewProps {
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  const { currentDate } = useCalendarContext();
  const weekDays = getWeekDays(currentDate);
  const hours = getHoursInDay();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header with day labels */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '60px repeat(7, 1fr)',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ borderRight: 1, borderColor: 'divider' }} />
        {weekDays.map(day => (
          <Box
            key={day.toString()}
            sx={{
              p: 1,
              textAlign: 'center',
              borderRight: 1,
              borderColor: 'divider',
              '&:last-child': { borderRight: 0 },
            }}
          >
            <Typography variant="caption" display="block">
              {format(day, 'EEE')}
            </Typography>
            <Typography variant="h6">{format(day, 'd')}</Typography>
          </Box>
        ))}
      </Box>

      {/* Time grid */}
      <Box>
        {hours.map(hour => (
          <Box
            key={hour}
            sx={{
              display: 'grid',
              gridTemplateColumns: '60px repeat(7, 1fr)',
              minHeight: 60,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            {/* Hour label */}
            <Box
              sx={{
                p: 1,
                borderRight: 1,
                borderColor: 'divider',
                textAlign: 'right',
              }}
            >
              <Typography variant="caption">
                {format(new Date().setHours(hour, 0), 'HH:mm')}
              </Typography>
            </Box>

            {/* Day columns */}
            {weekDays.map(day => {
              const slotDate = new Date(day);
              slotDate.setHours(hour, 0, 0, 0);
              const dayEvents = sortEventsByStart(getEventsForDay(events, day));
              
              // Filter events for this hour
              const hourEvents = dayEvents.filter(event => {
                const eventHour = new Date(event.startDate).getHours();
                return eventHour === hour;
              });

              return (
                <Paper
                  key={`${day.toString()}-${hour}`}
                  elevation={0}
                  onClick={() => onTimeSlotClick(slotDate)}
                  sx={{
                    p: 0.5,
                    borderRight: 1,
                    borderColor: 'divider',
                    '&:last-child': { borderRight: 0 },
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    position: 'relative',
                  }}
                >
                  {hourEvents.map(event => (
                    <Box
                      key={event._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      sx={{ mb: 0.5 }}
                    >
                      <EventCard event={event} onClick={() => {}} />
                    </Box>
                  ))}
                </Paper>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
