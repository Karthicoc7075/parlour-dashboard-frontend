'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { fetchDashboardData} from '../../lib/api/dashboard'; 
import Loader from '../components/loader/loader';

export interface DashboardData {
  id: string;
  title: string;
  value: number;
}
export default  function Dashboard({}){
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("Dashboard Data:", dashboardData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardData();
      console.log("Fetched Dashboard Data:", data);
      setDashboardData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 md:ml-64 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

       {
        loading ?
        <div className="flex items-center justify-center h-[70dvh]">
          <Loader />
        </div>:(
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 mt-10"> 
          {dashboardData.map((item) => (
            <Card key={item.id} className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                <CardDescription className=" text-lg text-gray-500">{item.value}</CardDescription>
              </CardHeader>
              <CardFooter>
              </CardFooter>
            </Card>
          ))}
        </div>
        )
        
       }
      </main>
    </div>
  );
}
