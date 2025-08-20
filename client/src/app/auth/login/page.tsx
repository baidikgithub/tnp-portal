"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLogo from "@/components/AuthLogo";
import LoginForm from "@/components/LoginForm";
import RotatingBanner from "@/components/RotatingBanner";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: { regNo: string; password: string }) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // ✅ { regNo, password }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token & student
      localStorage.setItem("smitstudentToken", data.token);
      localStorage.setItem("smitstudent", JSON.stringify(data.student));

      // ✅ redirect after login
      router.push("/profile");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const messages = [
    "Empower Your Future with SMIT Training and Placement",
    "Access Placement Resources, Aptitude Tests, and Company Profiles",
    "Unlock Career Opportunities Through Our Portal",
    "Prepare. Perform. Get Placed.",
  ];

  const images = [
    "/images1.jpeg",
    "/images2.jpeg",
    "/images3.jpg",
    "/images2.jpeg",
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
      {/* Left Panel */}
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
          <AuthLogo
            logoSrc="/smit.png"
            title="Training and Placement Cell Portal"
          />
          <LoginForm
            onLogin={handleLogin}
            loading={loading}
            forgotLink={{
              label: "Forgot password?",
              href: "/auth/forgot-password",
            }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <RotatingBanner messages={messages} images={images} />
    </div>
  );
};

export default LoginPage;
