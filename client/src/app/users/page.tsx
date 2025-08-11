'use client';

import { Space, Button } from 'antd';
import { DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { DateRangeFilter } from '@/components/DateRangeFilter';
import { SearchFilter } from '@/components/SearchFilter';
import { DataTable } from '@/components/DataTable';
import type { ColumnsType } from 'antd/es/table';
import { DUMMY_USERS } from '@/data/users';
import type { User } from '@/types/users';
import {getUserTableColumns} from '@/config/users';
export default function UsersDataPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);

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
        <DataTable data={filteredData} columns={getUserTableColumns} rowKey="key" size="middle" />
      </div>
    </main>
  );
}
