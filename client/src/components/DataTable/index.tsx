'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  size = 'middle'
}: {
  data: T[];
  columns: ColumnsType<T>;
  rowKey: string;
  size?: 'small' | 'middle' | 'large';
}) {
  return (
    <Table 
      dataSource={data} 
      columns={columns} 
      rowKey={rowKey}
      size="middle"
      pagination={{ 
        pageSize: 10,
        showSizeChanger: true,
      }}
      className="custom-table"
    />
  )
}
