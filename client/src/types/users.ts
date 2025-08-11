// types/users.ts
export interface User {
  key: string;
  registrationNumber: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  tag?: string;
}
