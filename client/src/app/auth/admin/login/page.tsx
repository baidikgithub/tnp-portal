'use client';
import React, { useState } from 'react';
import AuthLogo from '@/components/AuthLogo';
import AdminLoginForm from '@/components/AdminLoginPage';  // Correct import path
import RotatingBanner from '@/components/RotatingBanner';

const AdminLoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Login values:', values);
      // redirect or auth logic here
    }, 1000);
  };

  const messages = [
    'Empower Your Future with SMIT Training and Placement',
    'Access Placement Resources, Aptitude Tests, and Company Profiles',
    'Unlock Career Opportunities Through Our Portal',
    'Prepare. Perform. Get Placed.',
  ];

  const images = ['/images1.jpeg', '/images2.jpeg', '/images3.jpg', '/images2.jpeg'];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        background: '#f7f8fa',
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          padding: '48px 0',
        }}
      >
        <div
          style={{
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <AuthLogo logoSrc="/smit.png" title="Training and Placement Cell Portal" />
          <AdminLoginForm
            onLogin={handleLogin}
            loading={loading}
            forgotLink={{ label: 'Forgot password?', href: '/auth/forgot-password' }}
            footerText="Don't have an account?"
            footerLink={{ label: 'Register', href: '/auth/register' }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <RotatingBanner messages={messages} images={images} />
    </div>
  );
};

export default AdminLoginPage;
