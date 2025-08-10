'use client';

import React from 'react';
import { Layout, Menu, Button, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import SubToolBar from '../SubToolBar';
import { ViewType } from '@/types/common';

interface RecordsLayoutProps {
  children: React.ReactNode;
  title: string;
  hideColumnsModalVisible: boolean;
  searchText: string;
  selectedColumns: string[];
  filteredColumns: string[];
  selectedView: ViewType;
  availableViews: ViewType[];
  onViewChange: (view: ViewType) => void;
  onHideColumnsToggle: () => void;
  onSearchTextChange: (text: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
  onColumnToggle: (column: string) => void;
}

const { Title } = Typography;

export default function RecordsLayout({
  children,
  title,
  hideColumnsModalVisible,
  searchText,
  selectedColumns,
  filteredColumns,
  selectedView,
  availableViews,
  onViewChange,
  onHideColumnsToggle,
  onSearchTextChange,
  onHideAll,
  onShowAll,
  onColumnToggle,
}: RecordsLayoutProps) {
  return (
    // <Layout className="min-h-screen">
      // <Content className="p-4">
      <>
        <div className="mb-4">
          <SubToolBar
            hideColumnsModalVisible={hideColumnsModalVisible}
            searchText={searchText}
            selectedColumns={selectedColumns}
            filteredColumns={filteredColumns}
            onHideColumnsToggle={onHideColumnsToggle}
            onSearchTextChange={onSearchTextChange}
            onHideAll={onHideAll}
            onShowAll={onShowAll}
            onColumnToggle={onColumnToggle}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          {children}
        </div>
        </>
      // </Content>
    // </Layout>
  );
}
