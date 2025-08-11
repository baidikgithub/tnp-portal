import type { ColumnsType } from "antd/es/table";
import type { User } from "@/types/users";
export const getUserTableColumns: ColumnsType<User> = [
  { title: <span style={{ fontSize: 12 }}>Registration Number</span>, dataIndex: 'registrationNumber', key: 'registrationNumber', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Name</span>, dataIndex: 'name', key: 'name', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Phone</span>, dataIndex: 'phone', key: 'phone', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Address</span>, dataIndex: 'address', key: 'address', render: (text) => <span style={{ fontSize: 12 }}>{text}</span> },
  { title: <span style={{ fontSize: 12 }}>Email</span>, dataIndex: 'email', key: 'email', render: (text) => <span style={{ fontSize: 12 }}>{text || '-'}</span> },
];