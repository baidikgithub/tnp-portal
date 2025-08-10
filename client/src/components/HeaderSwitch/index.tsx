'use client';

import { Switch } from 'antd';

export function HeaderSwitch({
  title,
  leftLabel,
  rightLabel,
  checked,
  onChange,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <span>{leftLabel}</span>
      <Switch checked={checked} onChange={onChange} />
      <span>{rightLabel}</span>
    </div>
  );
}
