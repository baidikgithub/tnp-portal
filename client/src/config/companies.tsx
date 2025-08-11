
import type { ColumnsType } from "antd/es/table";
import { Tag, Space, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { Company } from "@/types/common";
import type { ViewType } from "@/types/common";

// Define the available views for Company records
export const COMPANY_VIEWS: ViewType[] = ["all", "byIndustry", "byLocation"];

// Factory function so we can pass in the companies array for dynamic filters
export const getCompanyTableColumns = (
  companies: Company[],
  handleViewCompany: (company: Company) => void,
  handleEditCompany: (company: Company) => void
): ColumnsType<Company> => [
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Name</span>,
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Industry</span>,
    dataIndex: "industry",
    key: "industry",
    filters: Array.from(new Set(companies.map(c => c.industry))).map(industry => ({
      text: industry,
      value: industry,
    })),
    onFilter: (value, record) => record.industry === value,
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Location</span>,
    dataIndex: "location",
    key: "location",
    filters: Array.from(new Set(companies.map(c => c.location))).map(location => ({
      text: location,
      value: location,
    })),
    onFilter: (value, record) => record.location === value,
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Contact Person</span>,
    dataIndex: "contactPerson",
    key: "contactPerson",
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Email</span>,
    dataIndex: "email",
    key: "email",
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Phone</span>,
    dataIndex: "phone",
    key: "phone",
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Status</span>,
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag style={{ fontSize: 12 }} color={status === "active" ? "success" : "error"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    ),
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Total Placements</span>,
    dataIndex: "totalPlacements",
    key: "totalPlacements",
    sorter: (a, b) => a.totalPlacements - b.totalPlacements,
    render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
  },
  {
    title: <span style={{ fontSize: 12, fontWeight: "normal" }}>Actions</span>,
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button
          style={{ fontSize: 12 }}
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleViewCompany(record)}
        />
        <Button
          style={{ fontSize: 12 }}
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEditCompany(record)}
        />
      </Space>
    ),
  },
];
