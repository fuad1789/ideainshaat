import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Project } from '@/lib/models/Project';

export const revalidate = 60;

export async function GET() {
  await dbConnect();
  const projects = await Project.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ success: true, data: projects });
}
