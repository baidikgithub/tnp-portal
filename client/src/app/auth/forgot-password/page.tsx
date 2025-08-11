"use client";
import React, { useState } from "react";
import AuthLogo from "@/components/AuthLogo";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import RotatingBanner from "@/components/RotatingBanner";

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Reset request for email:", values.email);
      // API call for reset link
    }, 1000);
  };

  const messages = [
    "Reset Your Password Easily",
    "Secure Access to SMIT Placement Portal",
    "Don't Worry, We've Got You Covered",
    "Access Your Career Tools Again in Minutes"
  ];

  const images = [
    "/images1.jpeg",
    "/images2.jpeg",
    "/images3.jpg",
    "/images2.jpeg"
  ];

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
      {/* Left panel with form */}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <AuthLogo logoSrc="/smit.png" title="Forgot Your Password?" />
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            loading={loading}
            footerText="Remembered your password?"
            footerLink={{ label: "Login", href: "/auth/login" }}
          />
        </div>
      </div>

      {/* Right rotating banner */}
      <RotatingBanner messages={messages} images={images} />
    </div>
  );
};

export default ForgotPasswordPage;
