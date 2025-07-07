import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "View",
    cell: ({ row }: { row: { original: Attendance } }) => {
      const employeeId = row.original.employee._id;
      return (
        // @ts-ignore
        <Link href={`/dashboard/employees/${employeeId}`}>
          View
        </Link>
      );
    },
  },
];