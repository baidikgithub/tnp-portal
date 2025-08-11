"use client";

import { useState, useEffect } from "react";
import { Table } from "antd";
import RecordsLayout from "@/components/RecordsLayout";
import type { Student, ViewType } from "@/types/common";
import { MOCK_STUDENTS } from "@/data/students";
import { getStudentTableColumns } from "@/config/students";
import { STUDENT_VIEWS } from "@/config/students";

const StudentRecordsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>("all");

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setStudents(MOCK_STUDENTS);
    setFilteredStudents(MOCK_STUDENTS);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchValue) ||
          student.email.toLowerCase().includes(searchValue) ||
          student.rollNumber.toLowerCase().includes(searchValue) ||
          (student.company &&
            student.company.toLowerCase().includes(searchValue)) ||
          (student.guide &&
            student.guide.toLowerCase().includes(searchValue))
      )
    );
  };

  const handleViewStudent = (student: Student) => {
    console.log("View student:", student);
  };

  const handleEditStudent = (student: Student) => {
    console.log("Edit student:", student);
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const columns = getStudentTableColumns(
    students,
    handleViewStudent,
    handleEditStudent
  );

  const filteredColumns = columns.filter(
    (col) => !selectedColumns.includes(col.key as string)
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log("Selected student IDs: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  return (
    <RecordsLayout
      title="Student Records"
      hideColumnsModalVisible={hideColumnsModalVisible}
      searchText={searchText}
      selectedColumns={selectedColumns}
      filteredColumns={filteredColumns.map((col) => col.title as string)}
      selectedView={selectedView}
      availableViews={STUDENT_VIEWS}
      onViewChange={setSelectedView}
      onHideColumnsToggle={handleHideColumnsToggle}
      onSearchTextChange={(value) => {
        setSearchText(value);
        handleSearch(value);
      }}
      onHideAll={() =>
        setSelectedColumns(columns.map((col) => col.key as string))
      }
      onShowAll={() => setSelectedColumns([])}
      onColumnToggle={handleColumnToggle}
    >
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table
          className="compact-table"
          rowSelection={rowSelection}
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
