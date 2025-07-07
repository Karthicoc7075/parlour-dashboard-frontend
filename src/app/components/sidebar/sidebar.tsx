'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import LogoutDialogBox from '../logoutDialogBox';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function AppSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
   const { user } = useAuth();

    console.log("Pathname:", pathname);

  return (
   <div>

<button  onClick={() => setIsOpen(!isOpen)} type="button" className="fixed  inline-flex items-center p-4 mt-3  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-300 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>


<aside className={`fixed top-0 left-0 z-10  w-64 p-3 h-screen transition-transform  md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `} aria-label="Sidebar">
<div className=" relative h-full px-3 py-4   dark:bg-gray-800 rounded-2xl bg-[#fff] shadow-md"> 

    <div className='flex gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-md'>
        <Image src="http://iamkarthi.me/frontend/static/media/avatar-25.fbf48a8e618943324923.webp" alt="Logo" className="w-10 h-10 rounded-full" />
        <div className='flex flex-col'>
            <span className='text-gray-900 dark:text-white font-semibold capitalize '>{user?.user.name}</span>
            <span className='text-gray-500 dark:text-gray-300 text-sm capitalize'>{user?.role}</span>
        </div>
    </div>
      <ul className="space-y-4 font-medium mt-6">
         <li>
            <Link href="/dashboard" className={` ${pathname === '/dashboard' ? 'bg-gray-200 dark:bg-gray-700' : ''} flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
               <svg className="w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3 text-gray-600 dark:text-white ">Dashboard</span>
            </Link>
         </li>
    
         <li>
            <Link href="/dashboard/tasks" className={` ${pathname === '/dashboard/tasks' ? 'bg-gray-200 dark:bg-gray-700' : ''} flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Tasks</span>
            </Link>
         </li>

         <li>
            <Link href="/dashboard/employees" className={` ${pathname === '/dashboard/employees' ? 'bg-gray-200 dark:bg-gray-700' : ''} flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Employee</span>
            </Link>
         </li>
          <li>
            <Link href="/dashboard/attendance" className={` ${pathname === '/dashboard/attendance' ? 'bg-gray-200 dark:bg-gray-700' : ''} flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
               <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>

               <span className="flex-1 ms-3 whitespace-nowrap">Attendance log</span>
            </Link>
         </li>
         <li>
            <div className="flex items-center py-2 px-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
              <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
              <LogoutDialogBox/>
            </div>
         </li>
      </ul>
      {
    isOpen &&
       
     <div className='absolute top-4 right-[-30px]  z-40 md:hidden'>   
<button onClick={() => setIsOpen(!isOpen)} type="button" >
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
               </svg>
</button>
    </div>
}
   </div>
</aside>
    </div>
  );
}