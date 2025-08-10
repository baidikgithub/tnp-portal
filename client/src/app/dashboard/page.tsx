'use client';

import {
  Row,
  Col,
  Space,
  Switch,
  Button,
  Dropdown,
  DatePicker,
  Input,
  Table,
  Card,
  Statistic,
  Menu,
} from 'antd';
import {
  DownloadOutlined,
  DownOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;

// ---- Types ----
interface Student {
  key: string;
  name: string;
  department: string;
  profileCompleted: boolean;
  placed: boolean;
  cgpa: number;
}

// ---- Dummy Students ----
const DUMMY_STUDENTS: Student[] = [
  { key: '1', name: 'John Doe', department: 'Computer Science', profileCompleted: true, placed: true, cgpa: 8.5 },
  { key: '2', name: 'Jane Smith', department: 'Electrical Engineering', profileCompleted: false, placed: false, cgpa: 7.8 },
  { key: '3', name: 'Mike Johnson', department: 'Mechanical Engineering', profileCompleted: true, placed: false, cgpa: 9.2 },
  { key: '4', name: 'Sarah Wilson', department: 'Computer Science', profileCompleted: true, placed: true, cgpa: 8.0 },
  { key: '5', name: 'David Brown', department: 'Civil Engineering', profileCompleted: false, placed: false, cgpa: 7.5 },
];

// ---- Table Columns ----
const columns: ColumnsType<Student> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Department', dataIndex: 'department', key: 'department' },
  {
    title: 'Profile Completed',
    dataIndex: 'profileCompleted',
    key: 'profileCompleted',
    render: (val: boolean) => (val ? 'Yes' : 'No'),
  },
  {
    title: 'Placed',
    dataIndex: 'placed',
    key: 'placed',
    render: (val: boolean) => (val ? 'Yes' : 'No'),
  },
  { title: 'CGPA', dataIndex: 'cgpa', key: 'cgpa' },
];

// ---- Helper functions ----
function getDepartmentStats(students: Student[]) {
  const deptMap: Record<string, { total: number; registered: number; placed: number }> = {};
  students.forEach((s) => {
    if (!deptMap[s.department]) {
      deptMap[s.department] = { total: 0, registered: 0, placed: 0 };
    }
    deptMap[s.department].total++;
    if (s.profileCompleted) deptMap[s.department].registered++;
    if (s.placed) deptMap[s.department].placed++;
  });
  return Object.keys(deptMap).map((dept) => ({
    department: dept,
    total: deptMap[dept].total,
    registered: deptMap[dept].registered,
    placed: deptMap[dept].placed,
  }));
}

// ---- Components ----
function HeaderSwitch({
  title,
  leftLabel,
  rightLabel,
  checked,
  onChange,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <span>{leftLabel}</span>
      <Switch checked={checked} onChange={onChange} />
      <span>{rightLabel}</span>
    </div>
  );
}

function IconButtonDropdown({
  buttonName,
  icon,
  dropdownOptions,
}: {
  buttonName: string;
  icon: React.ReactNode;
  dropdownOptions: { key: string; label: string }[];
}) {
  const menuItems = (
    <Menu
      items={dropdownOptions.map((opt) => ({
        key: opt.key,
        label: opt.label,
      }))}
    />
  );

  return (
    <Dropdown overlay={menuItems}>
      <Button icon={icon}>
        {buttonName} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

function DateRangeFilter({ onChange }: { onChange: (dates: any) => void }) {
  return <RangePicker onChange={onChange} />;
}

function SearchFilter({
  placeholder,
  style,
  onSearch,
}: {
  placeholder: string;
  style?: React.CSSProperties;
  onSearch: (value: string) => void;
}) {
  return (
    <Input.Search
      placeholder={placeholder}
      style={style}
      allowClear
      onSearch={onSearch}
    />
  );
}

function DataTable<T extends object>({
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
      size={size}
      pagination={{ 
        pageSize: 8,
        size: "small"
      }}
      scroll={{ x: 'max-content' }}
    />
  );
}

// ---- Main Page ----
export default function StudentsDashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  // Define grid layout configuration
  const gridConfig = {
    gutter: [16, 16],
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6
  };

  useEffect(() => {
    setStudents(DUMMY_STUDENTS);
    setFilteredData(DUMMY_STUDENTS);
  }, []);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    let result = students.filter((item) =>
      item.name.toLowerCase().includes(lower)
    );
    if (departmentFilter !== 'all') {
      result = result.filter((item) => item.department === departmentFilter);
    }
    setFilteredData(result);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartmentFilter(value);
    let result = students;
    if (value !== 'all') {
      result = result.filter((item) => item.department === value);
    }
    setFilteredData(result);
  };

  const departmentMenu = (
    <Menu
      onClick={({ key }) => handleDepartmentChange(key)}
      items={[
        { key: 'all', label: 'All Departments' },
        ...Array.from(new Set(students.map((s) => s.department))).map(
          (dept) => ({
            key: dept,
            label: dept,
          })
        ),
      ]}
    />
  );

  // Stats
  const totalStudents = students.length;
  const totalRegistered = students.filter((s) => s.profileCompleted).length;
  const totalPlaced = students.filter((s) => s.placed).length;
  const totalCompanies = 12;
  const departmentStats = getDepartmentStats(students);

  return (
    <main className="p-4">


      {/* Stats */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Students" value={totalStudents} prefix={<UserOutlined />} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Profiles Completed" value={totalRegistered} prefix={<TeamOutlined />} valueStyle={{ color: '#108ee9' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Companies Visiting" value={totalCompanies} valueStyle={{ color: '#2f54eb' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Students Placed" value={totalPlaced} prefix={<UserOutlined />} valueStyle={{ color: '#f5222d' }} />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col xs={24} md={12}>
            <Card title="Profile Completion Status">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Completed', value: totalRegistered },
                      { name: 'Not Completed', value: totalStudents - totalRegistered },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    <Cell key="completed" fill="#52c41a" />
                    <Cell key="notCompleted" fill="#ff4d4f" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Department-wise Registration & Placement">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentStats}>
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registered" name="Registered" fill="#108ee9" />
                  <Bar dataKey="placed" name="Placed" fill="#52c41a" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

      {/* Filters */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={8}>
          <DateRangeFilter onChange={() => {}} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Dropdown overlay={departmentMenu} trigger={['click']}>
            <Button style={{ width: '100%' }}>
              {departmentFilter === 'all' ? 'All Departments' : departmentFilter} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <SearchFilter
            placeholder="Search by Name / Department"
            style={{ width: '100%' }}
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable 
          data={filteredData} 
          columns={columns} 
          rowKey="key"
          size="middle"
        />
      </div>
    </main>
  );
}
