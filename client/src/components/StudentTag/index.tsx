import React from 'react';
import { Tag } from 'antd';

interface StudentTagProps {
  value: string;
  color?: string;
}

const StudentTag: React.FC<StudentTagProps> = ({ value, color = 'blue' }) => {
  const getTagColor = (domain: string) => {
    switch (domain) {
      case 'Marketing':
        return 'blue';
      case 'Technical':
        return 'green';
      default:
        return 'default';
    }
  };

  return (
    <Tag 
      color={getTagColor(value)}
      style={{ 
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 500,
        padding: '2px 8px'
      }}
    >
      {value}
    </Tag>
  );
};

export default StudentTag;
