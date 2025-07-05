'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function DeleteDialog({ employeeId, onDelete }: { employeeId: string; onDelete: (id: string) => void; }) {
    const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
        event.stopPropagation();
    };

  const handleSubmit = () => {
       onDelete(employeeId);
       console.log("Employee deleted with ID:", employeeId);
    };
    
    
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <p onClick={handleClick} className='cursor-pointer   text-sm hover:bg-gray-100 rounded-md'  >
            Delete Employee
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this employee? This will delete all attendance logs associated with them.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteDialog