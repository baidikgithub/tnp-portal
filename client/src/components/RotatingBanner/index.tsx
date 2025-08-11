"use client";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";

interface RotatingBannerProps {
  messages: string[];
  images: string[];
  interval?: number;
}

const RotatingBanner: React.FC<RotatingBannerProps> = ({
  messages,
  images,
  interval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
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
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
        <Typography.Title
          level={1}
          style={{
            fontWeight: "bold",
            fontSize: 36,
            minHeight: 80,
            color: "white",
            transition: "opacity 0.5s ease"
          }}
        >
          {messages[currentIndex]}
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#e6e8f3", fontSize: 17, lineHeight: 1.6 }}>
          Placement guidance, interview preparation, and opportunities — all in one platform dedicated to SMIT students.
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default RotatingBanner;
