"use client";

import * as React from "react";

import { fetchEmployees } from "@/lib/api/employee"; 
import DialogBox from "./dialogBox";
import { createAttendance } from '@/lib/api/attendance'
import {toast} from "sonner";

export type Employee = {
  _id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  isPresent: boolean;
  createdAt: string;
};
export default function AttendancePage() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  React.useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    getEmployees();
  }, []);

  const handleSubmit = async (employeeId: string, isPresent: boolean, pin: string) => {
    const attendanceData = {
      employeeId,
      pin,
      action: isPresent ? "punch-out" : "punch-in",
    };
    console.log("Attendance Data:", attendanceData);
    const updatedEmployee = await createAttendance(attendanceData);
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee._id === employeeId ? updatedEmployee : employee
      )
    );
    toast.success("Attendance marked successfully!");
    console.log("Updated Employee:", updatedEmployee);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 ">
     <div className="flex justify-between items-center my-6">
       <h3 className="text-2xl font-semibold mb-4">Attendance</h3>
     </div>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
     {employees.map((employee) => (
       <div key={employee._id} className=" p-6 rounded-lg bg-white border-4 border-t-red-500 border-b-green-500  border-l-blue-500 border-r-yellow-500   shadow-md w-full">
         <div className="flex flex-col items-center gap-2">
           <h3>{employee.name}</h3>
           <p className="text-sm text-gray-600">## {employee.employeeId}</p>
           <p className="text-sm text-gray-600">Email: {employee.email}</p>
         </div>
         <DialogBox isPresent={employee.isPresent} employeeId={employee.employeeId} onSubmit={(pin)=>handleSubmit(employee._id,employee.isPresent, pin)} />
       </div>
     ))}
   </div>
            
          </div>

    
  );
}
