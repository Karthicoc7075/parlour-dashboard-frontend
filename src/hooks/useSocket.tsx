'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8888'); 

export function useAttendanceSocket() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [deletes, setDeletes] = useState<any[]>([]);

  useEffect(() => {
    console.log('🔌 Connecting to socket.io server...');
    socket.on('connect', () => {
      console.log('✅ Connected to socket.io server');
    });
    socket.on('attendance_update', (data) => {
      console.log('📡 New attendance:', data);
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
