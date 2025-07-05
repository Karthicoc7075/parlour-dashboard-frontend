
import { Button } from "@/components/ui/button"
 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className=" flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-md max-w-xl w-full text-center"> 
          <h1 className="text-2xl font-bold mb-4">Employee Attendance System</h1>
      <p className="text-md text-center mb-8  bg-gradient-to-r from-slate-300 to-slate-500 text-transparent bg-clip-text">
        Welcome to the Attendance System. Please click the button below to go to the attendance page.
      </p>
      <img className="w-100 h-100"  src="/images/work.png"/>
      <div className="flex items-center justify-center gap-6 " >
                <Button className="bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold" >
        <a href="/attendance">Go to Attendance</a>
      </Button  >
      <Button className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-bold">
        <a href="/dashboard">Go to Dashboard</a>
      </Button>
      </div>
      </div>
    
    </div>
  );
}
