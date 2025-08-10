export type ViewType = 
  | 'all' 
  | 'byCompany' 
  | 'byGuide' 
  | 'byBatch' 
  | 'byDepartment'
  | 'byIndustry'
  | 'byLocation';

export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends BaseRecord {
  name: string;
  email: string;
  department: string;
  batch: string;
  rollNumber: string;
  company?: string;
  guide?: string;
  status: 'placed' | 'unplaced' | 'inProgress';
  profileCompleted: boolean;
}

export interface Company extends BaseRecord {
  name: string;
  industry: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalPlacements: number;
}

export interface Guide extends BaseRecord {
  name: string;
  email: string;
  department: string;
  designation: string;
  specialization: string;
  status: 'active' | 'inactive';
  assignedStudents: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Batch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  active: boolean;
}
