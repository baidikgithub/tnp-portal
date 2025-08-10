'use client';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export function DateRangeFilter({ onChange }: { onChange: (dates: any) => void }) {
  return <RangePicker onChange={onChange} />;
}
