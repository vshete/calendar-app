// src/components/calendar/AgendaView.tsx
'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider} from '@mui/material';
import { CalendarEvent } from '@/types/event';
import { format, isToday, isTomorrow } from 'date-fns';
import { sortEventsByStart } from '@/lib/utils/calendar';
import { LocationOn, AccessTime } from '@mui/icons-material';

interface AgendaViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ events, onEventClick }) => {
  const sortedEvents = sortEventsByStart(events);
  
  // Group events by date
  const eventsByDate = sortedEvents.reduce((acc, event) => {
    const dateKey = format(new Date(event.startDate), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  if (sortedEvents.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 3,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No events scheduled
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {Object.entries(eventsByDate).map(([dateKey, dateEvents]) => (
        <Box key={dateKey} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            {getDateLabel(dateKey)}
          </Typography>
          
          <List>
            {dateEvents.map((event, index) => (
              <React.Fragment key={event._id}>
                <ListItem
                  onClick={() => onEventClick(event)}
                  sx={{
                    borderLeft: 4,
                    borderColor: event.color,
                    mb: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {event.isAllDay
                              ? 'All day'
                              : `${format(new Date(event.startDate), 'HH:mm')} - ${format(new Date(event.endDate), 'HH:mm')}`
                            }
                          </Typography>
                        </Box>
                        {event.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{event.location}</Typography>
                          </Box>
                        )}
                        {event.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {event.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < dateEvents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};
