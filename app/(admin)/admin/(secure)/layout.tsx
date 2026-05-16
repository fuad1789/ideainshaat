import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SecureAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="adm-shell adm-shell--solo">
      <main className="adm-main">{children}</main>
    </div>
  );
}
