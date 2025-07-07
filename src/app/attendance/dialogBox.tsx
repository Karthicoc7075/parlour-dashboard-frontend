import React from 'react'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

function DialogBox({ isPresent, employeeId, onSubmit }: { isPresent: boolean; employeeId: string; onSubmit: (pin: string) => void }) {
    const [pin, setPin] = React.useState<string>("");

    const handleConfirm = () => {
    if (pin.trim() === "") {
      alert("Please enter a valid PIN.");
      return;
     
    }
    onSubmit(pin);
  };



  return (
    <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-slate-300 to-slate-500 ">
                    {isPresent ? "Punch Out" : "Punch In"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isPresent ? "Punch Out" : "Punch In"}</DialogTitle>
                    <div className="grid gap-4 mt-3">
                      <div className="grid gap-3">
                        <Label htmlFor="employee-id">Employee ID</Label>
                        <Input
                          id="employee-id"
                          name="employee-id"
                          defaultValue={employeeId}
                          disabled
                        />
                      </div>
                           <div className="grid gap-3">
                                  <Label htmlFor="pin">Enter Pin</Label>
                                  <Input id="pin" name="pin" value={pin} onChange={(e) => setPin(e.target.value)} />
                                </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={handleConfirm} >Confirm</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
  )
}

export default DialogBox