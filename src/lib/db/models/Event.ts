// src/lib/db/models/Event.ts
import { CalendarEvent } from '@/types/event';
import mongoose, { Schema, Model } from 'mongoose';


const eventSchema = new Schema<CalendarEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function (value: Date) {
          // Retrieve the value of startDate
          const startDate = this.get('startDate');

          // Ensure both values are dates before comparing
          if (!startDate || !(startDate instanceof Date) || !(value instanceof Date)) {
            return false; // Or handle as appropriate if dates are mandatory
          }

          return value >= startDate;
        },
        message: 'End date must be after start date'
      }
    },
    location: {
      type: String,
      trim: true,
      maxlength: [500, 'Location cannot exceed 500 characters']
    },
    color: {
      type: String,
      default: '#1976d2',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format']
    },
    isAllDay: {
      type: Boolean,
      default: false
    },
    recurring: {
      enabled: { type: Boolean, default: false },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly'
      },
      interval: { type: Number, default: 1, min: 1 },
      endDate: { type: Date },
      daysOfWeek: [{ type: Number, min: 0, max: 6 }]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
eventSchema.index({ startDate: 1, endDate: 1 });
eventSchema.index({ title: 'text', description: 'text' });

const Event: Model<CalendarEvent> = 
  mongoose.models.Event || mongoose.model<CalendarEvent>('Event', eventSchema);

export default Event;
