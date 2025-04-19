
import { toast } from "@/components/ui/use-toast";

// API base URL - Replace with your actual Spring Boot backend URL
const API_URL = "http://localhost:8080/api";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

// Get the auth token from localStorage
const getAuthToken = (): string | null => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;
    
    const userData = JSON.parse(user);
    return userData.token || null;
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

// Handle API responses and errors consistently
export const apiRequest = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  try {
    const token = getAuthToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const requestOptions: RequestInit = {
      method: options.method || 'GET',
      headers,
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'An unknown error occurred' };
      }
      
      // Handle unauthorized specifically - could trigger a logout
      if (response.status === 401) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please login again.",
          variant: "destructive",
        });
        // Could add auto-logout logic here
      }
      
      throw new Error(errorData.message || `API error: ${response.statusText}`);
    }
    
    // For no content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('API request failed:', error);
    toast({
      title: "Error",
      description: error.message || 'An unexpected error occurred',
      variant: "destructive",
    });
    throw error;
  }
};
