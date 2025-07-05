'use client'
import React,{useEffect, useState} from 'react'
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {fetchEmployeeById} from '@/lib/api/employee'


type FormProps = {
  mode?: "create" | "update"; 
  employeeId?: string;
  onSubmit: (employeeData: Employee ) => void; 
}
export interface Employee {
  name: string;
  email: string;
  phone: string;
  pin: string;
  present: boolean;
}

function FormDialog({ mode = "create", employeeId, onSubmit }: FormProps) {
   const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [isPresent, setIsPresent] = useState(false); 
    const [Open, setOpen] = useState(false);


  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
     setOpen(true);
    event.stopPropagation();
    
  };

  console.log(isPresent)

  console.log("FormDialog mode:", isPresent);

  useEffect(() => {
    
      const fetchData = async () => {
        const employeeData = await fetchEmployeeById(employeeId as string);
        console.log("Fetched employee data:", employeeData);
        setName(employeeData.name);
        setEmail(employeeData.email);
        setPhone(employeeData.phone);
        setPin(employeeData.pin);
        setIsPresent(employeeData.isPresent);
      };


    if (mode === "update" && employeeId && Open) {
      console.log("Fetching data for employeeId:", employeeId);
      fetchData();  
    }
  }, [mode, employeeId, Open]);

  const handleSubmit = () => {
    const employeeData: Employee = {
      name: name ,
      email: email ,
      phone: phone ,
      pin: pin ,
      present: isPresent,
    };
    console.log("Form submitted with data:", employeeData);
    onSubmit(employeeData );

    setName("");
    setEmail("");
    setPhone("");
    setPin("");     
setIsPresent(false); 
    setOpen(false); 

  };

  return (
    <div>
      <Dialog>
        <form  className="space-y-4">
          <DialogTrigger asChild>
            {mode === "create" ? (
              <Button>Create Employee</Button>
            ) : (
              <p
                onClick={handleClick}
                className="cursor-pointer p-1.5 text-sm hover:bg-gray-100 rounded-md"
              >
                Update Employee
              </p>
            )}
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" ? "Create Employee" : "Update Employee"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={ name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required  
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="pin">New Pin</Label>
                <Input
                  id="pin"
                  name="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  placeholder="Enter  pin"
                />
              </div>
              {
                mode !== "create" && (
                  <div className="grid gap-3">
                    <Label htmlFor="present">Present</Label>
                    <Select
                      defaultValue={isPresent !== undefined ? isPresent.toString() : "true"}
                      name="present"
                      onValueChange={(value) => setIsPresent(value === "true")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a present" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Punch In</SelectItem>
                          <SelectItem value="false">Punch Out</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )
              }
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
             <DialogClose asChild>
                <Button type="submit" onClick={handleSubmit}>
                  {mode === "create" ? "Create" : "Update"}
                </Button>
              </DialogClose>

            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default FormDialog;