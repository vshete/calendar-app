// src/components/ui/Header.tsx
'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useCalendarContext } from '@/context/CalendarContext';
import { CalendarView } from '@/types/event';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentDate, view, setView, goToToday, goToPrevious, goToNext } = 
    useCalendarContext();

  const getDateDisplay = () => {
    switch (view) {
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      case 'week':
        return format(currentDate, 'MMMM yyyy');
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'agenda':
        return 'Agenda';
      default:
        return '';
    }
  };

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: CalendarView | null,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          📅 Calendar
        </Typography>

        <Button
          variant="outlined"
          startIcon={<CalendarToday />}
          onClick={goToToday}
          sx={{ mr: 2 }}
        >
          Today
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <IconButton onClick={goToPrevious} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={goToNext} size="small">
            <ChevronRight />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, minWidth: 200 }}>
            {getDateDisplay()}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="calendar view"
          size="small"
        >
          <ToggleButton value="day" aria-label="day view">
            Day
          </ToggleButton>
          <ToggleButton value="week" aria-label="week view">
            Week
          </ToggleButton>
          <ToggleButton value="month" aria-label="month view">
            Month
          </ToggleButton>
          <ToggleButton value="agenda" aria-label="agenda view">
            Agenda
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
