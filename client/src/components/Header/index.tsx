'use client';
import React from 'react';
import { Layout, Typography, Row, Col, Image } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

interface AppHeaderProps {
  logoSrc: string;
  title: string;
  subtitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ logoSrc, title, subtitle }) => {
  return (
    <Header
      style={{
        background: 'linear-gradient(90deg, #0f1c4d 0%, #1c2d61 100%)',
        padding: '0 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <Row align="middle" justify="space-between" style={{ width: '100%' }}>
        <Col>
          <Row align="middle" gutter={24} wrap={false}>
            <Col>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  marginRight: 20,
                }}
              >
                <Image
                  src={logoSrc}
                  alt="Logo"
                  preview={false}
                  width={48}
                  height={48}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Col>
            <Col>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: '#fff',
                  fontWeight: 800,
                  letterSpacing: 1,
                  fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                }}
              >
                {title}
              </Title>
              <Text
                strong
                style={{
                  color: '#e0e7ff',
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                }}
              >
                {subtitle}
              </Text>
            </Col>
          </Row>
        </Col>
        {/* Optional: Right-aligned section for contact or quick links */}
        {/* <Col>
          <div style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>
            Contact: +91 9732947000
          </div>
        </Col> */}
      </Row>
    </Header>
  );
};

export default AppHeader;
