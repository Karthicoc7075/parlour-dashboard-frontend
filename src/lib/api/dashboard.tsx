import { getToken } from "./utils";
import { toast } from "sonner";

export async function fetchDashboardData() {
  try {
    const response = await fetch("http://localhost:8888/api/v2/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard data");
    }

    return  response.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    toast.error("Failed to fetch dashboard data. Please try again later.");
    throw error;
  }
}