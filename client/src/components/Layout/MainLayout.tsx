'use client';

import { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, App } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Sider, Content } = Layout;

const getMenuItems = () => [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'students', icon: <UserOutlined />, label: 'Students' },
  { key: 'companies', icon: <SettingOutlined />, label: 'Companies' },
  { key: 'guides', icon: <SettingOutlined />, label: 'Guides' },
  { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'users', icon: <UserOutlined />, label: 'Users' },
  { key: 'notices', icon: <SettingOutlined />, label: 'Notices' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const router = useRouter();
  const { message } = App.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Initial selected based on URL
  useEffect(() => {
    const pathKey = window.location.pathname.split('/')[1] || 'dashboard';
    setSelectedKey(pathKey);
  }, []);

  const handleMenuClick = (info: any) => {
    setSelectedKey(info.key);
    router.push(`/${info.key}`);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Toggle Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-end',
            alignItems: 'center',
            height: 64,
            paddingRight: collapsed ? 0 : 8,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 40, height: 40, color: 'whitesmoke' }}
          />
        </div>

        {/* Menu Items */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={getMenuItems()}
          onClick={handleMenuClick}
          style={{ flex: 1, overflowY: 'auto' }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.2s ease',
          minHeight: '100vh',
        }}
      >
        <Content
          style={{
            padding: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 8,
            margin: 12,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
