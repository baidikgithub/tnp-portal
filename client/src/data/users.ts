// data/users.ts
import type { User } from "@/types/users";

export const DUMMY_USERS: User[] = [
  {
    key: "1",
    registrationNumber: "REG001",
    name: "John Doe",
    phone: "1234567890",
    address: "123 Main St, Mumbai",
    email: "john@gmail.com",
    tag: "VIP",
  },
  {
    key: "2",
    registrationNumber: "REG002",
    name: "Jane Smith",
    phone: "9876543210",
    address: "456 Park Ave, Delhi",
    email: "jane@gmail.com",
    tag: "Regular",
  },
  {
    key: "3",
    registrationNumber: "REG003",
    name: "Alice Johnson",
    phone: "5554443333",
    address: "789 Church Rd, Bangalore",
    email: "alice@hotmail.com",
    tag: "Premium",
  },
];
