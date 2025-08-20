"use client";
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface LoginFormProps {
  onLogin: (values: { regNo: string; password: string }) => void;
  loading?: boolean;
  footerText?: string;
  footerLink?: { label: string; href: string };
  forgotLink?: { label: string; href: string };
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  loading,
  footerText = "Don't have an account?",
  footerLink = { label: "Register", href: "/register" },
  forgotLink = { label: "Forgot password?", href: "/forgot-password" },
}) => {
  return (
    <Form
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={(values) =>
        onLogin({
          regNo: values.regNo, // ✅ ensure correct key
          password: values.password,
        })
      }
    >
      {/* Registration Number */}
      <Form.Item
        name="regNo"
        label="Registration Number"
        rules={[{ required: true, message: "Enter your registration number" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter registration number"
          size="large"
        />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Your password"
          size="large"
        />
      </Form.Item>

      {/* Login button */}
      <Form.Item style={{ marginBottom: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
          style={{ fontWeight: "bold", background: "#223a5f", border: 0 }}
        >
          Login
        </Button>
      </Form.Item>

      {/* Forgot password link */}
      {forgotLink && (
        <Typography.Text
          type="secondary"
          style={{ display: "block", marginTop: 8 }}
        >
          <a href={forgotLink.href} style={{ fontWeight: 500 }}>
            {forgotLink.label}
          </a>
        </Typography.Text>
      )}

      {/* Footer link */}
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

export default LoginForm;
