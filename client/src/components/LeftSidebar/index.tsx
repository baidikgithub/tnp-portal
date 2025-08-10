'use client';

import React from 'react';
import {
  Typography,
  Space,
  Avatar,
  Upload,
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Input,
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  IdcardOutlined,
  CalendarOutlined,
  UserOutlined,
  SolutionOutlined,
  UploadOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface LeftSidebarProps {
  name: string;
  onNameChange: (v: string) => void;
  employeeID: string;
  onEmployeeIDChange: (v: string) => void;

  phone: string;
  onPhoneChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;

  address: string;
  onAddressChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
  postcode: string;
  onPostcodeChange: (v: string) => void;

  dob: string;
  onDobChange: (v: string) => void;
  nationalID: string;
  onNationalIDChange: (v: string) => void;
  title: string;
  onTitleChange: (v: string) => void;
  hireDate: string;
  onHireDateChange: (v: string) => void;

  avatarUrl?: string;
  onAvatarUpload: (file: File) => void;

  isEditing: boolean;
  onEditProfile: () => void;
}

const FieldDisplay: React.FC<{
  label?: string;
  icon?: React.ReactNode;
  value: string;
  editable: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ icon, value, editable, onChange, placeholder }) => {
  return editable ? (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      placeholder={placeholder || ''}
      style={{ borderBottom: '1px solid #ddd', paddingLeft: 0 }}
    />
  ) : (
    <Text>{value || 'N/A'}</Text>
  );
};

const LeftSidebar: React.FC<LeftSidebarProps> = (props) => {
  const menu = (
    <Menu
      items={[
        { key: 'edit', label: 'Edit Profile', onClick: props.onEditProfile },
        { key: 'changePhoto', label: 'Change Photo' },
        { key: 'settings', label: 'Settings' },
      ]}
    />
  );

  return (
    <div
      style={{
        position: 'relative',
        flex: '0 0 300px',
        padding: '32px 24px',
        top: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Top-right menu */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <Tooltip title="More options">
            <Button shape="circle" icon={<EllipsisOutlined />} size="small" type="text" />
          </Tooltip>
        </Dropdown>
      </div>

      {/* Avatar Upload */}
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          props.onAvatarUpload(file);
          return false; // no auto-upload
        }}
        accept="image/*"
        disabled={!props.isEditing}
      >
        <Tooltip title={props.isEditing ? 'Upload profile photo' : ''}>
          <Avatar
            size={110}
            src={props.avatarUrl || undefined}
            icon={!props.avatarUrl && <UserOutlined />}
            style={{
              cursor: props.isEditing ? 'pointer' : 'default',
              marginBottom: 8,
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
            }}
          />
        </Tooltip>
        {props.isEditing && (
          <Button
            icon={<UploadOutlined />}
            size="small"
            style={{ marginTop: 8, borderRadius: 6 }}
            block
          >
            Upload Photo
          </Button>
        )}
      </Upload>

      {/* Name & ID */}
      {props.isEditing ? (
        <Input
          value={props.name}
          onChange={(e) => props.onNameChange(e.target.value)}
          size="middle"
          style={{ fontWeight: 600, textAlign: 'center' }}
        />
      ) : (
        <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
          {props.name}
        </Title>
      )}
      {props.isEditing ? (
        <Input
          value={props.employeeID}
          onChange={(e) => props.onEmployeeIDChange(e.target.value)}
          size="small"
          style={{ textAlign: 'center' }}
        />
      ) : (
        <Text type="secondary">{props.employeeID}</Text>
      )}

      {/* About */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>About</Text>
        <Space>
          <PhoneOutlined style={{ color: '#1890ff' }} />
          <FieldDisplay
            value={props.phone}
            editable={props.isEditing}
            onChange={props.onPhoneChange}
            placeholder="Phone"
          />
        </Space>
        <Space>
          <MailOutlined style={{ color: '#1890ff' }} />
          <FieldDisplay
            value={props.email}
            editable={props.isEditing}
            onChange={props.onEmailChange}
            placeholder="Email"
          />
        </Space>
      </Space>

      {/* Address */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>Address</Text>
        <Space>
          <HomeOutlined style={{ color: '#722ed1' }} />
          <FieldDisplay
            value={props.address}
            editable={props.isEditing}
            onChange={props.onAddressChange}
            placeholder="Address"
          />
        </Space>
        <Space>
          <EnvironmentOutlined style={{ color: '#52c41a' }} />
          <FieldDisplay
            value={props.city}
            editable={props.isEditing}
            onChange={props.onCityChange}
            placeholder="City"
          />
        </Space>
        <Space>
          <SolutionOutlined style={{ color: '#eb2f96' }} />
          <FieldDisplay
            value={props.postcode}
            editable={props.isEditing}
            onChange={props.onPostcodeChange}
            placeholder="Postcode"
          />
        </Space>
      </Space>

      {/* Details */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>Student Details</Text>
        <Space>
          <CalendarOutlined style={{ color: '#fa8c16' }} />
          <FieldDisplay
            value={props.dob}
            editable={props.isEditing}
            onChange={props.onDobChange}
            placeholder="DOB"
          />
        </Space>
        <Space>
          <IdcardOutlined style={{ color: '#13c2c2' }} />
          <FieldDisplay
            value={props.nationalID}
            editable={props.isEditing}
            onChange={props.onNationalIDChange}
            placeholder="National ID"
          />
        </Space>
        <Space>
          <UserOutlined style={{ color: '#2f54eb' }} />
          <FieldDisplay
            value={props.title}
            editable={props.isEditing}
            onChange={props.onTitleChange}
            placeholder="Title"
          />
        </Space>
        <Space>
          <CalendarOutlined style={{ color: '#faad14' }} />
          <FieldDisplay
            value={props.hireDate}
            editable={props.isEditing}
            onChange={props.onHireDateChange}
            placeholder="Hire Date"
          />
        </Space>
      </Space>
    </div>
  );
};

export default LeftSidebar;
