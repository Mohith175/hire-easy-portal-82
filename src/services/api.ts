
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
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.statusText}`);
    }
    
    // For no content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json();
  } catch (error: any) {
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
