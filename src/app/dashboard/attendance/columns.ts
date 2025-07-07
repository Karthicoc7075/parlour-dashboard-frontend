import { ColumnDef } from "@tanstack/react-table";
export type Attendance = {
  _id: string;
  action: string;
  employee: {
    _id: string;
    name: string;
    employeeId: string;
    email: string;
  };
  timestamp: string;
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "employee.employeeId",
    header: "Employee ID",
    cell: ({ row }) => row.original.employee.employeeId,
  },
  {
    accessorKey: "employee.name",
    header: "Employee Name",
    cell: ({ row }) => row.original.employee.name,
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
  }
];