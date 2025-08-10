import React from "react";
import { Space, Button, DatePicker } from "antd";
import { NotificationOutlined, UploadOutlined, FilterOutlined } from "@ant-design/icons";
import { SearchFilter } from "@/components/SearchFilter"; // adjust based on your setup
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface NoticeFiltersProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  onDateRangeChange: (range: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void;
  onUploadClick: () => void;
}

export const NoticeFilters: React.FC<NoticeFiltersProps> = ({
  searchTerm,
  onSearch,
  dateRange,
  onDateRangeChange,
  onUploadClick,
}) => {
  return (
    <Space wrap style={{ marginBottom: 20 }}>
      <SearchFilter
        placeholder="Search notices..."
        style={{ width: 240 }}
        onSearch={onSearch}
      />
      <RangePicker value={dateRange || undefined} onChange={onDateRangeChange} />
      <Button icon={<FilterOutlined />} onClick={() => console.log("Filter clicked")}>
        Filter
      </Button>
      <Button icon={<NotificationOutlined />} onClick={() => console.log("Notify clicked")}>
        Notify
      </Button>
      <Button icon={<UploadOutlined />} onClick={onUploadClick}>
        Upload
      </Button>
    </Space>
  );
};
