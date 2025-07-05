'use client'
import React,{useEffect, useState} from 'react'
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
import { fetchAttendanceByEmployee } from "@/lib/api/attendance";
import {fetchEmployeeById} from '@/lib/api/employee' 
import { useParams } from 'next/navigation'

export type Attendance = {
  _id?: string;
  action: string;
  employee: {
    name: string;
    employeeId: string;
    email: string;
  };
  timestamp: string;
};

export interface Employee {
  _id?: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;}

export const columns: ColumnDef<Attendance>[] = [

  {
    accessorKey: "action",
    header: "Action",
  },

  {
    accessorKey: "timeStamp",
    header: "Time",
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
  },
  {
    accessorKey: "timeStamp",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.timestamp).toLocaleDateString(), 
  },
];


function EmployeeDetails() {
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5, 
    });
    const [AttendanceData, setAttendanceData] = useState([]);
    const [employeeData, setEmployeeData] = useState<Employee | null>(null);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const { employeeId } = useParams();



    const table = useReactTable({
      data: AttendanceData,
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
        const id = Array.isArray(employeeId) ? employeeId[0] : employeeId;
        if (!id) return;
        const response = await fetchAttendanceByEmployee(id, pagination.pageIndex + 1, pagination.pageSize);
        setAttendanceData(response.attendance);
        setTotalPages(response.pagination.totalPages);
      }
      if (employeeId) {
        fetchData();
      }
    }, [employeeId, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
      async function fetchEmployeeData() {
        const id = Array.isArray(employeeId) ? employeeId[0] : employeeId;
        if (!id) return;
        try {
          const data = await fetchEmployeeById(id);
          setEmployeeData(data);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        } finally {
          setFetchLoading(false);
        }
      }
      if (employeeId) {
        fetchEmployeeData();
      }
    }, [employeeId]);
    

  return (
    <div className="flex flex-col items-center  md:ml-64  p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className='flex justify-center '>
          <div className="relative flex flex-col items-center p-4  w-full border rounded-lg bg-white shadow-md">

            <img
              src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png"
              alt="Employee"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-bold">{employeeData?.name}</h3>
            <div className="flex flex-col gap-4  py-4 px-6 w-full bg-gray-100 rounded-lg mt-2">
              <p className="text-sm text-gray-600 font-semibold">## {employeeData?.employeeId}</p>
              <p className="text-sm text-gray-600 font-semibold">
                Email: {employeeData?.email}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Phone: +1234567890
              </p>
            </div>
          </div>
      </div>
      <div className="mt-10 max-w-4xl w-full">
         <div className="rounded-md  shadow-sm overflow-hidden mt-4">
      <Table>
        <TableHeader  >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='border-b-1 ' >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className='text-center text-xs font-bold text-gray-900 uppercase  py-5' >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id } className='border-b-1  ' >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='text-center py-8 ' >
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

export default EmployeeDetails;