import React,{useState,useEffect} from 'react'
import { Button } from "../../..//components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../..//components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {fetchEmployeeIds} from '../../../lib/api/employee'
import { fetchTaskById } from '../../../lib/api/task';


type FormProps = {
  mode?: string;
  taskId?: string;
  onSubmit: (task: Task) => void;
};


export interface Task {
  id?: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
}

export interface EmployeeId {
  _id: string;
  employeeId: string;
}

function FormDialog({mode, taskId, onSubmit }: FormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [employeeIds, setEmployeeIds] = useState<EmployeeId[]>([]);
  const [Open, setOpen] = useState(false);

    const fetchIds = async () => {
      const ids = await fetchEmployeeIds();
      console.log(ids);
      setEmployeeIds(ids);
    };


  const handleClick = () => {
    setOpen(true);
    fetchIds();
  };
  console.log("FormDialog", mode, taskId, Open);
    useEffect(() => {
      if (mode === "Edit" && taskId && Open) {
        console.log("Fetching task data for edit mode");
        const fetchData = async () => {
          const taskData = await fetchTaskById(taskId);
          setTitle(taskData.title);
          setDescription(taskData.description);
          setAssignee(taskData.assignee._id);
          setStatus(taskData.status);
        };
        fetchData();
      }
    }, [mode, taskId,Open]);

  const handleSubmit = () => {
    const task: Task = {
      title,
      description,
      assignee:assignee,
      status,
    };
    onSubmit(task);
    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("");
    setOpen(false);
  };
  return (
    <div>
        <Dialog>
            <form onSubmit={handleSubmit} className="space-y-4">
            <DialogTrigger asChild>
              {mode === "Edit" ? (
                <Button onClick={handleClick}  className="bg-green-600 hover:bg-green-700 text-white">
                  Edit
                </Button> 
              ) : (
                <Button 
                onClick={handleClick}
                className="bg-green-600 hover:bg-green-700 text-white">
                  Add Task
                </Button>
              )}
            </DialogTrigger>

      
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{mode === "Edit" ? "Edit Task" : "Add Task"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Assign to</Label>
                  <Select  value={assignee} defaultValue={assignee} onValueChange={setAssignee}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup> 
                        <SelectLabel>Employees</SelectLabel>
                        {employeeIds.map((data) => (
                          <SelectItem key={data._id} value={data._id}>
                            {data.employeeId}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus} defaultValue='pending' >
                    <SelectTrigger className="w-full" >
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Statuses</SelectLabel>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
               <DialogClose asChild >
                <Button onClick={handleSubmit}  className="bg-green-600 hover:bg-green-700 text-white" type="submit">
                  {mode === "Edit" ? "Update Task" : "Add Task"}
                </Button>
               </DialogClose>
              </DialogFooter>
            </DialogContent>
            </form>
        </Dialog>
      </div>
  )
}

export default FormDialog;