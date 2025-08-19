'use client';
import { useRouter } from 'next/navigation';
import { WelcomePage } from '@/components/WelcomePage';

export default function Home() {
  const router = useRouter();

  const handleAdminLogin = () => {
    router.push('/auth/admin/login');
  };

  const handleStudentLogin = () => {
    router.push('/auth/login');
  };

  return (
    <WelcomePage
      onAdminLogin={handleAdminLogin}
      onStudentLogin={handleStudentLogin}
    />
  );
}
