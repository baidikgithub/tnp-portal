'use client';

import { Input } from 'antd';

export function SearchFilter({
  placeholder,
  style,
  onSearch,
}: {
  placeholder: string;
  style?: React.CSSProperties;
  onSearch: (value: string) => void;
}) {
  return (
    <Input.Search
      placeholder={placeholder}
      style={style}
      allowClear
      onSearch={onSearch}
    />
  );
}
