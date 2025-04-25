
// API base URL - Replace with your actual Spring Boot backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

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
    
    let requestOptions: RequestInit = {
      method: options.method || 'GET',
      headers,
    };
    
    // Handle body based on content type
    if (options.body) {
      if (options.body instanceof FormData) {
        // For FormData (file uploads), don't set Content-Type (browser will set it with boundary)
        delete headers['Content-Type'];
        requestOptions.body = options.body;
      } else {
        requestOptions.body = JSON.stringify(options.body);
      }
    }
    
    console.log(`Making API request to ${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    
    if (!response.ok) {
      let errorMessage = `API error: ${response.statusText}`;
      
      try {
        // Try to parse error response
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status text
      }
      
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }
    
    // For no content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json() as T;
  } catch (error: any) {
    // Check if it's a network error (failed to fetch)
    if (error.message === 'Failed to fetch') {
      console.error(`API connection failed to ${API_URL}${endpoint}. Backend may be unavailable.`);
      error.isConnectionError = true;
    }
    
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API functions
export const login = async (email: string, password: string) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  });
};

export const register = async (userData: any) => {
  return apiRequest('/auth/signin', {
    method: 'POST',
    body: userData
  });
};
