"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Typography, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Arrays of messages and corresponding background images
  const messages = [
    "Empower Your Future with SMIT Training and Placement",
    "Access Placement Resources, Aptitude Tests, and Company Profiles",
    "Unlock Career Opportunities Through Our Portal",
    "Prepare. Perform. Get Placed."
  ];

  // Background images should be placed in public folder, named accordingly
  const images = [
    "/images1.jpeg",
    "/images2.jpeg",
    "/images3.jpg",
    "/images2.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleLogin = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Handle login logic or redirect
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        background: "#f7f8fa",
      }}
    >
      {/* Left Panel: Login */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          padding: "48px 0",
        }}
      >
        <div
          style={{
            width: "360px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <Image src="/logo.jpg" alt="SMIT Logo" width={46} height={46} />
            <Typography.Title level={4} style={{ margin: "8px 0 0 0" }}>
              Sikkim Manipal Institute of Technology
            </Typography.Title>
          </div>

          {/* Login Title */}
          <Typography.Title level={2} style={{ marginTop: 0, marginBottom: 12, textWrap: "nowrap" }}>
            Training and Placement Cell Portal
          </Typography.Title>

          {/* Login Form */}
          <Form layout="vertical" style={{ width: "100%" }} onFinish={handleLogin}>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
              <Input prefix={<UserOutlined />} placeholder="Valid email address" size="large" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 8, message: "Min 8 chars" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Your password (min 8 chars)" size="large" />
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
                Login
              </Button>
            </Form.Item>
            <Typography.Text type="secondary">Forgot password?</Typography.Text>
          </Form>
          <Typography.Text style={{ marginTop: 18 }}>
            Don&apos;t have an account?{" "}
            <a href="/register" style={{ fontWeight: 500 }}>Register</a>
          </Typography.Text>
        </div>
      </div>

      {/* Right Panel: Rotating Messages and Background Images */}
      <div
        style={{
          flex: 1,
          position: "relative",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          textAlign: "center",
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        {/* Dark overlay at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: "rgba(0,0,0,0.65)",
            zIndex: 0,
          }}
        />
        {/* Dynamic Message */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
          <Typography.Title
            level={1}
            style={{
              fontWeight: "bold",
              fontSize: 36,
              minHeight: 80,
              transition: "opacity 0.5s ease",
              color: "White"
            }}
          >
            {messages[currentIndex]}
          </Typography.Title>
          <Typography.Paragraph style={{ color: "#e6e8f3", fontSize: 17, lineHeight: 1.6 }}>
            Placement guidance, interview preparation, and opportunities— all in one platform dedicated to SMIT students.
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
