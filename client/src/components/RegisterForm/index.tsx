"use client";
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

interface RegisterFormProps {
  onRegister: (values: any) => void;
  loading?: boolean;
  footerText?: string;
  footerLink?: { label: string; href: string };
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  loading,
  footerText = "Already have an account?",
  footerLink = { label: "Login", href: "/login" }
}) => {
  return (
    <Form layout="vertical" style={{ width: "100%" }} onFinish={onRegister}>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Your full name" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Valid email address" size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Your phone number" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, min: 8, message: "Min 8 characters" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Create a password" size="large" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" size="large" />
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
          Register
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

export default RegisterForm;
