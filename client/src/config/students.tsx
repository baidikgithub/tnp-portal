import type { ColumnsType } from "antd/es/table";
import { Space, Tag, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { Student } from "@/types/common";
import type { ViewType } from "@/types/common";

export const STUDENT_VIEWS: ViewType[] = [
  "all",
  "byCompany",
  "byGuide",
  "byBatch",
  "byDepartment",
];

export const getStudentTableColumns = (
  students: Student[],
  handleViewStudent: (student: Student) => void,
  handleEditStudent: (student: Student) => void
): ColumnsType<Student> => [
  {
    title: <span style={{ fontSize: 12 }}>Name</span>,
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Registration Number</span>,
    dataIndex: "rollNumber",
    key: "rollNumber",
    sorter: (a, b) => a.rollNumber.localeCompare(b.rollNumber),
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Department</span>,
    dataIndex: "department",
    key: "department",
    filters: Array.from(new Set(students.map((s) => s.department))).map(
      (dept) => ({ text: dept, value: dept })
    ),
    onFilter: (value, record) => record.department === value,
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Email</span>,
    dataIndex: "email",
    key: "email",
    render: (email) => <span style={{ fontSize: 12 }}>{email || "-"}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Batch</span>,
    dataIndex: "batch",
    key: "batch",
    filters: Array.from(new Set(students.map((s) => s.batch))).map(
      (batch) => ({ text: batch, value: batch })
    ),
    onFilter: (value, record) => record.batch === value,
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Guide</span>,
    dataIndex: "guide",
    key: "guide",
    render: (guide) => <span style={{ fontSize: 12 }}>{guide || "-"}</span>,
  },
  {
    title: <span style={{ fontSize: 12 }}>Status</span>,
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        style={{ fontSize: 12 }}
        color={
          status === "placed"
            ? "success"
            : status === "inProgress"
            ? "processing"
            : "default"
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    ),
  },
  {
    title: <span style={{ fontSize: 12 }}>Profile Completed</span>,
    dataIndex: "profileCompleted",
    key: "profileCompleted",
    render: (completed) => (
      <Tag
        style={{ fontSize: 12 }}
        color={completed ? "success" : "warning"}
      >
        {completed ? "Completed" : "Incomplete"}
      </Tag>
    ),
  },
  {
    title: <span style={{ fontSize: 12 }}>Created At</span>,
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => (
      <span style={{ fontSize: 12 }}>
        {new Date(date).toLocaleDateString()}
      </span>
    ),
  },
  {
    title: <span style={{ fontSize: 12 }}>Updated At</span>,
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date) => (
      <span style={{ fontSize: 12 }}>
        {new Date(date).toLocaleDateString()}
      </span>
    ),
  },
  {
    title: <span style={{ fontSize: 12 }}>Actions</span>,
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleViewStudent(record)}
        />
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEditStudent(record)}
        />
      </Space>
    ),
  },
];
