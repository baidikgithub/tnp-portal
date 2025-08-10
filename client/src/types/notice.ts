// /types/notice.ts
export interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  fileUrl?: string;
  fileType?: string;
}
