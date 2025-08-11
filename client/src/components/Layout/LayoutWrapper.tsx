'use client';
import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register') || pathname.startsWith('/auth/forgot-password');

  if (isAuthPage) {
    return <>{children}</>;
  }
  return <MainLayout>{children}</MainLayout>;
} 