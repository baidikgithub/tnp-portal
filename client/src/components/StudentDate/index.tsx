import React from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

interface StudentDateProps {
  date: string;
}

const StudentDate: React.FC<StudentDateProps> = ({ date }) => {
  const formattedDate = dayjs(date).format('DD/MM/YYYY');
  return (
    <Typography.Text style={{ fontSize: '12px', color: '#333' }}>
      {formattedDate}
    </Typography.Text>
  );
};

export default StudentDate;
