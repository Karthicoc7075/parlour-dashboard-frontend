import EmployeeDetailsClient from './clientComponent';
import { notFound } from 'next/navigation';
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

export interface EmployeeId {
  _id: string;
  employeeId: string;
}


interface EmployeePageProps {
  params: {  employeeId: string };
}

 async function fetchEmployeeById(employeeId:string) {
  try {
    const response = await fetch(`http://localhost:8888/api/v2/employee/${employeeId}`, { cache: 'no-store' }); // Replace with your API
    const employee = await response.json();
    return employee;
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    return [];
  }
}


async function fetchAllEmployees() {
  try {

    const response = await fetch(`http://localhost:8888/api/v2/employee/get-ids`, { cache: 'no-store' }); // Replace with your API
    
    console.log('Response status:', response.status);
    if(!response.ok) {
      throw new Error('Failed to fetch employee IDs');
    }
   const employees = await response.json();
    if (!Array.isArray(employees) || employees.length === 0) {
      throw new Error('No employee IDs returned from API');
    }
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}


export async function generateStaticParams() {
  const employees = await fetchAllEmployees();
console.log('Fetched employee IDs:', employees);
  if (!Array.isArray(employees) || employees.length === 0) {
    notFound(); 
  }

  return employees.map((employee) => ({
    employeeId: employee._id.toString(),
  }));
}

export default async function EmployeeDetails({ params }: EmployeePageProps) {
  const employeeId = params.employeeId;
  console.log('Employee ID:', employeeId);

 


const employee = await fetchEmployeeById(employeeId);

  if (!employee) {
    notFound(); 
  }
  

  return (
    <EmployeeDetailsClient
      employeeId={employeeId}
    />
  );
}