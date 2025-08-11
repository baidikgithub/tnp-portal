'use client';

import React, { useEffect, useState, useMemo } from "react";
import { Spin, Empty, Pagination, Form } from "antd";
import dayjs from "dayjs";
import { Notice } from "@/types/notice";
import { NoticeFilters } from "@/components/NoticeFilters";
import { NoticeList } from "@/components/NoticeList";
import { NoticeUploadModal } from "@/components/NoticeUploadModal";
import { DUMMY_NOTICES } from "@/data/notices";
const NoticesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 5;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotices(DUMMY_NOTICES);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNotices = useMemo(() => {
    return notices
      .filter((n) => {
        if (
          searchTerm &&
          !n.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !n.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return false;
        if (dateRange && dateRange[0] && dateRange[1]) {
          const d = dayjs(n.date);
          if (d.isBefore(dateRange[0], "day") || d.isAfter(dateRange[1], "day")) return false;
        }
        return true;
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [notices, searchTerm, dateRange]);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredNotices.slice(startIndex, startIndex + pageSize);
  }, [filteredNotices, currentPage]);

  const handleUpload = () => {
    form.validateFields().then((values) => {
      const newNotice: Notice = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        date: dayjs().format("YYYY-MM-DD"),
        fileUrl: values.file?.[0]?.originFileObj
          ? URL.createObjectURL(values.file[0].originFileObj)
          : undefined,
        fileType: values.file?.[0]?.name?.split(".").pop(),
      };
      setNotices((prev) => [newNotice, ...prev]);
      setUploadModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "flex-start" }}>
      <div style={{ width: "100%", maxWidth: 1400, padding: 2 }}>
        <NoticeFilters
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onUploadClick={() => setUploadModalVisible(true)}
        />

        <NoticeUploadModal
          visible={uploadModalVisible}
          onCancel={() => setUploadModalVisible(false)}
          onOk={handleUpload}
          form={form}
        />

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Spin size="large" />
          </div>
        ) : filteredNotices.length === 0 ? (
          <Empty description="No notices found" />
        ) : (
          <>
            <NoticeList notices={paginatedNotices} />
            <div style={{ textAlign: "left", marginTop: 20 }}>
              <Pagination
                current={currentPage}
                total={filteredNotices.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
