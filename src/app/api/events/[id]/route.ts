// src/app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Event from '@/lib/db/models/Event';

// GET /api/events/[id] - Get single event by ID
export async function GET(
  request: NextRequest,
  // ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    await connectDB();
    const id = context.params.id;

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  // ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    await connectDB();

    const body = await request.json();

    const id = context.params.id;
    
    const event = await Event.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, RouteContextdata: event });
  } catch (error) {
    console.error('Error updating event:', error);
    
    if ((error as Error).name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: (error as Error).message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  // ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    await connectDB();

    const event = await Event.findByIdAndDelete(context.params.id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
