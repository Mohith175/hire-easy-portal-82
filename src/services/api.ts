
/**
 * API utility for making requests to the Spring Boot backend
 */
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface ApiError extends Error {
  status?: number;
  isConnectionError?: boolean;
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
};

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, requiresAuth = true } = options;
  
  // Get stored user data to retrieve JWT token
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const token = user?.token;
  
  // Setup headers with authentication if required
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (requiresAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    // Prepare request configuration
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };
    
    // Add request body if provided
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    
    // Make the API call
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // Handle HTTP errors
    if (!response.ok) {
      // Parse error response if available
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Unknown error occurred' };
      }
      
      const error = new Error(errorData.message || `API error: ${response.status}`) as ApiError;
      error.status = response.status;
      throw error;
    }
    
    // For DELETE requests or those that don't return content
    if (response.status === 204 || method === 'DELETE') {
      return {} as T;
    }
    
    // Parse successful response
    return await response.json();
  } catch (error: any) {
    // Handle connection errors
    if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
      const connectionError = new Error('Cannot connect to the server. Please check your internet connection.') as ApiError;
      connectionError.isConnectionError = true;
      throw connectionError;
    }
    
    // Re-throw the error
    throw error;
  }
}
