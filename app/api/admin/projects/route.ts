import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import { Project } from '@/lib/models/Project';
import { projectInputSchema } from '@/lib/validation';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const parsed = projectInputSchema.parse(body);
    await dbConnect();

    const existing = await Project.findOne({ slug: parsed.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Bu slug artıq mövcuddur' },
        { status: 409 },
      );
    }

    const created = await Project.create(parsed);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Naməlum xəta';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
