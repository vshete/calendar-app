// src/app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Event from '@/lib/db/models/Event';

// GET /api/events - Fetch all events with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');
    const search = searchParams.get('search');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = {};

    // Filter by date range if provided
    if (startDate && endDate) {
      query = {
        $or: [
          { startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
          { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
          {
            startDate: { $lte: new Date(startDate) },
            endDate: { $gte: new Date(endDate) }
          }
        ]
      };
    }

    // Search by title or description
    if (search) {
      query.$text = { $search: search };
    }

    const events = await Event.find(query).sort({ startDate: 1 });

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, startDate, endDate' },
        { status: 400 }
      );
    }

    // Create event
    const event = await Event.create(body);

    return NextResponse.json(
      { success: true, data: event },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    
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
