"use client";
import React from "react";
import { Typography } from "antd";
import Image from "next/image";

interface AuthLogoProps {
  logoSrc: string;
  title: string;
}

const AuthLogo: React.FC<AuthLogoProps> = ({ logoSrc, title }) => {
  return (
    <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image src={logoSrc} alt="Logo" width={176} height={176} />
      <Typography.Title
        level={3}
        style={{
          margin: "16px 0 0 0",
          fontWeight: 600,
          color: "#223a5f",
          letterSpacing: "0.5px",
          textAlign: "center"
        }}
      >
        {title}
      </Typography.Title>
    </div>
  );
};

export default AuthLogo;
