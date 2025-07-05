import { getToken  } from "./utils";
import { toast } from "sonner";


export async function fetchEmployees() {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
        toast.error(errorData.message);
        }
  }

  return response.json();
}

export async function fetchEmployeeById(employeeId: string) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error('Failed to fetch employee details. Please try again.');
    }
    throw new Error('Failed to fetch employee details');
  }

  return response.json();
}

export async function fetchEmployeeIds() {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/get-ids`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error('Failed to fetch employee IDs. Please try again.');
    }
    throw new Error('Failed to fetch employee IDs');
  }
   
  return response.json();
}

export async function createEmployee(employeeData: any) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error('Failed to create employee. Please try again.');
    }
    throw new Error('Failed to create employee');
  }

  const data = await response.json();

  return data.employee;
}

export async function updateEmployee(employeeId: string, employeeData: any) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error('Failed to update employee. Please try again.');
    }
    throw new Error('Failed to update employee');
  }

    const data = await response.json();
  return data.employee;
}

export async function deleteEmployee(employeeId: string) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error('Failed to delete employee. Please try again.');
    }
    throw new Error('Failed to delete employee');
  }

  return response.json();
}