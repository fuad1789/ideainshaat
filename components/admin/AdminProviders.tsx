'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

interface AdminProvidersProps {
  children: ReactNode;
}

export function AdminProviders({ children }: AdminProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
