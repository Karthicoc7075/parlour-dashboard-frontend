'use client'
import React,{ useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user } = useAuth();


  useEffect(() => {
    if (user?.token) {
      window.location.href = '/dashboard';
    }
  }, [user]);


  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try{
      const response = await fetch(`https://parlour-dashboard-33ace060f435.herokuapp.com/api/v2/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
           return toast.error(errorData.message);
        } else {
            toast.error('Login failed. Please try again.');
            return;
        }
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } 
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xs mx-4 md:max-w-sm">
      <CardHeader>
        <CardTitle className='text-3xl font-bold'  >Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogin} type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default LoginPage;