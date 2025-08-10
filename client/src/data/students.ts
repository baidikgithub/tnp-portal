import { Student } from "@/types/common";
// Mock data
export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Computer Science',
    batch: '2023-24',
    rollNumber: 'CS001',
    company: 'Tech Corp',
    guide: 'Dr. Smith',
    status: 'placed',
    profileCompleted: true,
    createdAt: '2023-08-01',
    updatedAt: '2023-08-09'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    department: 'Computer Science',
    batch: '2023-24',
    rollNumber: 'CS002',
    company: 'Tech Corp',
    guide: 'Dr. Smith',
    status: 'inProgress',
    profileCompleted: false,
    createdAt: '2023-08-01',
    updatedAt: '2023-08-09'
  }
];