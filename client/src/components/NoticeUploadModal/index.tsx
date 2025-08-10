import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface NoticeUploadModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
}

export const NoticeUploadModal: React.FC<NoticeUploadModalProps> = ({
  visible,
  onCancel,
  onOk,
  form
}) => {
  return (
    <Modal
      open={visible}
      title="Upload New Notice"
      onCancel={onCancel}
      onOk={onOk}
      okText="Submit"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter notice title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <TextArea rows={4} placeholder="Enter notice description" />
        </Form.Item>
        <Form.Item label="Upload File" name="file">
          <Upload
            beforeUpload={() => false}
            accept=".pdf,.doc,.docx"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
