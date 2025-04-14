import { getMustRead } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getMustRead();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in must-read API route:', error);
    return NextResponse.json({ error: 'Failed to fetch must read data' }, { status: 500 });
  }
} 