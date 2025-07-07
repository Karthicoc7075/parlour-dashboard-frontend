// app/dashboard/employees/[employeeId]/page.tsx

import EmployeeDetailsClient from './clientComponent';

// Define types
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
  phone: string;
}

// Fetch all employee IDs for static generation
async function fetchAllEmployeeIds() {
  try {
    const response = await fetch('http://localhost:8888/api/v2/employee/get-ids', { cache: 'no-store' }); // Replace with your API
    const employeesIds = await response.json();
    return employeesIds
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    return [];
  }
}

// Export generateStaticParams
export async function generateStaticParams() {
  const employeeIds = await fetchAllEmployeeIds();
  console.log('Employee IDs:', employeeIds);
  return employeeIds.map((employee: { _id: string }) => ({
    employeeId: employee._id,
  }));
}

export default async function EmployeeDetails({ params }: { params: { employeeId: string } }) {
  const employeeId = params.employeeId;
  console.log('Employee ID:', employeeId);


  

  return (
    <EmployeeDetailsClient
      employeeId={employeeId}
    />
  );
}