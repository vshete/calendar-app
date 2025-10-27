// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: 'API and Database are healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: (error as Error).message
      },
      { status: 503 }
    );
  }
}
