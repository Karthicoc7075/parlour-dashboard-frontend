import React from 'react'
import AppSidebar from "../components/sidebar/sidebar";
import ProtectedRoute from '../components/ProtectRoutes';


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <ProtectedRoute>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardLayout;