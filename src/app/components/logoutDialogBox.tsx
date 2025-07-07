import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,DialogTrigger, DialogClose } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";


function LogoutDialogBox() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
       window.location.href = '/login';

      };


  return (
   <div>
      <Dialog>
        <DialogTrigger asChild>
               <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter>  
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleLogout}  type="submit">Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
   </div>
  )
}

export default LogoutDialogBox;