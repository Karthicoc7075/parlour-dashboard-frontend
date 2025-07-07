import Link from "next/link";
export default function NotFound() {
  return (
    <div>
      <h1>404 - Employee Not Found</h1>
      <p>Sorry, the employee you are looking for does not exist.</p>
      <Link href="/dashboard/employees">Back to Employees List</Link>
    </div>
  );
}