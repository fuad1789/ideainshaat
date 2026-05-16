import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import { Project } from '@/lib/models/Project';
import { projectInputSchema } from '@/lib/validation';
import { destroyAsset } from '@/lib/cloudinary';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id).lean();
  if (!project) {
    return NextResponse.json({ success: false, error: 'Tapılmadı' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: project });
}

export async function PUT(req: Request, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = projectInputSchema.parse(body);
    await dbConnect();

    const slugConflict = await Project.findOne({ slug: parsed.slug, _id: { $ne: id } });
    if (slugConflict) {
      return NextResponse.json(
        { success: false, error: 'Bu slug başqa layihədə istifadə olunur' },
        { status: 409 },
      );
    }

    const updated = await Project.findByIdAndUpdate(id, parsed, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Tapılmadı' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Naməlum xəta';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await dbConnect();

  const project = await Project.findById(id);
  if (!project) {
    return NextResponse.json({ success: false, error: 'Tapılmadı' }, { status: 404 });
  }

  const publicIds: string[] = [];
  if (project.coverImage?.publicId) publicIds.push(project.coverImage.publicId);
  for (const img of project.gallery ?? []) {
    if (img.publicId) publicIds.push(img.publicId);
  }

  await Promise.allSettled(publicIds.map((pid) => destroyAsset(pid)));
  await project.deleteOne();

  return NextResponse.json({ success: true });
}
