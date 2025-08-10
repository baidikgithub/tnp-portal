'use client';
import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RecordsLayout from '@/components/RecordsLayout';
import { Guide, ViewType } from '@/types/common';

// Mock data
const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Dr. Smith',
    email: 'smith@university.edu',
    department: 'Computer Science',
    designation: 'Associate Professor',
    specialization: 'Machine Learning',
    status: 'active',
    assignedStudents: 8,
    createdAt: '2023-01-01',
    updatedAt: '2023-08-09'
  }
];

const GuideRecordsPage = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>('all');

  // ✅ New state for row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<Guide> = [
    {
      title: <span style={{ fontSize: 12 }}>Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Department</span>,
      dataIndex: 'department',
      key: 'department',
      filters: Array.from(new Set(guides.map(g => g.department))).map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Designation</span>,
      dataIndex: 'designation',
      key: 'designation',
      filters: Array.from(new Set(guides.map(g => g.designation))).map(designation => ({
        text: designation,
        value: designation,
      })),
      onFilter: (value, record) => record.designation === value,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Specialization</span>,
      dataIndex: 'specialization',
      key: 'specialization',
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Email</span>,
      dataIndex: 'email',
      key: 'email',
      render: (email) => <span style={{ fontSize: 12 }}>{email || '-'}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Assigned Students</span>,
      dataIndex: 'assignedStudents',
      key: 'assignedStudents',
      sorter: (a, b) => a.assignedStudents - b.assignedStudents,
      render: (count) => <span style={{ fontSize: 12 }}>{count}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewGuide(record)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEditGuide(record)} />
        </Space>
      ),
    },
  ];

  const availableViews: ViewType[] = ['all', 'byDepartment'];

  useEffect(() => {
    setGuides(MOCK_GUIDES);
    setFilteredGuides(MOCK_GUIDES);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredGuides(
      guides.filter(guide =>
        guide.name.toLowerCase().includes(searchValue) ||
        guide.department.toLowerCase().includes(searchValue) ||
        guide.designation.toLowerCase().includes(searchValue) ||
        guide.specialization.toLowerCase().includes(searchValue) ||
        guide.email.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleViewGuide = (guide: Guide) => {
    console.log('View guide:', guide);
  };

  const handleEditGuide = (guide: Guide) => {
    console.log('Edit guide:', guide);
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const filteredColumns = columns.filter(col => !selectedColumns.includes(col.key as string));

  // ✅ Row selection logic
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log('Selected row keys: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <RecordsLayout
      title="Guide Records"
      hideColumnsModalVisible={hideColumnsModalVisible}
      searchText={searchText}
      selectedColumns={selectedColumns}
      filteredColumns={filteredColumns.map(col => col.title as string)}
      selectedView={selectedView}
      availableViews={availableViews}
      onViewChange={setSelectedView}
      onHideColumnsToggle={handleHideColumnsToggle}
      onSearchTextChange={(value) => {
        setSearchText(value);
        handleSearch(value);
      }}
      onHideAll={() => setSelectedColumns(columns.map(col => col.key as string))}
      onShowAll={() => setSelectedColumns([])}
      onColumnToggle={handleColumnToggle}
    >
      <Table
        rowSelection={rowSelection} // ✅ Enable checkbox selection
        columns={filteredColumns}
        dataSource={filteredGuides}
        rowKey="id"
        size="middle"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} guides`
        }}
      />
    </RecordsLayout>
  );
};

export default GuideRecordsPage;
