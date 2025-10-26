// src/components/calendar/EventCard.tsx
'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { CalendarEvent } from '@/types/event';
import { format } from 'date-fns';
import { LocationOn, AccessTime } from '@mui/icons-material';

interface EventCardProps {
  event: CalendarEvent;
  onClick: () => void;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, compact = false }) => {
  const startTime = format(new Date(event.startDate), 'HH:mm');
  const endTime = format(new Date(event.endDate), 'HH:mm');

  const tooltipContent = (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {event.title}
      </Typography>
      <Typography variant="caption" display="block">
        {startTime} - {endTime}
      </Typography>
      {event.location && (
        <Typography variant="caption" display="block">
          📍 {event.location}
        </Typography>
      )}
      {event.description && (
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          {event.description}
        </Typography>
      )}
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} arrow>
      <Box
        onClick={onClick}
        sx={{
          bgcolor: event.color,
          color: 'white',
          p: compact ? 0.5 : 1,
          mb: compact ? 0.5 : 1,
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          '&:hover': {
            opacity: 0.9,
            transform: 'scale(1.02)',
          },
          transition: 'all 0.2s',
        }}
      >
        <Typography
          variant={compact ? 'caption' : 'body2'}
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {event.title}
        </Typography>
        {!compact && !event.isAllDay && (
          <Typography variant="caption" display="flex" alignItems="center" sx={{ mt: 0.5 }}>
            <AccessTime sx={{ fontSize: 12, mr: 0.5 }} />
            {startTime} - {endTime}
          </Typography>
        )}
        {!compact && event.location && (
          <Typography variant="caption" display="flex" alignItems="center" sx={{ mt: 0.5 }}>
            <LocationOn sx={{ fontSize: 12, mr: 0.5 }} />
            {event.location}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};
