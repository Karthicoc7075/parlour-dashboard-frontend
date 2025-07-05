import { getToken } from "./utils";
import { toast } from "sonner";

export async function fetchTasks() {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch tasks');
  }

  return response.json();
}

export async function fetchTaskById(taskId: string) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to fetch task details');
  }

  return response.json();
}




export async function createTask(taskData: any) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to create task');
  }
  const data = await response.json();
    return data.task;
}


export async function updateTask(taskId: string, taskData: any) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to update task');
  }

  const data = await response.json();
  return data.task;
}


export async function deleteTask(taskId: string) {
  const token = getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || 'Failed to delete task');
  }

  return response.json();
}