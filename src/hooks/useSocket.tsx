'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8888'); 

export type Attendance = {
   _id: string;
  action: string;
  employee: {
    _id: string;
    name: string;
    employeeId: string;
    email: string;
  };
  timestamp: string;
};

export function useAttendanceSocket() {
  const [updates, setUpdates] = useState<Attendance[]>([]);
  const [deletes, setDeletes] = useState<Attendance[]>([]);



  console.log(updates)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
    socket.on('attendance_update', (data) => {
      console.log('New attendance:', data);
      setUpdates((prev) => [data, ...prev]);
    });

    socket.on('attendance_delete', (data) => {
      console.log('📡 Deleted attendance:', data);
      setDeletes((prev) => [data, ...prev]);
    });

    return () => {
      socket.off('attendance_update');
      socket.off('attendance_delete');
    };


  }, []);

  return { updates, deletes,setUpdates,setDeletes };
}
