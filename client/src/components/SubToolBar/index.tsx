import React, { useState } from 'react';
import { Row, Space, Typography, Button, Input, Checkbox } from 'antd';
import {
  EyeOutlined,
  FilterOutlined,
  GroupOutlined,
  SortAscendingOutlined,
  TableOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface SubToolBarProps {
  hideColumnsModalVisible: boolean;
  searchText: string;
  selectedColumns: string[];
  filteredColumns: string[];
  onHideColumnsToggle: () => void;
  onSearchTextChange: (text: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
  onColumnToggle: (column: string) => void;
}

const SubToolBar: React.FC<SubToolBarProps> = ({
  hideColumnsModalVisible,
  searchText,
  selectedColumns,
  filteredColumns,
  onHideColumnsToggle,
  onSearchTextChange,
  onHideAll,
  onShowAll,
  onColumnToggle
}) => {
  // Local state for showing the search bar
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Row
        style={{
          background: '#fff',
          padding: '16px 24px',
          alignItems: 'center',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        align="middle"
        justify="space-between"
      >
        <Space size={24}>
          <Space size="small">
            <EyeOutlined style={{ fontSize: '12px' }} />
            <Typography.Text strong style={{ fontSize: '12px' }}>
              Views
            </Typography.Text>
          </Space>
          <Space size="small">
            <TableOutlined style={{ fontSize: '12px' }} />
            <Typography.Text style={{ fontSize: '12px' }}>
              All Students
            </Typography.Text>
          </Space>
          <Space size="small" style={{ position: 'relative' }}>
            <EyeInvisibleOutlined style={{ fontSize: '12px' }} />
            <Button 
              type="link" 
              style={{ padding: 0, fontSize: '12px', color: '#333', height: 'auto' }}
              onClick={onHideColumnsToggle}
            >
              Hide columns
            </Button>
            
            {hideColumnsModalVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  width: '280px',
                  padding: '16px',
                  marginTop: '4px'
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <Input
                    placeholder="Find a column"
                    value={searchText}
                    onChange={(e) => onSearchTextChange(e.target.value)}
                    style={{ fontSize: '12px' }}
                    suffix={<QuestionCircleOutlined style={{ fontSize: '12px', color: '#999' }} />}
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  {filteredColumns.map((column) => (
                    <div key={column} style={{ marginBottom: '8px' }}>
                      <Checkbox
                        checked={selectedColumns.includes(column)}
                        onChange={() => onColumnToggle(column)}
                        style={{ fontSize: '12px' }}
                      >
                        {column}
                      </Checkbox>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button type="link" onClick={onHideAll} style={{ fontSize: '12px', padding: 0 }}>
                    Hide All
                  </Button>
                  <Button type="link" onClick={onShowAll} style={{ fontSize: '12px', padding: 0 }}>
                    Show All
                  </Button>
                </div>
              </div>
            )}
          </Space>
          <Space size="small">
            <FilterOutlined style={{ fontSize: '12px' }} />
            <Typography.Text style={{ fontSize: '12px' }}>
              Filter
            </Typography.Text>
          </Space>
          <Space size="small">
            <GroupOutlined style={{ fontSize: '12px' }} />
            <Typography.Text style={{ fontSize: '12px' }}>
              Group
            </Typography.Text>
          </Space>
          <Space size="small">
            <SortAscendingOutlined style={{ fontSize: '12px' }} />
            <Typography.Text style={{ fontSize: '12px' }}>
              Sort
            </Typography.Text>
          </Space>
        </Space>

        {/* Search Toggle Area */}
        <div style={{ minWidth: '160px', textAlign: 'right' }}>
          {showSearch ? (
            <Input
              autoFocus
              placeholder="Search students..."
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              onBlur={() => setShowSearch(false)}
              style={{ width: 160, fontSize: '12px' }}
              suffix={<SearchOutlined style={{ fontSize: '12px', color: '#666' }} />}
            />
          ) : (
            <Button
              type="text"
              icon={<SearchOutlined style={{ fontSize: '14px', color: '#666' }} />}
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>
      </Row>
    </div>
  );
};

export default SubToolBar;
