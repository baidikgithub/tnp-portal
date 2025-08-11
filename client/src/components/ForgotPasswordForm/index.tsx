"use client";
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";

interface ForgotPasswordFormProps {
  onSubmit: (values: any) => void;
  loading?: boolean;
  footerText?: string;
  footerLink?: { label: string; href: string };
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  loading,
  footerText = "Remembered your password?",
  footerLink = { label: "Login", href: "/login" }
}) => {
  return (
    <Form layout="vertical" style={{ width: "100%" }} onFinish={onSubmit}>
      <Form.Item
        name="email"
        label="Email Address"
        rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Enter your registered email" size="large" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
          style={{ fontWeight: "bold", background: "#223a5f", border: 0 }}
        >
          Send Reset Link
        </Button>
      </Form.Item>

      {footerText && footerLink && (
        <Typography.Text style={{ marginTop: 18, display: "block" }}>
          {footerText}{" "}
          <a href={footerLink.href} style={{ fontWeight: 500 }}>
            {footerLink.label}
          </a>
        </Typography.Text>
      )}
    </Form>
  );
};

export default ForgotPasswordForm;
