import type { Metadata, Viewport } from 'next';
import { Inter, Spectral } from 'next/font/google';
import { AdminProviders } from '@/components/admin/AdminProviders';
import './admin.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const serif = Spectral({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atelier · İdea İnşaat',
  description: 'Studio dossier — layihə idarəetməsi',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A3A46',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${inter.variable} ${serif.variable}`}>
      <body>
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
