// src/components/calendar/CalendarView.tsx
'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useCalendarContext } from '@/context/CalendarContext';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { AgendaView } from './AgendaView';
import { useModal } from '@/hooks/useModal';
import { EventModal } from '@/components/events/EventModal';
import { useEvents } from '@/hooks/useEvents';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { startOfMonth, endOfMonth, addMonths } from 'date-fns';

export const CalendarView: React.FC = () => {
    const { view, currentDate } = useCalendarContext();
    const { openModal, closeModal, isOpen, selectedEvent, initialDate } = useModal();

    // Fetch events for the current month (extend range for better UX)
    const start = startOfMonth(addMonths(currentDate, -1));
    const end = endOfMonth(addMonths(currentDate, 1));
    const { events, createEvent, updateEvent, deleteEvent, isLoading } = useEvents(start, end);

    const handleDateClick = (date: Date) => {
        openModal(undefined, date);
    };

    // ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEventClick = (event: any) => {
        openModal(event);
    };

    // ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSave = async (eventData: any) => {
        if (selectedEvent?._id) {
            await updateEvent(selectedEvent._id, eventData);
        } else {
            await createEvent(eventData);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteEvent(id);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
            {view === 'month' && (
                <MonthView
                    events={events}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            )}
            {view === 'week' && (
                <WeekView
                    events={events}
                    onTimeSlotClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            )}
            {view === 'day' && (
                <DayView
                    events={events}
                    onTimeSlotClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            )}
            {view === 'agenda' && (
                <AgendaView events={events} onEventClick={handleEventClick} />
            )}

            <EventModal
                open={isOpen}
                onClose={closeModal}
                onSave={handleSave}
                onDelete={handleDelete}
                event={selectedEvent}
                initialDate={initialDate}
            />
        </Box>
    );
};
