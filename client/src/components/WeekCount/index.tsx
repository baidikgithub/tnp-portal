import React from 'react';
import { Typography } from 'antd';

interface WeekCountProps {
  count: number;
}

const WeekCount: React.FC<WeekCountProps> = ({ count }) => {
  return (
    <Typography.Text style={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>
      {count}
    </Typography.Text>
  );
};

export default WeekCount;
