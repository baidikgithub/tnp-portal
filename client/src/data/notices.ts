// data/notices.ts
import type { Notice } from "@/types/notice";

export const DUMMY_NOTICES: Notice[] = [
  {
    id: 1,
    title: "Campus Placement Drive - Infosys",
    description: "Infosys is conducting a placement drive on 15th Aug 2025 at SMIT Campus.",
    date: "2025-08-15",
    fileUrl: "/dummy/infosys-drive.pdf",
    fileType: "pdf",
  },
  {
    id: 2,
    title: "Holiday Notice - Independence Day",
    description: "The Institute will remain closed on 15th August 2025 for Independence Day.",
    date: "2025-08-15",
  },
  {
    id: 3,
    title: "Workshop on AI & ML",
    description: "Join us for a special workshop on AI & ML trends hosted by Tech Club.",
    date: "2025-08-20",
    fileUrl: "/dummy/ai-workshop.pdf",
    fileType: "pdf",
  },
  {
    id: 4,
    title: "New Library Timings",
    description: "Library now open 8 AM – 10 PM, weekdays.",
    date: "2025-08-22",
  },
];
