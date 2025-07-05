'use client';
import React,{useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormDialog from "../../components/employee/formDialog";
import DeleteDialog from "../../components/employee/deleteDialog";
import { fetchEmployees,createEmployee,updateEmployee,deleteEmployee } from "../../../lib/api/employee";
import { toast } from "sonner";
import Skeleton from "./skeleton";
import { useAuth } from "@/context/AuthContext";

export interface Employee {
  _id?: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;
  present: boolean;
}

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees. Please try again later.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCreateEmployee = async (employeeData: Employee) => {
    try {
      const newEmployee: Employee = await createEmployee(employeeData);
      setEmployees((prev) => [...prev, newEmployee]);
      toast.success("Employee created successfully");
    } catch (error) {
      console.error("Error creating employee:", error);
      
    }
  };

  const handleUpdateEmployee = async (employeeId: string, employeeData: Employee) => {
    try {
      const updatedEmployee = await updateEmployee(employeeId, employeeData);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === employeeId ? updatedEmployee : emp))
      );
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee. Please try again later.");
    }
  };




  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again later.");
    }
  };
  

  if (!fetchLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen md:ml-64 ">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Employees Found</h2>
          {user?.role === 'super_admin' && (
            <div>
              <p className="text-gray-600 mb-4">You can create a new employee using the button above.</p>
              <FormDialog mode="create" onSubmit={handleCreateEmployee} />
            </div>
          )}
        </div>
      </div>
    );
  }



  return (
    <div className="flex-1 p-6 md:ml-64 overflow-y-auto">
      <div className="flex justify-between ml-10 md:ml-0">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        {user?.role === 'super_admin' && (
                 <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <FormDialog mode="create"  onSubmit={(employeeData) => {handleCreateEmployee(employeeData)}} />
        </div>
        )}
      </div>
      <div className="mt-10">
         
          {
            fetchLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div>
            ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
             {
              employees.map((employee) => (
                  <li className="relative flex flex-col items-center p-4  rounded-lg bg-white  z-5 shadow-md border-t-4  border-gray-500  ">
            {
              user?.role === 'super_admin' && (
                <div className="absolute top-6 right-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className=" rounded px-2 py-1 flex items-center"
                    aria-label="Open menu"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400 rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild >
                        <FormDialog
                          mode="update"
                          employeeId={employee._id ?? ''}
                          onSubmit={(employeeData) => handleUpdateEmployee(employee._id ?? '', employeeData)}
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <DeleteDialog employeeId={employee._id ?? ''} onDelete={handleDeleteEmployee} />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
              )
            }
            <img
              src="/images/profile.png"
              alt="Employee"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-bold">{employee.name}</h3>
            <div className="flex flex-col gap-4  p-4 w-full bg-gray-100 rounded-lg mt-2">
              <p className="text-sm text-gray-600 font-semibold">## {employee.employeeId}</p>
              <p className="text-sm text-gray-600 font-semibold">
                Email: {employee.email}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Phone: {employee.phone}
              </p>
            </div>
          </li>))
             }
          
        </ul>)}
      </div>
    </div>
  );
}

export default EmployeesPage;
