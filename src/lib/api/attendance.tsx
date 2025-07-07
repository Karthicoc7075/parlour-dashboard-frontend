import { getToken } from "./utils";
import { toast } from "sonner";



export async function fetchAttendance(pageIndex: number = 0, pageSize: number = 5) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/logs?page=${pageIndex}&limit=${pageSize}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch attendance');
  }

  return response.json();
}

export async function createAttendance(attendanceData:Record<string, string>) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: attendanceData ? JSON.stringify(attendanceData) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to create attendance');
  }

  const data = await response.json();
  return data.updatedEmployee;
}


export async function fetchAttendanceByEmployee(employeeId: string, pageIndex: number = 0, pageSize: number = 5) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/employee/${employeeId}?page=${pageIndex}&limit=${pageSize}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch attendance for employee');
  }

  return response.json();
}