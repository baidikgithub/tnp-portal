"use client";

import { useState, useEffect } from "react";
import { Table } from "antd";
import RecordsLayout from "@/components/RecordsLayout";
import type { Company, ViewType } from "@/types/common";
import { MOCK_COMPANIES } from "@/data/companies";
import { getCompanyTableColumns } from "@/config/companies";
import { COMPANY_VIEWS } from "@/config/companies";

const CompanyRecordsPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>("all");

  useEffect(() => {
    setCompanies(MOCK_COMPANIES);
    setFilteredCompanies(MOCK_COMPANIES);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredCompanies(
      companies.filter(company =>
        company.name.toLowerCase().includes(searchValue) ||
        company.industry.toLowerCase().includes(searchValue) ||
        company.location.toLowerCase().includes(searchValue) ||
        company.contactPerson.toLowerCase().includes(searchValue) ||
        company.email.toLowerCase().includes(searchValue) ||
        company.phone.includes(searchValue)
      )
    );
  };

  const handleViewCompany = (company: Company) => {
    console.log("View company:", company);
  };

  const handleEditCompany = (company: Company) => {
    console.log("Edit company:", company);
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnKey) ? prev.filter(key => key !== columnKey) : [...prev, columnKey]
    );
  };

  const columns = getCompanyTableColumns(companies, handleViewCompany, handleEditCompany);
  const filteredColumns = columns.filter(col => !selectedColumns.includes(col.key as string)).map(col => col.title as string);

  return (
    <RecordsLayout
      title="Company Records"
      hideColumnsModalVisible={hideColumnsModalVisible}
      searchText={searchText}
      selectedColumns={selectedColumns}
      filteredColumns={filteredColumns}
      selectedView={selectedView}
      availableViews={COMPANY_VIEWS}
      onViewChange={setSelectedView}
      onHideColumnsToggle={handleHideColumnsToggle}
      onSearchTextChange={(value) => {
        setSearchText(value);
        handleSearch(value);
      }}
      onHideAll={() => setSelectedColumns(columns.map(col => col.key as string))}
      onShowAll={() => setSelectedColumns([])}
      onColumnToggle={handleColumnToggle}
    >
      <Table
        columns={columns.filter(col => !selectedColumns.includes(col.key as string))}
        dataSource={filteredCompanies}
        rowKey="id"
        size="middle"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} companies`,
        }}
      />
    </RecordsLayout>
  );
};

export default CompanyRecordsPage;
