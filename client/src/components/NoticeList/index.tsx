import React from "react";
import { Collapse, Typography, Tooltip } from "antd";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileUnknownOutlined
} from "@ant-design/icons";
import { Notice } from "@/types/notice";

const { Panel } = Collapse;
const { Text } = Typography;

const fileIcons: Record<string, JSX.Element> = {
  pdf: <FilePdfOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />,
  doc: <FileWordOutlined style={{ color: "#1890ff", fontSize: 18 }} />,
  docx: <FileWordOutlined style={{ color: "#1890ff", fontSize: 18 }} />,
};

export const NoticeList: React.FC<{ notices: Notice[] }> = ({ notices }) => (
  <Collapse accordion>
    {(notices ?? []).map((n) => (
      <Panel
        key={n.id}
        header={
          <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
            <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
              <CalendarOutlined style={{ marginRight: 4 }} />
              {dayjs(n.date).format("DD MMM YYYY")}
            </Text>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
                flex: 1,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {n.title}
              </span>
              {n.fileUrl && (
                <Tooltip title="Download">
                  <a
                    href={n.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      marginLeft: 8,
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {fileIcons[(n.fileType || "").toLowerCase()] || (
                      <FileUnknownOutlined style={{ fontSize: 18 }} />
                    )}
                  </a>
                </Tooltip>
              )}
            </span>
          </div>
        }
      >
        <Text>{n.description}</Text>
      </Panel>
    ))}
  </Collapse>
);
