// src/components/ui/Sidebar.tsx
'use client';

import React from 'react';
import { Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MiniCalendar } from '@/components/calendar/MiniCalendar';
import { EventModal } from '@/components/events/EventModal';
import { useModal } from '@/hooks/useModal';
import { useEvents } from '@/hooks/useEvents';

export const Sidebar: React.FC = () => {
  const { openModal, closeModal, isOpen, selectedEvent, initialDate } = useModal();
  const { createEvent, updateEvent, deleteEvent } = useEvents();

  // ts-ignore
  // allow explicit any type for eventData
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

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: 280,
          p: 2,
          borderRight: 1,
          borderColor: 'divider',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          sx={{ mb: 3, py: 1.5 }}
          onClick={() => openModal(undefined, new Date())}
        >
          Create Event
        </Button>

        <MiniCalendar />
      </Paper>

      <EventModal
        open={isOpen}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
        event={selectedEvent}
        initialDate={initialDate}
      />
    </>
  );
};
