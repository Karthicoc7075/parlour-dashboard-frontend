'use client'
import { time, timeStamp } from 'console';
import React,{useState,useEffect} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { fetchAttendance } from "@/lib/api/attendance"; 
import { useAttendanceSocket } from "@/hooks/useSocket";

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
    accessorKey: "timeStamp",
    header: "Time",
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  },
  {
    accessorKey: "timeStamp",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleDateString()
  },
    {
    id: "actions",
    header: "View",
    cell: ({ row }) => {
      const employeeId = row.original.employee._id;
      return (
        <Link href={`/dashboard/employees/${employeeId}`}
            className="p-2 text-gray-500 border-1 shadow-sm rounded hover:text-gray-700 transition-colors duration-200"
        >
          View
        </Link>
      );
    },
  },
];





function Attendance() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, 
  });
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [totalPages, setTotalPages] = useState(0);
 const { updates,deletes,setDeletes,setUpdates } = useAttendanceSocket();



 
  const table = useReactTable({
    data: attendanceData, 
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages, 
    getRowId: (row) => row._id || row.employee.employeeId, 
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetchAttendance(pagination.pageIndex + 1, pagination.pageSize);
        setAttendanceData(response.attendance);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  console.log('updates',updates)
  console.log('deletes',deletes);

  useEffect(() => {
    if (updates && updates.length > 0) {
      if (Array.isArray(updates)) {
        setAttendanceData((prevData: Attendance[]) => [...updates, ...prevData]);
        setUpdates([])
      } 
    }
  if (deletes && deletes.length > 0) {
    setAttendanceData((prevData: Attendance[]) => 
      prevData.filter((item) => !deletes[0].map((del:any) => del._id == item._id))
    );
    setDeletes([])
}

  }, [updates,deletes]);

console.log('attendanceData',attendanceData);
  return (
    <div>
        <div className="flex-1 p-6 md:ml-64 overflow-y-auto">
            <div className="flex justify-between ml-10 md:ml-0">
            <h1 className="text-2xl font-bold mb-4">Attendance</h1>
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button asChild>
                <Link href="/dashboard/employees" className="flex items-center">
                  <span className="mr-2">View Employees</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10A5 5 0 0110 5z" />
                    <path d="M12.707 8.293a1 1 0 00-1.414-1.414l-3.586 3.586a1 1 0 000 1.414l3.586 3.586a1 1 0 001.414-1.414L10.414 11H15a1 1 0 100-2H10.414l2.293-2.293z" />
                  </svg>
                </Link>
              </Button>
            </div>
            </div>
        
            <div className="rounded-md  shadow-sm overflow-hidden mt-4">
      <Table>
        <TableHeader  >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='border-b-1 ' >
              {headerGroup.headers.map((header,i) => (
                <TableHead key={i} className='text-center text-xs font-bold text-gray-900 uppercase  py-5' >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id } className='border-b-1  ' >
              {row.getVisibleCells().map((cell,i) => (
                <TableCell key={i} className='text-center py-8 ' >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
           <div className="flex items-center justify-between p-2">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
        </div>
    </div>
  )
}



export default Attendance;