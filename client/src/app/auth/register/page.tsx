"use client";
import React, { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Registration successful! Please login.");
      window.location.href = "/auth/login";
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <Card style={{ width: 420, textAlign: "center", boxShadow: "0 2px 16px #0001" }}>
        <div style={{ marginBottom: 16 }}>
          <Image src="/logo.png" alt="Logo" width={64} height={64} style={{ marginBottom: 8 }} />
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            DJSCE INFORMATION TECHNOLOGY
          </Typography.Title>
          <Typography.Title level={2} style={{ margin: 0, fontWeight: 700, fontSize: 28 }}>
            Placement Portal
          </Typography.Title>
        </div>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, marginBottom: 16 }}>
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 600, color: "#555" }}>
            Register for Placement Portal
          </Typography.Title>
          <Typography.Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            Dwarkadas J. Sanghvi College of Engineering
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}> 
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}> 
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}> 
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} rules={[{ required: true, message: "Please confirm your password" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("password") === value) { return Promise.resolve(); } return Promise.reject(new Error("Passwords do not match!")); } })]}> 
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%", background: "#19b86e", border: 0 }}>
                Register
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Typography.Text>
                Already have an account? <a href="/auth/login">Login</a>
              </Typography.Text>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};  

export default RegisterPage;
