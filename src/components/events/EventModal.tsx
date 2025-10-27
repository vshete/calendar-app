// src/components/events/EventModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { CalendarEvent } from '@/types/event';
import { EVENT_COLORS } from '@/lib/utils/calendar';

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  event?: CalendarEvent;
  initialDate?: Date;
}

export const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  event,
  initialDate,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    color: '#1976d2',
    isAllDay: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      
      setFormData({
        title: event.title,
        description: event.description || '',
        startDate: format(start, 'yyyy-MM-dd'),
        startTime: format(start, 'HH:mm'),
        endDate: format(end, 'yyyy-MM-dd'),
        endTime: format(end, 'HH:mm'),
        location: event.location || '',
        color: event.color,
        isAllDay: event.isAllDay,
      });
    } else if (initialDate) {
      const dateStr = format(initialDate, 'yyyy-MM-dd');
      setFormData(prev => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr,
        startTime: '09:00',
        endTime: '10:00',
      }));
    }
  }, [event, initialDate, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);
    try {
      const startDateTime = formData.isAllDay
        ? new Date(formData.startDate)
        : new Date(`${formData.startDate}T${formData.startTime}`);
      
      const endDateTime = formData.isAllDay
        ? new Date(formData.endDate)
        : new Date(`${formData.endDate}T${formData.endTime}`);

      const eventData: Partial<CalendarEvent> = {
        title: formData.title,
        description: formData.description,
        startDate: startDateTime,
        endDate: endDateTime,
        location: formData.location,
        color: formData.color,
        isAllDay: formData.isAllDay,
      };

      await onSave(eventData);
      handleClose();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event?._id || !onDelete) return;
    
    if (confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        await onDelete(event._id);
        handleClose();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
      color: '#1976d2',
      isAllDay: false,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {event ? 'Edit Event' : 'Create Event'}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                disabled={formData.isAllDay}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                disabled={formData.isAllDay}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Switch
                name="isAllDay"
                checked={formData.isAllDay}
                onChange={handleChange}
              />
            }
            label="All day"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {EVENT_COLORS.map(color => (
                <Box
                  key={color}
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: color,
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: formData.color === color ? '3px solid #000' : 'none',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        {event && onDelete && (
          <Button onClick={handleDelete} color="error" disabled={loading}>
            Delete
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {event ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
