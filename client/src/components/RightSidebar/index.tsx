'use client';

import React, { useState } from 'react';
import {
  Typography,
  Collapse,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Tooltip,
  Dropdown,
  Menu,
  message,
} from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Panel } = Collapse;

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date';
  rules?: any[];
  picker?: 'month' | 'date';
}

interface RightSidebarProps {
  title: string;
  fields: FieldConfig[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ title, fields }) => {
  const [itemList, setItemList] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm] = Form.useForm();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const disableFuture = (date: any) => date && date > dayjs();

  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      if (editIndex !== null) {
        const updated = [...itemList];
        updated[editIndex] = values;
        setItemList(updated);
        message.success(`${title} updated!`);
      } else {
        setItemList([...itemList, values]);
        message.success(`${title} added!`);
      }
      modalForm.resetFields();
      setEditIndex(null);
      setModalOpen(false);
    } catch {
      /* ignored */
    }
  };

  const handleModalCancel = () => {
    modalForm.resetFields();
    setEditIndex(null);
    setModalOpen(false);
  };

  const openAddModal = () => {
    modalForm.resetFields();
    setEditIndex(null);
    setModalOpen(true);
  };

  const editItem = (index: number) => {
    modalForm.setFieldsValue(itemList[index]);
    setEditIndex(index);
    setModalOpen(true);
  };

  const menu = (index: number) => (
    <Menu
      items={[
        { key: 'edit', label: 'Edit', onClick: () => editItem(index) },
        {
          key: 'delete',
          label: 'Delete',
          danger: true,
          onClick: () => {
            const updated = [...itemList];
            updated.splice(index, 1);
            setItemList(updated);
            message.info(`${title} deleted!`);
          },
        },
      ]}
    />
  );

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Collapse ghost defaultActiveKey={[title]}>
        <Panel
          header={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text strong>{title}</Text>
              <Button
                type="text"
                size="small"
                icon={<PlusOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  openAddModal();
                }}
              />
            </div>
          }
          key={title}
        >
          {itemList.length === 0 && (
            <Text type="secondary">No {title.toLowerCase()} added yet.</Text>
          )}
          {itemList.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #f0f0f0',
                borderRadius: 6,
                padding: 12,
                marginBottom: 8,
                background: '#fafafa',
              }}
            >
              {/* First field in bold header with label */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <Text strong>
                  {fields[0].label}: {item[fields[0].name]}
                </Text>
                <Dropdown overlay={menu(index)} trigger={['click']}>
                  <Button type="text" size="small" icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>

              {/* Remaining fields with label + value */}
              {fields.map((field, idx) => {
                if (idx === 0 || !item[field.name]) return null; // skip first shown already
                return (
                  <div key={idx} style={{ marginBottom: 2 }}>
                    <Text type="secondary" style={{ marginRight: 6 }}>
                      {field.label}:
                    </Text>
                    <Text>
                      {field.type === 'date'
                        ? dayjs(item[field.name]).format(
                            field.picker === 'month'
                              ? 'MMM YYYY'
                              : 'YYYY-MM-DD'
                          )
                        : item[field.name]}
                    </Text>
                  </div>
                );
              })}
            </div>
          ))}
        </Panel>
      </Collapse>

      {/* Modal for Add/Edit */}
      <Modal
        open={modalOpen}
        title={editIndex !== null ? `Edit ${title}` : `Add ${title}`}
        okText={editIndex !== null ? 'Save' : 'Add'}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        destroyOnClose
      >
        <Form layout="vertical" form={modalForm}>
          {fields.map((field, idx) => {
            if (field.type === 'text') {
              return (
                <Form.Item
                  key={idx}
                  name={field.name}
                  label={field.label}
                  rules={field.rules || []}
                >
                  <Input placeholder={field.label} />
                </Form.Item>
              );
            }
            if (field.type === 'textarea') {
              return (
                <Form.Item
                  key={idx}
                  name={field.name}
                  label={field.label}
                  rules={field.rules || []}
                >
                  <Input.TextArea rows={3} placeholder={field.label} />
                </Form.Item>
              );
            }
            if (field.type === 'date') {
              return (
                <Form.Item
                  key={idx}
                  name={field.name}
                  label={field.label}
                  rules={field.rules || []}
                >
                  <DatePicker
                    picker={field.picker || 'date'}
                    disabledDate={disableFuture}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              );
            }
            return null;
          })}
        </Form>
      </Modal>
    </div>
  );
};

export default RightSidebar;
