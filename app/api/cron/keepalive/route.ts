import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Project } from '@/lib/models/Project';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const expected = process.env.CRON_SECRET;
  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const count = await Project.countDocuments();
    return NextResponse.json({
      success: true,
      ping: 'pong',
      projects: count,
      at: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'DB error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
