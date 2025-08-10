'use client';

import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export function IconButtonDropdown({
  buttonName,
  icon,
  dropdownOptions,
}: {
  buttonName: string;
  icon: React.ReactNode;
  dropdownOptions: { key: string; label: string }[];
}) {
  const menu = (
    <Menu
      items={dropdownOptions.map((opt) => ({
        key: opt.key,
        label: opt.label,
      }))}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button icon={icon}>
        {buttonName} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
