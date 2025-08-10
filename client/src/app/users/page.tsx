'use client';

import { Space, Button } from 'antd';
import { DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { DateRangeFilter } from '@/components/DateRangeFilter';
import { SearchFilter } from '@/components/SearchFilter';
import { DataTable } from '@/components/DataTable';
import type { ColumnsType } from 'antd/es/table';

export interface Customer {
  key: string;
  registrationNumber: string; // Added missing field
  name: string;
  phone: string;
  address: string;
  email?: string;
}

const columns: ColumnsType<Customer> = [
  { title: <span style={{ fontSize: 12 }}>Registration Number</span>, dataIndex: 'registrationNumber', key: 'registrationNumber', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Name</span>, dataIndex: 'name', key: 'name', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Phone</span>, dataIndex: 'phone', key: 'phone', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Address</span>, dataIndex: 'address', key: 'address', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Email</span>, dataIndex: 'email', key: 'email', render: (text) => <span style={{ fontSize: 12 }}>{text || '-'}</span> },
];

const DUMMY_USERS: Customer[] = [
  { key: '1', registrationNumber: 'REG001', name: 'John Doe',  phone: '1234567890', address: '123 Main St, Mumbai', email: 'john@gmail.com' },
  { key: '2', registrationNumber: 'REG002', name: 'Jane Smith', phone: '9876543210', address: '456 Park Ave, Delhi', email: 'jane@gmail.com' },
  { key: '3', registrationNumber: 'REG003', name: 'Alice Johnson', phone: '5554443333', address: '789 Church Rd, Bangalore', email: 'alice@hotmail.com' },
];

export default function UsersDataPage() {
  const [users, setUsers] = useState<Customer[]>([]);
  const [filteredData, setFilteredData] = useState<Customer[]>([]);

  useEffect(() => {
    setUsers(DUMMY_USERS);
    setFilteredData(DUMMY_USERS);
  }, []);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setFilteredData(
      users.filter(
        (item) =>
          item.registrationNumber.toLowerCase().includes(lower) ||
          item.name.toLowerCase().includes(lower) ||
          item.phone.includes(value) ||
          item.address.toLowerCase().includes(lower) ||
          item.tag.toLowerCase().includes(lower) ||
          (item.email && item.email.toLowerCase().includes(lower))
      )
    );
  };

  return (
    <main className="p-4">
      {/* Controls */}
      <Space className="mb-4" size={16} wrap style={{ width: '100%' }}>
        <DateRangeFilter onChange={() => {}} />
        <SearchFilter
          placeholder="Registration / Name / Mobile / Address / Tag / Email"
          style={{ width: 400 }}
          onSearch={handleSearch}
        />
        <Button type="text" icon={<FilterOutlined />} onClick={() => console.log('Filter clicked')}> Filter </Button>
        <Button type="text" icon={<DownloadOutlined />} onClick={() => console.log('Download clicked')}> Download </Button>
      </Space>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm" style={{ marginTop: 8 }}>
        <DataTable data={filteredData} columns={columns} rowKey="key" size="middle" />
      </div>
    </main>
  );
}
