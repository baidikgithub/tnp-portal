'use client';

import React from 'react';
import { Button, Typography, Layout, Space } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { Content } = Layout;

interface WelcomePageProps {
  onAdminLogin: () => void;
  onStudentLogin: () => void;
}

const bgImageUrl = '/images1.jpeg';
const logoUrl = '/smit.png';

export const WelcomePage: React.FC<WelcomePageProps> = ({ onAdminLogin, onStudentLogin }) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.70)', // 85% opacity even darker
          zIndex: 1,
        }}
      />
      <Content
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '0 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* Logo with animation */}
        <motion.img
          src={logoUrl}
          alt="SMIT Logo"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: 200, marginBottom: 32 }}
        />

        {/* Welcome message with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Title style={{ color: 'white', fontWeight: 'bold', maxWidth: 600 }}>
            Welcome to Sikkim Manipal Institute of Technology
          </Title>
        </motion.div>

        {/* Buttons with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Space size="large" style={{ marginTop: 32 }}>
            <Button type="primary" size="large" onClick={onAdminLogin} style={{ minWidth: 160 }}>
              T&amp;P Login (Admin)
            </Button>
            <Button type="default" size="large" onClick={onStudentLogin} style={{ minWidth: 160 }}>
              Student Login
            </Button>
          </Space>
        </motion.div>
      </Content>
    </Layout>
  );
};