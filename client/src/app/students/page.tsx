'use client';

import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RecordsLayout from '@/components/RecordsLayout';
import { Student, ViewType } from '@/types/common';
import { MOCK_STUDENTS } from '@/data/students';
const StudentRecordsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>('all');

  // ✅ Row selection state
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<Student> = [
    {
      title: <span style={{ fontSize: 12 }}>Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Registration Number</span>,
      dataIndex: 'rollNumber',
      key: 'rollNumber',
      sorter: (a, b) => a.rollNumber.localeCompare(b.rollNumber),
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Department</span>,
      dataIndex: 'department',
      key: 'department',
      filters: Array.from(new Set(students.map(s => s.department))).map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Email</span>,
      dataIndex: 'email',
      key: 'email',
      render: (email) => <span style={{ fontSize: 12 }}>{email || '-'}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Batch</span>,
      dataIndex: 'batch',
      key: 'batch',
      filters: Array.from(new Set(students.map(s => s.batch))).map(batch => ({
        text: batch,
        value: batch,
      })),
      onFilter: (value, record) => record.batch === value,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Guide</span>,
      dataIndex: 'guide',
      key: 'guide',
      render: (guide) => <span style={{ fontSize: 12 }}>{guide || '-'}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag style={{ fontSize: 12 }}
             color={status === 'placed' ? 'success' :
                    status === 'inProgress' ? 'processing' : 'default'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontSize: 12 }}>Profile Completed</span>,
      dataIndex: 'profileCompleted',
      key: 'profileCompleted',
      render: (completed) => (
        <Tag style={{ fontSize: 12 }} color={completed ? 'success' : 'warning'}>
          {completed ? 'Completed' : 'Incomplete'}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontSize: 12 }}>Created At</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span style={{ fontSize: 12 }}>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Updated At</span>,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => <span style={{ fontSize: 12 }}>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => handleViewStudent(record)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEditStudent(record)} />
        </Space>
      ),
    },
  ];

  const availableViews: ViewType[] = ['all', 'byCompany', 'byGuide', 'byBatch', 'byDepartment'];

  useEffect(() => {
    setStudents(MOCK_STUDENTS);
    setFilteredStudents(MOCK_STUDENTS);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredStudents(
      students.filter(student =>
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.rollNumber.toLowerCase().includes(searchValue) ||
        (student.company && student.company.toLowerCase().includes(searchValue)) ||
        (student.guide && student.guide.toLowerCase().includes(searchValue))
      )
    );
  };

  const handleViewStudent = (student: Student) => {
    console.log('View student:', student);
  };

  const handleEditStudent = (student: Student) => {
    console.log('Edit student:', student);
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnKey) ? prev.filter(key => key !== columnKey) : [...prev, columnKey]
    );
  };

  // ✅ Row selection logic
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log('Selected student IDs: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const filteredColumns = columns.filter(col => !selectedColumns.includes(col.key as string));

  return (
    <RecordsLayout
      title="Student Records"
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
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Table
          className="compact-table"
          rowSelection={rowSelection} // ✅ Enable checkboxes
          columns={filteredColumns}
          dataSource={filteredStudents}
          rowKey="id"
          size="middle"
        />
      </div>
    </RecordsLayout>
  );
};

export default StudentRecordsPage;
