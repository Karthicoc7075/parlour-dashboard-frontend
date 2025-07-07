
import ClientComponent from "./clientComponent";
type Params = {
  employeeId: string;
};
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:8888/api/v2/employee/get-ids', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Optional: Prevent caching to ensure fresh data during build
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch employee IDs: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Validate data structure
    if (!data || !Array.isArray(data.ids)) {
      throw new Error('Invalid response format: Expected an object with an "ids" array');
    }

    return data.ids.map((id: string) => ({
      employeeId: id,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Optionally return an empty array or fallback to avoid build failure
    return [];
  }
}
function EmployeeDetails({ params }: { params: Params }) {
   

  return (
    <ClientComponent employeeId={params.employeeId} />
  )
}

export default EmployeeDetails;