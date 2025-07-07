'use client';
import React, { useState, useEffect } from "react";
import { Badge } from "../../../components/ui/badge";
import FormDialog from "../../components/tasks/formDialog";
import DeleteDialog from "../../components/tasks/deleteDialog";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../../lib/api/task";
import { toast } from "sonner";
import Skeleton from "./skeleton";
import { useAuth } from "../../../context/AuthContext";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  createdAt?: string;
}



function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    console.log(tasks);
    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await fetchTasks();
            setTasks(tasks);
            setLoading(false);
        };

        loadTasks();
        
    }, []);

    const handleCreateTask = async (taskData: Task) => {
        try{
          const newTask = await createTask(taskData);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success("Task created successfully");
        }catch (error) {
          console.error("Error creating task:", error);
          toast.error("Failed to create task. Please try again later.");
        }
        
    };

    const handleUpdateTask = async (taskId: string, taskData: Task) => {
        try {
            const updatedTask = await updateTask(taskId, taskData);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
            );
            toast.success("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task. Please try again later.");
        }
    };

      

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task. Please try again later.");
        }
    };




  return (
    <div className="flex-1 p-6 md:ml-64 overflow-y-auto">
      <div className="flex justify-between ml-10 md:ml-0">  
        <h1 className="text-2xl font-bold ">Tasks</h1>
        {user?.role === 'super_admin' && (
          <FormDialog mode="Add" onSubmit={handleCreateTask} />
        )}
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div>
        ) :
        tasks.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-screen md:ml-64"> 
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Tasks Found</h2>
              {
                user?.role === 'super_admin' && (
              <div>
                <p className="text-gray-600 mb-4">You can create a new task using the button above.</p>
            <FormDialog mode="Add" onSubmit={handleCreateTask} />
              </div>
              )
            }
          </div>
        </div>):
        (
          <ul className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4   gap-4">
         {tasks.map((task) => (
             <li key={task._id} className="p-4  border-t-4 border-gray-500 rounded-lg bg-white shadow-md">
            <div className="flex-1 items-center gap-4 mb-2">
              <h3 className="font-semibold ">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div className="my-4">
              <Badge className={`text-white ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in-progress' ? 'bg-blue-500' : 'bg-red-500'}`}
              >{task.status}</Badge>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-4">
             {
              user?.role === 'super_admin' && (
                 <div className="flex  gap-2">
                <FormDialog mode="Edit"  taskId={task._id } onSubmit={(data) => handleUpdateTask(task._id ?? '', data)} />
                <DeleteDialog taskId={task._id ?? '' } onDelete={() => handleDeleteTask(task._id ?? '')} />
              </div>
              )
             }
              <span className="text-sm text-gray-500">{new Date(task.createdAt ?? "").toLocaleDateString()}</span>
            </div>
          </li>
          ))}
          </ul>)
         }
        </div>
    </div>
  );
}

export default Tasks;
