import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

function DeleteDialog({ taskId, onDelete }: { taskId: string; onDelete: (taskId: string) => void; }) {

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(taskId);
  };
  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <p>Are you sure you want to delete this task?</p>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose >
          <Button className="bg-red-600 hover:bg-red-700 text-white" type="submit" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
        </DialogContent>
        
      </form>
    </Dialog>
  );
}

export default DeleteDialog;
