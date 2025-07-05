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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type FormProps = {
  
};

function FormDialog() {


  return (
    <div>
        <Dialog>
          <form >
            <DialogTrigger asChild>
             <Button>
              Add Attendance
             </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Attendance</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">    
                  <Label htmlFor="employeeId">Employee Id</Label>
                  
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={""} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={""} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="pin">New Pin</Label>
                  <Input id="pin" name="pin" defaultValue={""} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="present">Present</Label>
                  <Select defaultValue="" name="present" >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a present" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="punch-in">Punch In</SelectItem>
                        <SelectItem value="put-out">Put Out</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                </div>
                <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
  )
}


export default FormDialog
