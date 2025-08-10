'use client';
import React, { useState } from 'react';
import { Row, Col, Divider, Space, Button } from 'antd';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';

export default function UsersDataPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Nicholas Swatz',
    employeeID: '202422006',
    phone: '(629) 555-0123',
    email: 'nicholasswatz@gmail.com',
    address: '390 Market Street, Suite 200',
    city: 'San Francisco CA',
    postcode: '94102',
    dob: 'Sep 26, 1988',
    nationalID: 'GER10654',
    title: 'Project Manager',
    hireDate: 'Jan 05, 2023',
    avatarUrl: 'https://i.pravatar.cc/150',
  });

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };
  const handleSaveProfile = () => {
    // Save changes to backend here
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  return (
    <main className="p-4">
      <Row gutter={16}>
        <Col xs={24} md={8} lg={6}>
          <LeftSidebar
            {...formData}
            isEditing={isEditing}
            onEditProfile={handleEditProfile}
            onNameChange={(v) => setFormData({ ...formData, name: v })}
            onEmployeeIDChange={(v) => setFormData({ ...formData, employeeID: v })}
            onPhoneChange={(v) => setFormData({ ...formData, phone: v })}
            onEmailChange={(v) => setFormData({ ...formData, email: v })}
            onAddressChange={(v) => setFormData({ ...formData, address: v })}
            onCityChange={(v) => setFormData({ ...formData, city: v })}
            onPostcodeChange={(v) => setFormData({ ...formData, postcode: v })}
            onDobChange={(v) => setFormData({ ...formData, dob: v })}
            onNationalIDChange={(v) => setFormData({ ...formData, nationalID: v })}
            onTitleChange={(v) => setFormData({ ...formData, title: v })}
            onHireDateChange={(v) => setFormData({ ...formData, hireDate: v })}
            onAvatarUpload={handleAvatarUpload}
          />
        </Col>


        <Col xs={24} md={16} lg={18}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <RightSidebar
              title="Experience"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Education"
              fields={[
                { name: 'school', label: 'School', type: 'text', rules: [{ required: true }] },
                { name: 'degree', label: 'Degree', type: 'text', rules: [{ required: true }] },
                { name: 'grade', label: 'Grade', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Skills"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
            <RightSidebar
              title="Projects"
              fields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Certifications"
              fields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'organisation', label: 'Issuing Orgainsation', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Courses"
              fields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'organisation', label: 'Issuing Orgainsation', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Publications"
              fields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'organisation', label: 'Issuing Orgainsation', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
            <RightSidebar
              title="Career Breaks"
              fields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'organisation', label: 'Issuing Orgainsation', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
              ]}
            />
          </div>
        </Col>

      </Row>
    </main>
  );
}
